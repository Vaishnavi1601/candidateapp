import axios from "axios";

// action types
export const APPEND_JOB_LIST = "APPEND_JOB_LIST";
export const APPEND_JOB_ROLES = "APPEND_JOB_ROLES";
export const APPEND_JOB_LOCATION = "APPEND_JOB_LOCATION";
export const APPEND_MIN_BASE_PAY = "APPEND_MIN_BASE_PAY";
export const APPEND_MIN_EXP = "APPEND_MIN_EXP";
export const APPEND_MAX_EXP = "APPEND_MAX_EXP";


export const getJobs = ({ offset }) => {
  return async (dispatch, getState) => {
    const state = getState(); // get the current state of the Redux store
    console.log("state66", state);

    // filters from the Redux store state
    const filters = state.jobs.filters.roles;
    console.log("filters11", filters);

    // Request body for the API call
    const body = { limit: 10, offset };

    // fetch job data from the API endpoint
      const res = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    // extract info from the response data
    const allJobs = res.data.jdList;
    const newRoles = allJobs
      .filter((eachJob) => !filters.includes(eachJob.jobRole))
      .map((eachJob) => eachJob.jobRole);

    const jobLocation = allJobs
      .filter((eachJob) => !filters.includes(eachJob.location))
      .map((eachJob) => eachJob.location);

    const minBasePay = allJobs
      .filter((eachJob) => !filters.includes(eachJob.minJdSalary))
      .map((eachJob) => eachJob.minJdSalary);

    const minExp = allJobs
      .filter((eachJob) => !filters.includes(eachJob.minExp))
      .map((eachJob) => eachJob.minExp);

    const maxExp = allJobs
      .filter((eachJob) => !filters.includes(eachJob.maxExp))
      .map((eachJob) => eachJob.maxExp);

    console.log("newRoles", newRoles);
    console.log("Action", res.data);

    // dispatch actions to update the Redux store with the fetched data
    dispatch({
      type: APPEND_JOB_LIST,
      payload: allJobs,
    });
    dispatch({
      type: APPEND_JOB_ROLES,
      payload: newRoles,
    });
    dispatch({
      type: APPEND_JOB_LOCATION,
      payload: jobLocation,
    });
    dispatch({
      type: APPEND_MIN_BASE_PAY,
      payload: minBasePay,
    });
    dispatch({
      type: APPEND_MIN_EXP,
      payload: minExp,
    });
    dispatch({
      type: APPEND_MAX_EXP,
      payload: maxExp,
    });
  };
};
