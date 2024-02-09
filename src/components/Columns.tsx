"use client";

import { Blog } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isPublished",
    header: "Published",
  },
];
