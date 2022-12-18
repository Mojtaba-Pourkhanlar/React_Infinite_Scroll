import React, { useState, useEffect } from "react";
import axios from "axios";
import CS from "./Scroll.module.css";

const Scroll = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${pageNo}/photos`)
      .then((response) => {
        if (pageNo > 1) {
          setData([...data, ...response.data]);
        } else {
          setData(response.data);
        }
      })
      .catch((error) => {
        alert("Axios GET request failed");
      });
  }

  const firstEvent = (e) => {
    let bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    if (bottom) {
      setPageNo(pageNo + 1);
      getData();
    }
  };

  return (
    <div onScroll={firstEvent} className={CS.container}>
      <table className={CS.tableContainer}>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Photo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <img src={item.thumbnailUrl} alt="" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Scroll;
