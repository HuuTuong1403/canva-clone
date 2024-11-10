import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ActiveTool, Editor, FONT_FAMILY, fonts } from "../types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { Button } from "@/components/ui/button";

interface FontSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {
  const value = editor?.getActiveFontFamily() || FONT_FAMILY;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Font" description="Change the text font" />
      <ScrollArea>
        <div className="p-4 space-y-6">
          {fonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "w-full h-16 justify-start text-left",
                value === font && "border-2 border-blue-50"
              )}
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "8px 16px",
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
