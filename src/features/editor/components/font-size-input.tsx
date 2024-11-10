import { Minus, Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const FontSizeInput = ({ onChange, value }: FontSizeInputProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange(value);
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        className="p-2 rounded-r-none border-r-0"
        size="icon"
        onClick={decrement}
      >
        <Minus className="size-4" />
      </Button>

      <Input
        className="w-[50px] h-8 focus-visible:ring-offet-0 focus-visible:ring-0 rounded-none"
        onChange={handleChange}
        value={value}
      />

      <Button
        variant="outline"
        className="p-2 rounded-l-none border-l-0"
        size="icon"
        onClick={increment}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};