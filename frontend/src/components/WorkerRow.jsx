import {FaTrash} from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_WORKER } from '../mutations/WorkerMutations'
import { GET_WORKERS } from '../queries/workerQueries'
import { GET_PROJECTS } from '../queries/projectQueries'

export default function WorkerRow ({ worker }) {
  const [deleteWorker] = useMutation(DELETE_WORKER, {
    variables: { id: worker.id },
    refetchQueries: [{ query: GET_WORKERS }, { query: GET_PROJECTS }],
  })
  return (
    <tr>
      <td>{ worker.name }</td>
      <td>{ worker.email }</td>
      <td>{ worker.location }</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteWorker}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

