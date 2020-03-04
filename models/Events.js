const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  SponseredBy: {
    type: String,
  }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
