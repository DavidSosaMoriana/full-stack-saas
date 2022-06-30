import { gql } from '@apollo/client';

const GET_WORKERS = gql`
  query getWorkers {
    workers {
      id
      name
      email
      location
    }
  }
`;
console.log('workerQueries.jsx');

export { GET_WORKERS };