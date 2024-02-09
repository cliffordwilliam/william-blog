"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTagId = searchParams.get("tagId");
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathName,
        query: {
            blogTitle: debounceValue,
          tagId: currentTagId,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debounceValue, currentTagId, router, pathName]);
  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search for a blog"
      />
    </div>
  );
};

export default SearchInput;
