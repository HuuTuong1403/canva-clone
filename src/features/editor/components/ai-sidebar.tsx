import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ActiveTool, Editor } from "../types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import { useState } from "react";

interface AiSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}

export const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const mutation = useGenerateImage();
  const [value, setValue] = useState("");

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { prompt: value },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      }
    );
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />
      <ScrollArea>
        <form onSubmit={onSubmit} className="p-4 space-y-6">
          <Textarea
            placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
            cols={30}
            rows={10}
            required
            minLength={3}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
