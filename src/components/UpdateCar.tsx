import { useState } from 'react';
import { updateData } from '../api';
import { LoadCarsFunction } from '../types.ts';

export default function UpdateCar({
  id,
  loadCars,
}: {
  id: number;
  loadCars: LoadCarsFunction;
}) {
  const [inputData, setInputData] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  console.log(id);
  const handleCarUpdate = () => {
    updateData(`http://127.0.0.1:3000/garage/${id}`, {
      name: inputData,
      color: selectedColor,
    });

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
    <div>
      <input
        type="text"
        value={inputData}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Give me a car name"
      />
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => handleColorChange(e.target.value)}
      />
      <button type="submit" onClick={handleCarUpdate}>
        Update
      </button>
    </div>
  );
}
