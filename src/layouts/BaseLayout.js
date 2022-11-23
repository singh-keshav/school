import Navbar from '../components/Navbar';

export default function BaseLayout({ children }) {
  return <div>
    <Navbar />
    <div className='container p-2'>
      {children}
    </div>
  </div>
}