import { React, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../actions/index";

const List = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  const data = useSelector((state) => state.allData);
  const filteredData = useSelector((state) => state.filteredData);

  return (
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
        {filteredData?.length <= 0
          ? data?.map((item, i) => {
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
            })
          : filteredData?.map((item, i) => {
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
  );
};

export default List;
