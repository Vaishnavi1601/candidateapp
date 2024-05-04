import React, { useState, useEffect } from 'react'
import Filters from './components/Filters'
import JobCard from './components/JobCard'
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "./store/action";
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css'

export default function App() {

  const dispatch = useDispatch();
  const { jobs, filters, loading, error } = useSelector((state) => state.jobs);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedMinBasePay, setSelectedMinBasePay] = useState([]);
  const [selectedMinExp, setSelectedMinExp] = useState([]);
  const handleRoleChange = (selectedOptions) => {
    setSelectedRoles(selectedOptions.map((option) => option.value));
  };

  const handleLocationChange = (selectedOptions) => {
    setSelectedLocations(selectedOptions.map((option) => option.value));
  };
  const handleMinBasePayChange = (selectedOptions) => {
    setSelectedMinBasePay(selectedOptions.map((option) => option.value));
  };

  const handleMinExpChange = (selectedOptions) => {
    setSelectedMinExp(selectedOptions.map((option) => option.value));
  };

  const filteredJobs = jobs.filter((job) => {
    // Check if the job role is in selected roles
    const roleFilter =
      selectedRoles.length === 0 || selectedRoles.includes(job.jobRole);
    // Check if the location is in selected locations
    const locationFilter =
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);
    // Return true if both filters pass
    const basePayFilter =
      selectedMinBasePay.length === 0 ||
      selectedMinBasePay.includes(job.minBasePay);

    const minExpFilter =
      selectedMinExp.length === 0 ||
      selectedMinExp.includes(job.minExp);
    return roleFilter && locationFilter && minExpFilter;
  });

  console.log("dispatch", dispatch);

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
