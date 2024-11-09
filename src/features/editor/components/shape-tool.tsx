import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

interface ShapeToolProps {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
}

export const ShapeTool = ({
  icon: Icon,
  onClick,
  iconClassName,
}: ShapeToolProps) => {
  return (
    <button onClick={onClick} className="aspect-spare border rouned-md p-5">
      <Icon className={cn("size-full", iconClassName)} />
    </button>
  );
};
