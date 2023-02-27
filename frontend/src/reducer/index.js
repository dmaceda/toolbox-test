const initialState = {
  allData: [],
  filteredData: [],
  flag: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_DATA":
      return {
        ...state,
        allData: action.payload,
      };

    case "FILTER_BY_NAME":
      return {
        ...state,
        filteredData: action.payload,
      };

    case "REFRESH_STATE":
      return {
        ...state,
        filteredData: [],
      };

    case "SET_FLAG":
      return {
        ...state,
        flag: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
