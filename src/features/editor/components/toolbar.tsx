"use client";

import { useState } from "react";
import { BsBorderWidth } from "react-icons/bs";
import { TbColorFilter } from "react-icons/tb";
import { RxTransparencyGrid } from "react-icons/rx";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  BringToFront,
  ChevronDown,
  SendToBack,
  Trash,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { isTextType } from "../utils";
import { ActiveTool, Editor } from "../types";
import { FontSizeInput } from "./font-size-input";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  activeTool,
  editor,
  onChangeActiveTool,
}: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight();
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLinethrough = editor?.getAtiveFontLinethrough();
  const initialFontUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize();

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  });

  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const toggleBold = () => {
    const selectedObject = editor?.selectedObjects[0];

    if (!selectedObject) return;

    const newValue = properties.fontWeight! > 500 ? 500 : 700;
    editor?.changeFontWeight(newValue);
    setProperties((current) => ({ ...current, fontWeight: newValue }));
  };

  const toggleItalic = () => {
    const selectedObject = editor?.selectedObjects[0];

    if (!selectedObject) return;

    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";
    editor?.changeFontStyle(newValue);
    setProperties((current) => ({ ...current, fontStyle: newValue }));
  };

  const toggleLinethrough = () => {
    const selectedObject = editor?.selectedObjects[0];

    if (!selectedObject) return;

    const newValue = !properties.fontLinethrough;
    editor?.changeFontLinethrough(newValue);
    setProperties((current) => ({ ...current, fontLinethrough: newValue }));
  };

  const toggleUnderline = () => {
    const selectedObject = editor?.selectedObjects[0];

    if (!selectedObject) return;

    const newValue = !properties.fontUnderline;
    editor?.changeFontUnderline(newValue);
    setProperties((current) => ({ ...current, fontUnderline: newValue }));
  };

  const onChangeTextAlign = (value: string) => {
    const selectedObject = editor?.selectedObjects[0];

    if (!selectedObject) return;

    editor?.changeTextAlign(value);
    setProperties((current) => ({ ...current, textAlign: value }));
  };

  const onChangeFontSize = (value: number) => {
    const selectedObject = editor?.selectedObjects[0];

    if (!selectedObject) return;

    editor?.changeFontSize(value);
    setProperties((current) => ({ ...current, fontSize: value }));
  };

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {!isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Color" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("fill")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "fill" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border"
                style={{
                  backgroundColor: properties.fillColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}

      {!isText && (
        <>
          <div className="flex items-center h-full justify-center">
            <Hint label="Stroke color" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-color")}
                size="icon"
                variant="ghost"
                className={cn(activeTool === "stroke-color" && "bg-gray-100")}
              >
                <div
                  className="rounded-sm size-4 border-2 bg-white"
                  style={{
                    borderColor: properties.strokeColor,
                  }}
                />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Stroke width" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-width")}
                size="icon"
                variant="ghost"
                className={cn(activeTool === "stroke-width" && "bg-gray-100")}
              >
                <BsBorderWidth className="size-4" />
              </Button>
            </Hint>
          </div>
        </>
      )}

      {isText && (
        <>
          <div className="flex items-center h-full justify-center">
            <Hint label="Font family" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("font")}
                size="icon"
                variant="ghost"
                className={cn(
                  "w-auto px-2 text-sm",
                  activeTool === "font" && "bg-gray-100"
                )}
              >
                <div className="max-w-[100px] truncate">
                  {properties.fontFamily}
                </div>
                <ChevronDown className="size-4 ml-2 shrink-0" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Bold" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleBold}
                size="icon"
                variant="ghost"
                className={cn(properties.fontWeight! > 500 && "bg-gray-100")}
              >
                <FaBold className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Italic" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleItalic}
                size="icon"
                variant="ghost"
                className={cn(
                  properties.fontStyle! === "italic" && "bg-gray-100"
                )}
              >
                <FaItalic className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Underline" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleUnderline}
                size="icon"
                variant="ghost"
                className={cn(properties.fontUnderline && "bg-gray-100")}
              >
                <FaUnderline className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Linethrough" side="bottom" sideOffset={5}>
              <Button
                onClick={toggleLinethrough}
                size="icon"
                variant="ghost"
                className={cn(properties.fontLinethrough && "bg-gray-100")}
              >
                <FaStrikethrough className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Align left" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("left")}
                size="icon"
                variant="ghost"
                className={cn(properties.textAlign === "left" && "bg-gray-100")}
              >
                <AlignLeft className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Align center" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("center")}
                size="icon"
                variant="ghost"
                className={cn(
                  properties.textAlign === "center" && "bg-gray-100"
                )}
              >
                <AlignCenter className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <Hint label="Align right" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeTextAlign("right")}
                size="icon"
                variant="ghost"
                className={cn(
                  properties.textAlign === "right" && "bg-gray-100"
                )}
              >
                <AlignRight className="size-4" />
              </Button>
            </Hint>
          </div>

          <div className="flex items-center h-full justify-center">
            <FontSizeInput
              value={properties.fontSize!}
              onChange={onChangeFontSize}
            />
          </div>
        </>
      )}

      {isImage && (
        <>
          <div className="flex items-center h-full justify-center">
            <Hint label="Filters" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("filter")}
                size="icon"
                variant="ghost"
                className={cn(activeTool === "filter" && "bg-gray-100")}
              >
                <TbColorFilter className="size-4" />
              </Button>
            </Hint>
          </div>
        </>
      )}

      <div className="flex items-center h-full justify-center">
        <Hint label="Bring Forward" side="bottom" sideOffset={5}>
          <Button onClick={editor?.bringForward} size="icon" variant="ghost">
            <BringToFront className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Send backwards" side="bottom" sideOffset={5}>
          <Button onClick={editor?.sendBackwards} size="icon" variant="ghost">
            <SendToBack className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex items-center h-full justify-center">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button
            onClick={editor?.delete}
            size="icon"
            variant="ghost"
            className="text-rose-500"
          >
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
