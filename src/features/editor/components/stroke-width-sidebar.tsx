import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ActiveTool, Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from "../types";
import { Button } from "@/components/ui/button";

interface StrokeWidthSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke options"
        description="Modify the stroke of your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <Label className="text-sm">Stroke width</Label>

          <Slider
            value={[widthValue]}
            onValueChange={(values) => onChange(values[0])}
          />
        </div>

        <div className="p-4 space-y-6">
          <Label className="text-sm">Stroke type</Label>

          <Button
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left",
              typeValue.length === 0 && "border-2 border-blue-500"
            )}
            style={{ padding: "8px 16px" }}
            onClick={() => onChangeStrokeType([])}
          >
            <div className="w-full border-black rounded-full border-4" />
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left",
              typeValue.length > 0 && "border-2 border-blue-500"
            )}
            style={{ padding: "8px 16px" }}
            onClick={() => onChangeStrokeType([5, 5])}
          >
            <div className="w-full border-black rounded-full border-4 border-dashed" />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
