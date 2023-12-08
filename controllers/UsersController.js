import { ObjectId } from 'mongodb';

const crypto = require('crypto');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

function cryptPassword(password) {
  const hash = crypto.createHash('sha1');
  const hashedPW = hash.update(password, 'utf-8');
  return (hashedPW.disgest('hex'));
}

class UsersController {
  static async postNew(request, response) {
    const { email } = request.body;
    const { password } = request.body;
    const existsData = await dbClient.db.collection('users').find({ email }).toArray();

    if (!email) {
      return (response.status(400).json({ error: 'Missing email' }));
    }
    if (!password) {
      return (response.status(400).json({ error: 'Missing password' }));
    }
    if (existsData.length) {
      return (response.status(400).json({ error: 'Already exist' }));
    }

    const hashedPW = cryptPassword(password);
    const user = await dbClient.db.collection('users').insertOne({ email, password: hashedPW });
    const resData = { id: user.ops[0]._id, email: user.ops[0].email };

    return (response.status(201).json(resData));
  }

  static async getMe(request, response) {
    const key = request.header('X-Token');
    const session = await redisClient.get(`auth_${key}`);
    if (!key || key.length === 0) {
      return response.status(401).json({ error: 'Unauthorized' });
    }
    if (session) {
      const search = await dbClient.db.collection('users').find({ _id: ObjectId(session) }).toArray();
      return (response.status(200).json({ id: search[0]._id, email: search[0].email }));
    }
    return (response.status(401).json({ error: 'Unauthorized' }));
  }
}

module.exports = UsersController;
