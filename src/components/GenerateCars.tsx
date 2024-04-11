import { LoadCarsFunction } from '../types';
import generateCars from './randomCars';
import fetchData, { deleteData, postData } from '../api';
import { useContext, useState } from 'react';
import WinnerContext from '../WinnerContext.ts';

export default function GenerateCars({
  loadCars,
  carsToDelete,
}: {
  loadCars: LoadCarsFunction;
  carsToDelete: object[];
}) {
  const [winnersToDelete, setWinnersToDelete] = useState([]);
  const postRandomCars = () => {
    const randomCars = generateCars();
    randomCars.map((current) =>
      postData(`${import.meta.env.VITE_BACKEND_API}/garage`, {
        name: current.name,
        color: current.color,
      }),
    );
  };

  // const getWinners = async () => {
  //   await fetchData(`${import.meta.env.VITE_BACKEND_API}/winners`).then((r) =>
  //     setWinnersToDelete(r),
  //   );
  // };

  const { winners } = useContext(WinnerContext);

  const deleteCar = (id: number) => {
    // @ts-ignore
    deleteData(`http://127.0.0.1:3000/garage/${id}`);
  };
  const deleteWinner = (id: number) => {
    // @ts-ignore
    deleteData(`http://127.0.0.1:3000/winners/${id}`);
  };
  const generation = () => {
    carsToDelete.forEach((current) => {
      // @ts-ignore
      deleteCar(current.id);
    });
    winners.forEach((current) => {
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
