import React, { useState, useEffect, useMemo, useRef } from "react";

import { useTable } from "react-table";
import axios from "axios";
import { Modal } from "react-bootstrap";

import PaginationCustom from "./Pagination";

const TutorialsList = (props) => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const tutorialsRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [editId, setEdiId] = useState([]);
  const [finalArray, setFinallArray] = useState([]);
  const [searchBool, setSearchBool] = useState(false);

  //model edit
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  tutorialsRef.current = tutorials;
  console.log(searchBool, "search bool");
  //####################################

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tutorials.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //#####################

  const retrieveTutorials = () => {
    console.log("retrieving tutorials");
    axios
      .get("https://deshaguna.herokuapp.com/user/user")

      .then((response) => {
        setTutorials(response.data.data);
        setSearchArray(response.data.data);

        console.log(tutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveTutorials();
  }, []);

  const refreshList = () => {
    retrieveTutorials();
  };

  const findByTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);

    const tutorialsSearch = tutorials.filter((p) =>
      p.username.includes(searchTitle)
    );

    setSearchArray(tutorialsSearch);
    setSearchBool(true);
  };

  const openEdit = (rowIndex) => {
    console.log(rowIndex);
    setEdiId(rowIndex);
    handleShow();
  };
  const dataFunc = () => {
    if (searchTitle == "") {
      return currentPosts;
    } else {
      return searchArray;
    }
    setSearchBool(false);
  };

  const deleteUser = (rowIndex) => {
    console.log(rowIndex, "delete check");
    const id = tutorialsRef.current[rowIndex].id;

    //delete User axios
  };

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },

      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;

          return (
            <div>
              <span onClick={() => openEdit(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteUser(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: dataFunc(),
    });

  return (
    <div className="list row">
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
      <div className="col-md-8">
        <div className="col-md-12 ">
          <PaginationCustom
            postsPerPage={postsPerPage}
            totalPosts={tutorials.length}
            paginate={paginate}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            // onChange={onChangeSearchTitle}
            // onClick={findByTitle}
            onChange={(e, v) => {
              findByTitle(e);
            }}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8"></div>
    </div>
  );
};

export default TutorialsList;
