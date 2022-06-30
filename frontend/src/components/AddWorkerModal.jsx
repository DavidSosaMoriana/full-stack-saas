import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_WORKER } from '../mutations/WorkerMutations';
import { GET_WORKERS } from '../queries/workerQueries';

export default function AddWorkerModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  const [addWorker] = useMutation(ADD_WORKER, {
    variables: { name, email, location },
    update(cache, { data: { addWorker } }) {
      const { workers } = cache.readQuery({ query: GET_WORKERS });

      cache.writeQuery({
        query: GET_WORKERS,
        data: { workers: [...workers, addWorker] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, location);

    if (name === '' || email === '' || location === '') {
      return alert('Please fill in all fields');
    }

    addWorker(name, email, location);

    setName('');
    setEmail('');
    setLocation('');
  };

  return (
    <>
      <button
        type='button'
        className='btn btn-secondary'
        data-bs-toggle='modal'
        data-bs-target='#addWorkerModal'
      >
        <div className='d-flex align-items-center'>
          <FaUser className='icon' />
          <div>Add Worker</div>
        </div>
      </button>

      <div
        className='modal fade'
        id='addWorkerModal'
        aria-labelledby='addWorkerModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addWorkerModalLabel'>
                Add Worker
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
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Location</label>
                  <input
                    type='text'
                    className='form-control'
                    id='location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <button
                  type='submit'
                  data-bs-dismiss='modal'
                  className='btn btn-secondary'
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
