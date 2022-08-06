import { Sidebar } from "@lana/components";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  createColumnHelper,
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";

import data from "../assets/users.json";

interface User {
  name: string;
  email: string;
  address: string;
  phone: string;
  country: string;
  postalZip: string;
  region: string;
}

const columnHelper = createColumnHelper<User>();

const columns: ColumnDef<User>[] = [
  // Display Column
  // columnHelper.display({
  //   id: "actions",
  //   cell: (props) => <RowActions row={props.row} />,
  // }),
  // Grouping Column
  columnHelper.group({
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      // Accessor Column
      columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      }),
      // Accessor Column
      columnHelper.accessor((row) => row.name, {
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  // Grouping Column
  columnHelper.group({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      // Accessor Column
      columnHelper.accessor("phone", {
        header: () => "Phone",
        footer: (props) => props.column.id,
      }),
      // Grouping Column
      columnHelper.group({
        header: "More Info",
        columns: [
          // Accessor Column
          columnHelper.accessor("address", {
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          }),
          // Accessor Column
          columnHelper.accessor("country", {
            header: "Country",
            footer: (props) => props.column.id,
          }),
          // Accessor Column
          columnHelper.accessor("postalZip", {
            header: "Postal Zip",
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

export const Homepage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-full bg-slate-100 dark:bg-slate-900 flex flex-col items-end">
      <Sidebar onOpenChange={setSidebarOpen} />
      <motion.div
        transition={{ ease: "easeInOut" }}
        animate={{ paddingLeft: isSidebarOpen ? "272px" : 0 }}
        className="pl-[272px] h-full w-full"
      >
        <div className="p-8 mx-auto max-w-6xl h-full">
          <div className="h-full border bg-white rounded-xl">
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
