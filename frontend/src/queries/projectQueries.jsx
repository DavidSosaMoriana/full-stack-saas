import { gql } from '@apollo/client';

//Query para todos los proyectos
const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      status
    }
  }
`

//Query para un solo proyecto
const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
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

export { GET_PROJECTS, GET_PROJECT }