import { FaEnvelope, FaHome, FaIdBadge } from 'react-icons/fa';

export default function WorkerInfo({ worker }) {
  return (
    <>
      <h5 className='mt-5'>Worker Information</h5>
      <ul className='list-group'>
        <li className='list-group-item'>
          <FaIdBadge className='icon' /> {worker.name}
        </li>
        <li className='list-group-item'>
          <FaEnvelope className='icon' /> {worker.email}
        </li>
        <li className='list-group-item'>
          <FaHome className='icon' /> {worker.location}
        </li>
      </ul>
    </>
  );
}
