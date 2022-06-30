// Mongoose models
const Project = require('../models/Project')
const Worker = require('../models/Worker')

const { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType
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
        return Worker.findById(parent.workerId)
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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Añadir un trabajador
    addWorker: {
      type: WorkerType,
      args: {
        name: { type: GraphQLNonNull (GraphQLString) },
        email: { type: GraphQLNonNull (GraphQLString) },
        location: { type: GraphQLNonNull (GraphQLString) },
      },
      resolve (parent, args) {
        const worker = new Worker ({
          name: args.name,
          email: args.email,
          location: args.location,
        })

        return worker.save()
      },
    },
    // Eliminar un trabajador
      deleteWorker: {
        type: WorkerType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve (parent, args) {
          return Worker.findByIdAndRemove(args.id)
        },
      },
      //Asignar proyecto
      addProject: {
        type: ProjectType,
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLNonNull(GraphQLString) },
          status: {
            type: new GraphQLEnumType({
              name: 'ProjectStatus',
              values: {
                new: { value: 'Not Started' },
                progress: { value: 'In Progress' },
                completed: { value: 'Completed' },
              },
            }),
            defaultValue: 'Not Started',
          },
          workerId: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve (parent, args) {
          const project = new Project({
            name: args.name,
            description: args.description,
            status: args.status,
            workerId: args.workerId,
          })
          
          return project.save()
        },
      },
      //Borrar proyecto
      deleteProject: {
        type: ProjectType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          return Project.findByIdAndRemove(args.id);
        },
      },
      // Actualizar proyecto
      updateProject: {
        type: ProjectType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          status: {
            type: new GraphQLEnumType({
              name: 'ProjectStatusUpdate',
              values: {
                new: { value: 'Not Started' },
                progress: { value: 'In Progress' },
                completed: { value: 'Completed' },
              },
            }),
          },
        },
        resolve (parent, args) {
          return Project.findByIdAndUpdate(
            args.id,
            {
              $set: {
                name: args.name,
                description: args.description,
                status: args.status,
              },
            },
            { new: true }
          )
        }
      }
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})