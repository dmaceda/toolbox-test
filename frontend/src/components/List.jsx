import { React, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../actions/index";

const List = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  const data = useSelector((state) => state.allData);
  const filteredData = useSelector((state) => state.filteredData);
  const flag = useSelector((state) => state.flag);

  return (
    <div className="container">
      {filteredData.length === 0 && flag && (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="danger" />
        </div>
      )}
      {filteredData.length === 0 && !flag && (
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => {
              return (
                item &&
                item.file &&
                item.lines &&
                item.lines.map((line, j) => (
                  <tr key={`${i}-${j}`}>
                    {j === 0 ? (
                      <td rowSpan={item.lines.length}>{item.file}</td>
                    ) : null}
                    <td>{line?.text}</td>
                    <td>{line?.number}</td>
                    <td>{line?.hex}</td>
                  </tr>
                ))
              );
            })}
          </tbody>
        </Table>
      )}
      {filteredData.length > 0 && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, i) => {
              return (
                item &&
                item.file &&
                item.lines &&
                item.lines.map((line, j) => (
                  <tr key={`${i}-${j}`}>
                    {j === 0 ? (
                      <td rowSpan={item.lines.length}>{item.file}</td>
                    ) : null}
                    <td>{line?.text}</td>
                    <td>{line?.number}</td>
                    <td>{line?.hex}</td>
                  </tr>
                ))
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default List;
