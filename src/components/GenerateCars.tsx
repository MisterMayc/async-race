import { LoadCarsFunction } from '../types';
import generateCars from './randomCars';
import { deleteData, postData } from '../api';

export default function GenerateCars({
  loadCars,
  carsToDelete,
}: {
  loadCars: LoadCarsFunction;
  carsToDelete: object[];
}) {
  const postRandomCars = () => {
    const randomCars = generateCars();
    console.log('rancars', randomCars);
    randomCars.map((current) =>
      postData('http://127.0.0.1:3000/garage', {
        name: current.name,
        color: current.color,
      }),
    );
  };

  const deleteCars = () => {
    carsToDelete.map((current) =>
      // @ts-ignore
      deleteData(`http://127.0.0.1:3000/garage/${current.id}`),
    );
  };
  const generation = () => {
    deleteCars();
    loadCars();
    postRandomCars();
    loadCars();
  };
  return (
    <div>
      <button onClick={() => generation()} type="submit">
        Generate
      </button>
    </div>
  );
}
