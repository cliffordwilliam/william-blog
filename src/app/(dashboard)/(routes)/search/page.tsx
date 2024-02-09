import SearchInput from "@/components/SearchInput";
import Tags from "@/components/TagsList";
import { db } from "@/lib/db";

const Page = async ({
  searchParams,
}: {
  searchParams: { blogTitle: string; tagId: string };
}) => {
  console.log(searchParams);
  const tags = await db.tag.findMany({ orderBy: { name: "asc" } });
  return (
    <main>
      <SearchInput />
      <Tags tags={tags} />
    </main>
  );
};

export default Page;
