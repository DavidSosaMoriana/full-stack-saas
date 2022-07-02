import {gql} from '@apollo/client'

const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!,
    $description: String!,
    $status: ProjectStatus!
    $workerId: ID!
  ) {
    addProject(
      name: $name,
      description: $description,
      status: $status,
      workerId: $workerId
    ) {
      id
      name
      description
      status
      worker {
        id
        name
        email
        location
      }
    }
  }
`

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdate!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      worker {
        id
        name
        email
        location
      }
    }
  }
`

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT }