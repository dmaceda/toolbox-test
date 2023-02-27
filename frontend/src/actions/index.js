import axios from "axios";

export const GET_ALL_DATA = "GET_ALL_DATA";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const REFRESH_STATE = "REFRESH_STATE";
export const SET_FLAG = "SET_FLAG";

export function getAllData() {
  return async function (dispatch) {
    try {
      var json = await axios.get("/files/data");
      return dispatch({
        type: GET_ALL_DATA,
        payload: json.data ? json.data : null,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByName(fileName) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/files/data?fileName=${fileName}`);
      return dispatch({
        type: FILTER_BY_NAME,
        payload: json.data ? json.data : null,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function refreshState() {
  return {
    type: REFRESH_STATE,
  };
}

export function setFlag(flag) {
  return {
    type: SET_FLAG,
    payload: flag,
  };
}
