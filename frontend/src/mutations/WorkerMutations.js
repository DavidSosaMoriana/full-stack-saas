import { gql } from '@apollo/client'

const ADD_WORKER = gql`
  mutation addWorker($name: String!, $email: String!, $location: String!) {
    addWorker(name: $name, email: $email, location: $location) {
      id
      name
      email
      location
    }
  }
`

const DELETE_WORKER = gql `
  mutation deleteWorker($id: ID!) {
    deleteWorker(id: $id){
      id
      name
      email
      location
    }
  }
`

export { ADD_WORKER, DELETE_WORKER  }