import {gql} from '@apollo/client'

const ADD_PROJECT = gql`
  mutation AddProject($name: String!, $description: String!, $status: ProjectStatus! $workerId: ID!) {
    addProject(name: $name, description: $description, status: $status, workerId: $workerId) {
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

export { ADD_PROJECT }