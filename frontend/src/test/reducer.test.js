import rootReducer from "../reducer";

describe("rootReducer", () => {
  it("should handle action type GET_ALL_DATA", () => {
    const prevState = { allData: [], filteredData: [], flag: "" };
    const action = {
      type: "GET_ALL_DATA",
      payload: [
        { id: 1, name: "file1" },
        { id: 2, name: "file2" },
      ],
    };
    const nextState = rootReducer(prevState, action);
    expect(nextState.allData).toEqual([
      { id: 1, name: "file1" },
      { id: 2, name: "file2" },
    ]);
  });

  it("should return the correct state for action type FILTER_BY_NAME", () => {
    const prevState = {
      allData: [
        { id: 1, name: "file1" },
        { id: 2, name: "file2" },
      ],
      filteredData: [],
      flag: "",
    };
    const action = {
      type: "FILTER_BY_NAME",
      payload: [{ id: 1, name: "file1" }],
    };
    const expectedState = {
      allData: [
        { id: 1, name: "file1" },
        { id: 2, name: "file2" },
      ],
      filteredData: [{ id: 1, name: "file1" }],
      flag: "",
    };
    const actualState = rootReducer(prevState, action);
    expect(actualState).toEqual(expectedState);
  });
});
