import React from 'react'
import { useTable, usePagination } from 'react-table'
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap'

function Mini(props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: props.columns,
      data: props.data
    },
    usePagination
  )

  return (
    <>
      <Table {...getTableProps()} bordered hover>
        <thead>
          {headerGroups.map(headerGroups => (
            <tr {...headerGroups.getHeaderGroupProps()}>
              {headerGroups.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Pagination>
        <PaginationItem disabled={!canPreviousPage}>
          <PaginationLink first onClick={() => gotoPage(0)}></PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!canPreviousPage}>
          <PaginationLink previous onClick={() => previousPage()}></PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!canNextPage}>
          <PaginationLink next onClick={() => nextPage()}></PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={!canNextPage}>
          <PaginationLink last onClick={() => gotoPage(pageCount - 1)}></PaginationLink>
        </PaginationItem>
      </Pagination>

      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span>
        | Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          style={{ width: '100px' }}
        />
      </span>{' '}
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>

    </>
  )

}

export default Mini
