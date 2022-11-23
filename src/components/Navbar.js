import { Link, Route } from 'react-router-dom'

const navOptions = [
  {
    name: 'Paper',
    path: '/papers'
  },
  {
    name: 'Tags',
    path: '/tags'
  },
  {
    name: 'Questions',
    path: '/questions'
  },
  {
    name: 'Tests',
    path: '/available-tests'
  }
]

export default function Navbar() {
  return <div className='bg-primary text-white d-flex p-2 gap-4 justify-content-between'>
    <div>ICON</div>
    <div className='d-flex gap-4'>
      {navOptions.map(op => <Link to={op.path} key={op.name} className='text-white' style={{ textDecoration: 'none',  }}>{op.name}</Link>)}</div>
  </div>
}