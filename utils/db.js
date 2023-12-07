import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.dbClient = MongoClient(`mongodb://${this.host}:${this.port}`, { useUnifiedTopology: true });
    this.dbClient.connect();
    this.db = this.dbClient.db(this.database);
  }

  isAlive() {
    if (this.dbClient.isConnected()) { return true; }
    return false;
  }

  async nbUsers() {
    const collection = await this.db.collection('users');
    return collection.countDocuments();
  }

  async nbFiles() {
    const collection = await this.db.collection('files');
    return collection.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
