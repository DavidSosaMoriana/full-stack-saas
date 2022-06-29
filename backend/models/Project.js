const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not started', 'In Progress', 'Completed'],
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
  },
})

module.exports = mongoose.model('Project', ProjectSchema)