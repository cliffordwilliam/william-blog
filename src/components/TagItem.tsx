"use client";

import { cn } from "@/lib/utils";
import { Tag } from "@prisma/client";
import { LucideIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
const TagItem = ({
  id,
  name,
  icon: Icon,
}: {
  id: Tag["id"];
  name: Tag["name"];
  icon: LucideIcon;
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTagId = searchParams.get("tagId");
  const currentTitle = searchParams.get("blogTitle");
  const isSelected = currentTagId === id;
  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
          blogTitle: currentTitle,
          tagId: isSelected ? null : id,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <span className="truncate">{name}</span>
    </button>
  );
};

export default TagItem;
