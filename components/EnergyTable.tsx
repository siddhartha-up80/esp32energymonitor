//@ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

export default function EnergyTable() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const formatIndianTime = (isoString) => {
    const options = {
      timeZone: "Asia/Kolkata", // Indian timezone
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Date(isoString).toLocaleString("en-IN", options);
  };

  const rowsPerPage = 10; // Adjust as needed

  const list = useAsyncList({
    async load({ signal, cursor }) {
      try {
        setIsLoading(true);

        const res = await fetch(
          `http://localhost:3000/api/getdata?page=${page}&limit=${rowsPerPage}`,
          { signal }
        );
        const json = await res.json();

        setIsLoading(false);

        return {
          items: json,
        };
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
        return {
          items: [],
        };
      }
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });


  useEffect(() => {
    list.reload(); // Refresh data when page changes
  }, [page]);

  return (
    <>
      <Table
        aria-label="Energy Data Table"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-[60vh]",
          table: "min-w-[60vw]",
        }}
      >
        <TableHeader>
          <TableColumn key="time" allowsSorting>
            Time
          </TableColumn>
          <TableColumn key="voltage" allowsSorting>
            Voltage
          </TableColumn>
          <TableColumn key="current" allowsSorting>
            Current
          </TableColumn>
          <TableColumn key="power" allowsSorting>
            Power
          </TableColumn>
          <TableColumn key="energy" allowsSorting>
            Energy
          </TableColumn>
        </TableHeader>
        <TableBody
          items={list.items}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "time"
                    ? formatIndianTime(item[columnKey])
                    : item[columnKey]}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center mt-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={list.totalPages}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
}