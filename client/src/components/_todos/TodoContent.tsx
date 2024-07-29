"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronsUpDown } from "lucide-react";

type TodoContentProps = {
  content: string;
};

function TodoContent({ content }: TodoContentProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <span className="px-1">
          <ChevronsUpDown height={15} />
        </span>
      </HoverCardTrigger>
      <HoverCardContent>{content}</HoverCardContent>
    </HoverCard>
  );
}

export default TodoContent;
