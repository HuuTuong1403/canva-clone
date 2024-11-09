"use client";

import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

import { useEditor } from "@/features/editor/hooks/use-editor";

import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { ActiveTool, selectionDepentTools } from "../types";
import { ShapeSidebar } from "./shape-sidebar";
import { FillColorSidebar } from "./fill-color-sidebar";

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onClearSelection = useCallback(() => {
    if (selectionDepentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor();

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }

      if (tool === "draw") {
      }

      if (activeTool === "draw") {
      }

      setActiveTool(tool);
    },
    [activeTool]
  );

  return (
    <div className="h-full flex flex-col">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
          editor={editor}
        />
        <FillColorSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
          editor={editor}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            key={JSON.stringify(editor?.canvas.getActiveObject())}
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
          <div className="flex-1 h-[calc(100%-124px)]" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};
