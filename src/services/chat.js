const Message = require('../models/Message');

class ChatService {
  async get() {
    return await Message.find();
  }

  async add(message) {
    return await Message.create(message);
  }
}

module.exports = new ChatService();
