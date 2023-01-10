import React, { useEffect, useState } from 'react';
import { usePagination, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';
import '../../scss/formStyles.scss';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    canNextPage,
    canPreviousPage,
    getTableBodyProps,
    getTableProps,
    gotoPage,
    headerGroups,
    nextPage,
    page,
    pageCount,
    pageOptions,
    prepareRow,
    previousPage,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const { pageIndex } = state;

  // Render the UI for your table
  return (
    <>
      <div style={{ display: `flex`, flexDirection: `column` }}>
        <div>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => <th {...column.getHeaderProps()}>{column.render(`Header`)}</th>)}
              </tr>)}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <br />
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {`<<`}
          </button>{` `}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>{` `}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>{` `}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {`>>`}
          </button>{` `}
          <span>
            Page{` `}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{` `}
          </span>
          <span>
            | Go to page:{` `}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ?
                  Number(e.target.value) - 1 :
                  0;
                gotoPage(pageNumber);
              }}
              style={{ width: `50px` }} />
          </span>{` `}

        </div>
      </div>

    </>
  );
}

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: ` `,
        columns: [
          {
            Header: `Cat Name`,
            accessor: `catName`,
          },
          {
            Header: `Birth Date`,
            accessor: `catDateOfBirth`,
          },
          {
            Header: `Risk Level`,
            accessor: `riskLevel`,
          },
          {
            Header: `Score`,
            accessor: `score`,
          },
          {
            Header: `Assessment Type`,
            accessor: `instrumentType`,
          },
        ],
      },

    ],
    []
  );

  return (
    <div>
      <h1>Assessment List</h1>
      <hr />
      <Table columns={columns} data={assessments} />

    </div>
  );
};
