import { StateContext } from '@/Context/StateContext';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useContext } from 'react';

export default function Range() {

    const { selectedPriceRange, setSelectedPriceRange } = useContext(StateContext);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold mb-2">Price</h2>
            <div className="flex items-center gap-2">
                <Slider
                    min={0}
                    max={selectedPriceRange[1]}
                    value={selectedPriceRange}
                    allowCross={false}
                    onChange={(value) => setSelectedPriceRange(value as number[])}
                    range
                    pushable
                />
            </div>
            <div className="flex justify-between">
                <span>{selectedPriceRange[0]}</span>
                <span>{selectedPriceRange[1]}</span>
            </div>
        </div>
    );
}
