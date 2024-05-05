import React, { useState, useEffect } from 'react'
import Filters from './components/Filters'
import JobCard from './components/JobCard'
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "./store/action";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styles/App.css";

export default function App() {
  const dispatch = useDispatch();  //intialize redux dispatch function
  const { jobs, filters } = useSelector((state) => state.jobs);  // extract jobs and filters state from Redux store

  // initialize state for selected roles, locations, minimum base pay, and minimum experience
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedMinBasePay, setSelectedMinBasePay] = useState([]);
  const [selectedMinExp, setSelectedMinExp] = useState([]);

  // eventHandler for selected fileter
  const handleRoleChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions.map((option) => option.value));
  };

  const handleLocationChange = (selectedOptions) => {
    setSelectedLocations(selectedOptions.map((option) => option.value));
  };
  const handleMinBasePayChange = (selectedOptions) => {
    console.log("selectedOptions,selectedOptions", selectedOptions);
    setSelectedMinBasePay(selectedOptions.map((option) => option.value));
  };

  const handleMinExpChange = (selectedOptions) => {
    setSelectedMinExp(selectedOptions.map((option) => option.value));
  };


  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter((job) => {
    const roleFilter =
      selectedRoles.length === 0 || selectedRoles.includes(job.jobRole);
    const locationFilter =
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const basePayFilter =
      selectedMinBasePay.length === 0 ||
      selectedMinBasePay.includes(job.minJdSalary);

    const minExpFilter =
      selectedMinExp.length === 0 ||
      selectedMinExp.includes(job.minExp);
    return roleFilter && locationFilter && minExpFilter && basePayFilter;
  });

  // fetch initial set of jobs on component mount
  useEffect(() => {
    dispatch(getJobs({ offset: 0 }));
  }, [dispatch]);
  return (
    <>
      <div>
        <div className="filters">

          <Filters
            placeholder={"Roles"}
            options={filters.roles}
            onChangeHandlers={[handleRoleChange]}
          />
          <Filters
            placeholder={"Location"}
            options={filters.location}
            onChangeHandlers={[handleLocationChange]}
          />
          <Filters
            placeholder={"Minimum Base Pay"}
            options={filters.minBasePay}
            onChangeHandlers={[handleMinBasePayChange]}
          />
          <Filters
            placeholder={"Minimum Experience"}
            options={filters.minExp}
            onChangeHandlers={[handleMinExpChange]}
          />
        </div>
        <InfiniteScroll
          dataLength={filteredJobs.length}
          next={() => dispatch(getJobs({ offset: 0 }))}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="jobCardContainer">
            {filteredJobs.map((_eachJob, index) => (
              <JobCard key={index} jobDetails={_eachJob} />
            ))}
          </div>
        </InfiniteScroll>
      </div>

    </>
  )
}
