import { useContext } from 'react';
import { IWinner, LoadCarsFunction } from '../types';
import generateCars from './randomCars';
import { deleteData, postData } from '../api';
import WinnerContext from '../WinnerContext';

export default function GenerateCars({
  loadCars,
  carsToDelete,
}: {
  loadCars: LoadCarsFunction;
  carsToDelete: object[];
}) {
  const postRandomCars = () => {
    const randomCars = generateCars();
    randomCars.map((current) =>
      postData(`${import.meta.env.VITE_BACKEND_API}/garage`, {
        name: current.name,
        color: current.color,
      }),
    );
  };
  // @ts-ignore
  const { winners } = useContext(WinnerContext);

  const deleteCar = (id: number) => {
    deleteData(`http://127.0.0.1:3000/garage/${id}`);
  };
  const deleteWinner = (id: number) => {
    deleteData(`http://127.0.0.1:3000/winners/${id}`);
  };
  const generation = () => {
    carsToDelete.forEach((current) => {
      // @ts-ignore
      deleteCar(current.id);
    });
    winners.forEach((current: IWinner) => {
      // @ts-ignore
      deleteWinner(current.id);
    });
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
