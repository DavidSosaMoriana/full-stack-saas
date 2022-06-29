const { projects, workers } = require('../sampleData.js')

// Mongoose models
const Project = require('../models/Project')
const Worker = require('../models/Worker')

const { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = require('graphql')

//Project
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    worker: {
      type: WorkerType,
      resolve (parent, args) {
        return workers.findById(parent.workerId)
      }
    }
  }),
})

//Workers
const WorkerType = new GraphQLObjectType({
  name: 'Worker',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    location: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve (parent, args) {
        return Project.find()
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        return Project.findById(args.id)
      },
    },
    workers: {
      type: new GraphQLList(WorkerType),
      resolve (parent, args) {
        return Worker.find()
      },
    },
    worker: {
      type: WorkerType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {  
         return Worker.findById(args.id)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery
})