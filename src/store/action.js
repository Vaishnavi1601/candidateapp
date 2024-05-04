import axios from "axios";

export const APPEND_JOB_LIST = "APPEND_JOB_LIST";

export const getJobs = ({offset}) =>{
  return async (dispatch, getState) =>{
    console.log("getState",getState);
    const state = getState();
    const body = { limit: 10, offset };
    const res = await axios.post(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("alljobs", res.data);

  }
}