const Page = ({ params }: { params: { blogId: string } }) => {
  return <div>{params.blogId}</div>;
};

export default Page;
