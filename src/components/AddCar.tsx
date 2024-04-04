import { postData } from '../api';
import { LoadCarsFunction } from '../types';

export default function AddCar({ loadCars }: { loadCars: LoadCarsFunction }) {
  const handleCarPost = () => {
    postData('http://127.0.0.1:3000/garage', {
      name: 'BMW',
      color: '#ffffff',
    });

    loadCars();
  };
  return (
    <div>
      <button type="submit" onClick={handleCarPost}>
        Add
      </button>
    </div>
  );
}
