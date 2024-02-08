import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div>
      <Button>root</Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Page;
