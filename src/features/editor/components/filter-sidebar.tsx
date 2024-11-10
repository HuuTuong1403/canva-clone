import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ActiveTool, Editor, filters } from "../types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Filter"
        description="Apply a filter to selected image"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="lg"
              className="w-full h-16 justify-start text-left"
              onClick={() => editor?.changeImageFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
