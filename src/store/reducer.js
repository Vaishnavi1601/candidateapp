import {
  APPEND_JOB_LIST,
  APPEND_JOB_LOCATION,
  APPEND_JOB_ROLES,
  APPEND_MAX_EXP,
  APPEND_MIN_BASE_PAY,
  APPEND_MIN_EXP,
} from "./action";

// initial state of the reducer
const initialState = {
  jobs: [],
  filters: {
    roles: [],
    location: [],
    minBasePay: [],
    minExp: [],
    maxExp: [],
  },
  loading: false,
  error: null,
};
// reducer function that updates the state based on dispatched actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_JOB_LIST:
      return {
        ...state,
        jobs: [...state.jobs, ...action.payload],
      };
    case APPEND_JOB_ROLES:
      // append new job roles to existing roles array, removing duplicates
      const filteredJobRoles = [
        ...new Set([...state.filters?.roles, ...action.payload]),
      ];
      // update state with new filtered roles
      return {
        ...state,
        filters: {
          ...state.filters,
          roles: filteredJobRoles,
        },
      };
    case APPEND_JOB_LOCATION:
      const filteredJoblocation = [
        ...new Set([...state.filters?.location, ...action.payload]),
      ];

      return {
        ...state,
        filters: {
          ...state.filters,
          location: filteredJoblocation,
        },
      };
    case APPEND_MIN_BASE_PAY:
      const filteredMinBasePay = [
        ...new Set([...state.filters?.minBasePay, ...action.payload]),
      ];
      filteredMinBasePay.sort((a, b) => a - b);
      return {
        ...state,
        filters: {
          ...state.filters,
          minBasePay: filteredMinBasePay,
        },
      };

    case APPEND_MIN_EXP:
      const filteredMinExp = [
        ...new Set([...state.filters?.minExp, ...action.payload]),
      ];
      filteredMinExp.sort((a, b) => a - b);
      return {
        ...state,
        filters: {
          ...state.filters,
          minExp: filteredMinExp,
        },
      };

    case APPEND_MAX_EXP:
      const filteredMaxExp = [
        ...new Set([...state.filters?.maxExp, ...action.payload]),
      ];
      filteredMaxExp.sort((a, b) => a - b);

      return {
        ...state,
        filters: {
          ...state.filters,
          maxExp: filteredMaxExp,
        },
      };
    default:
      return state;  
  }
};

export default reducer;
