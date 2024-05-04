import React, { useState, useEffect } from 'react'
import Filters from './components/Filters'
import JobCard from './components/JobCard'
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "./store/action";
import './App.css'

export default function App() {
  
  const dispatch = useDispatch();
  console.log("dispatch",dispatch);
  
    useEffect(() => {
      dispatch(getJobs({ offset: 0 }));
    }, [dispatch]);
  return (
    <>
      <div className='wrapper'>
        <Filters />
        <div className="cards">
          <JobCard />
          <JobCard  />
        </div>
      </div>

    </>
  )
}
