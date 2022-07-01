import Workers from '../components/Workers'
import Projects from '../components/Projects'
import AddWorkerModal from '../components/AddWorkerModal'

export default function Home() {
  return (
    <>
    <div className='d-flex gap-3 mb-4'>
      <AddWorkerModal />
    </div>
     <Projects />
     <hr />
    <Workers />
    </>
  )
}
