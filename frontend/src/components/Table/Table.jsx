import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';

interface TableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    manualPagination?: boolean;
    pageCount?: number;
    paginationState?: PaginationState;
    onPaginationChange?: (
        updater: PaginationState | ((old: PaginationState) => PaginationState)
    ) => void;
    onRowClick?: (rowData: T) => void;
}

export function Table<T extends object>({
    data,
    columns,
    manualPagination = false,
    pageCount = 0,
    paginationState,
    onPaginationChange,
    onRowClick,
}: TableProps<T>) {
    const columnsWithSerial: ColumnDef<T, any>[] = [
        {
        id: 'serial',
        header: 'S.No',
        cell: ({ row }) =>
            paginationState
            ? row.index + 1 + paginationState.pageIndex * paginationState.pageSize
            : row.index + 1,
        },
        ...columns,
    ];

    const table = useReactTable({
        data,
        columns: columnsWithSerial,
        state: {
        pagination: paginationState ?? { pageIndex: 0, pageSize: 10 },
        },
        manualPagination,
        pageCount,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange,
    });

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-2 text-left border-b">
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr
                key={row.id}
                className="border-t hover:bg-gray-100 cursor-pointer"
                onClick={() => onRowClick?.(row.original)}
                >
                {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>

        {manualPagination && paginationState && onPaginationChange && (
            <div className="flex justify-center items-center gap-2 mt-4">
            <button
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Prev
            </button>
            <span className="text-sm">
                Page{' '}
                <strong>
                {paginationState.pageIndex + 1} of {pageCount}
                </strong>
            </span>
            <button
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </button>
            </div>
        )}
        </div>
    );
}
