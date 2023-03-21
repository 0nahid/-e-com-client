import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';

export default function Range() {
    const [values, setValues] = useState<number[]>([0, 100]);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold mb-2">Price</h2>
            <div className="flex items-center gap-2">
                <Slider
                    min={0}
                    max={100}
                    value={values}
                    allowCross={false}
                    onChange={(value) => setValues(value as number[])}
                    range
                    pushable
                />
            </div>
            <div className="flex justify-between">
                <span>{values[0]}</span>
                <span>{values[1]}</span>
            </div>
        </div>
    );
}
