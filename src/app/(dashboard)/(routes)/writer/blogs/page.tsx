import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/Columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const Page = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("sign-in");
  }
  const blogs = await db.blog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="p-6">
      <DataTable columns={columns} data={blogs} />
    </div>
  );
};

export default Page;
