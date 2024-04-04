import { postData } from '../api';
import { LoadCarsFunction } from '../types';
import { useState } from 'react';

export default function AddCar({ loadCars }: { loadCars: LoadCarsFunction }) {
  const [inputData, setInputData] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const handleCarPost = () => {
    if (!inputData) {
      alert('please type a car name');
    } else {
      postData('http://127.0.0.1:3000/garage', {
        name: inputData,
        color: selectedColor,
      });

      loadCars();
      setInputData('');
      setSelectedColor('#ffffff');
    }
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
      <button type="submit" onClick={handleCarPost}>
        Add
      </button>
    </div>
  );
}
