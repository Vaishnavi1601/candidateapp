import { APPEND_JOB_LIST } from "./action";

const initialState = {
  jobs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_JOB_LIST:
      return {
        ...state,
        jobs: [...state.jobs, ...action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
