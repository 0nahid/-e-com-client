import { StateContext } from '@/Context/StateContext';
import 'rc-slider/assets/index.css';
import { useContext } from 'react';

export default function Range() {

    const { selectedPriceRange, setSelectedPriceRange } = useContext(StateContext);

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold mb-2">Price</h2>
            <div className="flex items-center gap-2">
                <div className="flex items-center">
                    <label htmlFor="range" className="mr-2">Range:</label>
                    <input id="range" type="range" className="form-range h-6 w-96" min="0" max="100" />
                    <input id="rangeValue" type="number" className="form-input ml-2 w-16" value="0" min="0" max="100" />
                </div>
            </div>
            <div className="flex justify-between">
                <span>{selectedPriceRange[0]}</span>
                <span>{selectedPriceRange[1]}</span>
            </div>
        </div>
    );
}
