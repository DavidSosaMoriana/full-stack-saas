import React from 'react'
import { useQuery  } from '@apollo/client'
import WorkerRow from './WorkerRow'
import Spinner from './Spinner'
import { GET_WORKERS } from '../queries/workerQueries'

const Workers = () => {
  const { loading, error, data } = useQuery(GET_WORKERS)
  console.log('data', {data});

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  return (
    <>
      { !loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.workers.map((worker) => {
              return <WorkerRow key={worker.id} worker={worker} /> 
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

console.log('Workers');
export default Workers