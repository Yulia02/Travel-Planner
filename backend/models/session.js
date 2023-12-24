const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    token: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now, expires: '7d' },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;