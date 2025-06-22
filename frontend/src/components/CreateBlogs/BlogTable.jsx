import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

function BlogTable() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/post/getmyblogs`, {
          withCredentials: true,
        });
        console.log('Fetched blogs:', res.data);
        setBlogs(res.data.posts); // assuming `posts` is returned
      } catch (err) {
        setError('Failed to fetch posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  },[]);

  // Columns for table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Blog Title',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created On',
        cell: info => new Date(info.getValue()).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: blogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading blogs...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found for this user.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-2 border">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BlogTable;
