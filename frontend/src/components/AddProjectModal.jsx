import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_WORKERS } from '../queries/workerQueries';


export default function AddWorkerModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [workerId, setWorkerId] = useState('');
  const [status, setStatus] = useState('');

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, workerId, status },
    update: (cache, { data: { addProject } }) => {
      const { projects } = cache.readQuery({ query: GET_PROJECTS })
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      })
    }
  })

  //Tomar los clientes para seleccionarlos
  const {loading, error, data} = useQuery(GET_WORKERS)

  const onSubmit = (e) => {
    e.preventDefault()
  
    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addProject(name, description, workerId, status)

    setName('');
    setDescription('');
    setStatus('');
    setWorkerId('')
  }
  
  if (loading) return null
  if (error) return 'Something went wrong'

  return (
    <>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#addProjectModal'
      >
        <div className='d-flex align-items-center'>
          <FaList className='icon' />
          <div>New Project</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addProjectModal'
        aria-labelledby='addProjectModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addProjectModalLabel'>
                New Project
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form onSubmit={onSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Description</label>
                  <textarea
                    className='form-control'
                    id='description'
                    maxlength="100"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                  
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Status</label>
                  <select id="status" className="form-select" value={status} onChange={ (e) => setStatus(e.target.value)}
                  >
                    <option value='new'>Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Worker</label>
                  <select id="workerId" className="form-select" value={workerId} onChange={(e) => setWorkerId(e.target.value)}>
                    <option value="">Select Worker</option>
                    {data.workers.map((worker) =>(
                      <option key={worker.id} value={worker.id}>
                        {worker.name}
                      </option>  
                    ))}
                  </select>
                </div>

                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className='btn btn-primary'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}