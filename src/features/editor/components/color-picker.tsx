import { ChromePicker, CirclePicker, ColorResult } from "react-color";

import { colors } from "../types";
import { rgbaObjectToString } from "../utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const onChangeColor = (color: ColorResult) => {
    const formattedValue = rgbaObjectToString(color.rgb);
    onChange(formattedValue);
  };

  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={onChangeColor}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={onChangeColor}
      />
    </div>
  );
};
