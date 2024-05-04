import React from 'react'
import Filters from './Filters'
import JobCard from './JobCard'
import './App.css'

export default function App() {
  return (
    <>
      <div className='wrapper'>
        <Filters />
        <div className="cards">
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>

    </>
  )
}
