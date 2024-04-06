import { useState } from 'react';
import { updateData } from '../api';
import { LoadCarsFunction } from '../types';

export default function UpdateCar({
  id,
  loadCars,
}: {
  id: number;
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

    // patchData('http://127.0.0.1:3000/engine?id=1&status=started').then((r) =>
    //   console.log(r),
    // );

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
