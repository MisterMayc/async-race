import { IWinner } from '../types';

const updateWinner = (id: number, time: number, winnersData: IWinner[]) => {
  const carIndex = winnersData.findIndex((car) => car.id === id);

  if (carIndex !== -1) {
    // Car found in the list
    const updatedCarsData = [...winnersData];
    updatedCarsData[carIndex].wins += 1;
    if (time < updatedCarsData[carIndex].time) {
      updatedCarsData[carIndex].time = time;
    }
    return updatedCarsData;
  }
  // Car not found in the list, add new entry
  return [...winnersData, { id, wins: 1, time }];
};

export default updateWinner;
