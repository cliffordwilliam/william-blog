import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { blogId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("sign-in");
  }
  const blog = await db.blog.findUnique({ where: { id: params.blogId } });
  if (!blog) {
    redirect("/");
  }
  return (
    <div>
      {params.blogId}
      {/* <pre>{JSON.stringify(blog)}</pre> */}
    </div>
  );
};

export default Page;
