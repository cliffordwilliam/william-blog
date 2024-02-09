"use client";

import { Tag } from "@prisma/client";
import {
  Palette,
  Apple,
  Music,
  Code,
  FlaskConical,
  Computer,
  Plane,
  LucideIcon,
} from "lucide-react";
import TagItem from "./TagItem";

const tagIcons: Record<string, LucideIcon> = {
  Art: Palette,
  Food: Apple,
  Music: Music,
  Programming: Code,
  Science: FlaskConical,
  Technology: Computer,
  Travel: Plane,
};
const TagsList = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {tags.map((tag) => (
        <TagItem
          key={tag.id}
          id={tag.id}
          name={tag.name}
          icon={tagIcons[tag.name]}
        />
      ))}
    </div>
  );
};

export default TagsList;
