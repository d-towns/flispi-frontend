import React, { useEffect } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import "./Slider.css";

interface SliderProps {
    onValueCommit: (value: number[]) => void;
    initialValue: number[];
    unit: string;
    formatter?: Intl.NumberFormat;
    defaultValue: number[];
    max: number;
    step: number;
}

const Slider: React.FC<SliderProps> = ({ onValueCommit, initialValue, unit, formatter, defaultValue, max, step}) => {

    const [value, setValue] = React.useState(initialValue);

    // get the price from the searchParams and set the value of the slider to that price
    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const price = searchParams.get(unit);
      if (price) {
        setValue([parseInt(price)]);
      }
    }
    , [])



    return (
      <div className="text-center w-full">
        <div className="mb-5">
      <span >Up to {formatter ? formatter.format(value[0]) : value[0]} {unit ? unit: ''}</span>
      </div>
        <form className="w-full">
        <RadixSlider.Root value={value} onValueChange={setValue} className="SliderRoot" defaultValue={defaultValue} max={max} step={step} onValueCommit={onValueCommit}>
        <RadixSlider.Track className="SliderTrack">
          <RadixSlider.Range className="SliderRange" />
        </RadixSlider.Track>
        <RadixSlider.Thumb className="SliderThumb" aria-label="Volume" />
      </RadixSlider.Root>
      </form>
      </div>
    )
}

export default Slider;