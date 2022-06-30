import {FaTrash} from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_WORKER } from '../mutations/WorkerMutations'
import { GET_WORKERS } from '../queries/workerQueries'


const WorkerRow = ({ worker }) => {
  const [deleteWorker] = useMutation(DELETE_WORKER, {
    variables: { id: worker.id },
    update(cache, { data: { deleteWorker } }) { 
      const { worker } = cache.readQuery({ query: GET_WORKERS })
      cache.writeQuery({
        query: GET_WORKERS,
        data: { workers: worker.filter(worker => worker.id !== deleteWorker.id) },
      })
    }
  })
  console.log('WorkerRow');
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

export default WorkerRow