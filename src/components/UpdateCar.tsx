import { useState } from 'react';
import { updateData } from '../api';
import { LoadCarsFunction } from '../types';

export default function UpdateCar({
  id,
  loadCars,
}: {
  id: number | null;
  loadCars: LoadCarsFunction;
}) {
  const [inputData, setInputData] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleCarUpdate = () => {
    if (!inputData) {
      alert('Car name can not be empty !');
    } else {
      updateData(`http://127.0.0.1:3000/garage/${id}`, {
        name: inputData,
        color: selectedColor,
      });
    }
    loadCars();
    setInputData('');
    setSelectedColor('#ffffff');
  };
  const handleInputChange = (val: string) => {
    setInputData(val);
  };

  const handleColorChange = (val: string) => {
    setSelectedColor(val);
  };

  return (
    <div className="flex justify-center items-center gap-4 bg-cyan-950 p-2 rounded-lg">
      <input
        type="text"
        value={inputData}
        className="rounded-lg pl-2 h-10"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Give me a car name"
      />
      <input
        type="color"
        className="rounded-lg p-0 h-10 border-0"
        value={selectedColor}
        onChange={(e) => handleColorChange(e.target.value)}
      />
      <button type="submit" onClick={handleCarUpdate}>
        Update
      </button>
    </div>
  );
}
