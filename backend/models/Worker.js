const mongoose = require('mongoose')

const WorkerSchema = mongoose.Schema({
  name: {
    type: String,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
})

module.exports = mongoose.model('Worker', WorkerSchema)