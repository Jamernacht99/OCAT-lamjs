import React, { useEffect, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import Button from 'react-bootstrap/Button';
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
    useSortBy,
    usePagination
  );

  const { pageIndex } = state;

  // Render the UI for your table
  return (
    <>
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup =>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column =>
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                  <th style={{ paddingRight: `0` }}
                    {...column.getHeaderProps(column.getSortByToggleProps())}>

                    <div style={{ display: `flex`, width: `100%` }}>

                      <div style={{ flex: 9 }}>
                        {column.render(`Header`)}
                      </div>
                      <span style={{ flex: 1, textAlign: `center` }}>
                        {column.isSorted ?
                          column.isSortedDesc ?
                            `🔽` :
                            `🔼` :
                          `↕` }
                      </span>
                    </div>

                  </th>)}
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
  const level = (rowA: Row, rowB: Row, id: string, desc: boolean): number => {
    switch (true) {
      case rowA.original[id]:
        console.log(rowA);
      default:
        console.log(rowA.original.riskLevel);
    }
  };
  const columns = React.useMemo(
    () => [
      {
        Header: ` `,
        columns: [
          {
            Header: `Cat Name`,
            accessor: `catName`,
            sortType: `string`,
            width: Math.round((window.innerWidth - 75) * 0.2),
          },
          {
            Header: `Birth Date`,
            accessor: `catDateOfBirth`,
            width: Math.round((window.innerWidth - 55) * 0.2),
          },
          {
            Header: `Risk Level`,
            accessor: `riskLevel`,
            sortType: level,
            width: Math.round((window.innerWidth - 55) * 0.2),
          },
          {
            Header: `Score`,
            accessor: `score`,
            sortType: `basic`,
            width: Math.round((window.innerWidth - 55) * 0.2),
          },
          {
            Header: `Assessment Type`,
            accessor: `instrumentType`,
            sortType: `string`,
            width: Math.round((window.innerWidth - 55) * 0.2),
          },
          {
            Cell: () =>
              <>
                <Button>
                  View
                </Button>
                <Button variant="danger">
                  Delete
                </Button>
              </>,
            Header: `Actions`,
          },
        ],
      },

    ],
    []
  );

  return (
    <div >
      <h1>Assessment List</h1>
      <hr />
      <div className="tableContainer">
        <Table columns={columns} data={assessments} />
      </div>
    </div>
  );
};
