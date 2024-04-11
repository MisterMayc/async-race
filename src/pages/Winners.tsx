import { useEffect, useState } from 'react';
import Layout from '../Layout';
import { IWinner } from '../types';
import fetchData from '../api';

// TODO remove the interface from here

export default function Winners(winner?) {
  const [carsData, setCarsData] = useState<IWinner[]>([]);
  const [winners, setWinners] = useState<IWinner[]>();
  // const updateRaceResults = (id: number, time: number) => {
  //   const carIndex = carsData.findIndex((car) => car.id === id);
  //
  //   if (carIndex !== -1) {
  //     // Car found in the list
  //     const updatedCarsData = [...carsData];
  //     updatedCarsData[carIndex].wins += 1;
  //     if (time < updatedCarsData[carIndex].time) {
  //       updatedCarsData[carIndex].time = time;
  //     }
  //     setCarsData(updatedCarsData);
  //   } else {
  //     // Car not found in the list, add new entry
  //     setCarsData([...carsData, { id, wins: 1, time }]);
  //   }
  // };

  const updateWinners = async () => {
    const winnersData = await fetchData(
      `${import.meta.env.VITE_BACKEND_API}/winners`,
    );
    setWinners(winnersData);
    console.log(winnersData);
  };

  useEffect(() => {
    if (winner) {
      updateWinners();
    }
  }, [winner]);
  return (
    <Layout>
      {winners?.map((current, index) => {
        return (
          <div key={index} className="flex gap-4 items-center">
            <p>{current.id}</p>
            <p>{current.wins}</p>
            <p>{current.time}</p>
          </div>
        );
      })}
    </Layout>
  );
}
