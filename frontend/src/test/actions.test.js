import axios from "axios";

import {
  getAllData,
  filterByName,
  refreshState,
  setFlag,
  GET_ALL_DATA,
  FILTER_BY_NAME,
  REFRESH_STATE,
  SET_FLAG,
} from "../actions/index";

jest.mock("axios");

describe("Test action functions", () => {
  describe("Test Refresh State function", () => {
    test("should return action type REFRESH_STATE", () => {
      const action = refreshState();
      expect(action.type).toEqual(REFRESH_STATE);
    });
  });

  describe("Test Set Flag function", () => {
    test("should return action type SET_FLAG", () => {
      const action = setFlag(true);
      expect(action.type).toEqual(SET_FLAG);
    });
    test("should return action payload true", () => {
      const action = setFlag(true);
      expect(action.payload).toEqual(true);
    });
  });

  describe("getAllData", () => {
    it("should dispatch getAllData function return action type GET_ALL_DATA", async () => {
      const mockData = { foo: "bar" };
      axios.get.mockResolvedValueOnce({ data: mockData });
      const dispatch = jest.fn();
      await getAllData()(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_ALL_DATA,
        payload: mockData,
      });
    });
  });

  describe("filterByName", () => {
    it("should dispatch filterByName function return action type FILTER_BY_NAME", async () => {
      const mockData = { foo: "bar" };
      const fileName = "example";
      axios.get.mockResolvedValueOnce({ data: mockData });
      const dispatch = jest.fn();
      await filterByName(fileName)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: FILTER_BY_NAME,
        payload: mockData,
      });
    });
  });
});
