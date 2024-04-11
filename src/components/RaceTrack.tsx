import React from 'react';
import CarTrack from './CarTrack';
import { ICar, RaceTrackProps } from '../types';

const RaceTrack: React.FC<RaceTrackProps> = ({
  racersCount,
  setRacersCount,
  winner,
  setWinner,
  handleWinner,
  raceStarted,
  currentCars,
  loadCars,
  selectedCar,
  setSelectedCar,
}: RaceTrackProps) => {
  return (
    <div className="flex flex-col gap-2">
      {currentCars.map((item: ICar) => (
        <div key={item.id}>
          <CarTrack
            racersCount={racersCount}
            setRacersCount={setRacersCount}
            handleWinner={handleWinner}
            winner={winner}
            setWinner={setWinner}
            raceStarted={raceStarted}
            loadCars={loadCars}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            carColor={item.color}
            carName={item.name}
            carID={item.id}
          />
        </div>
      ))}
    </div>
  );
};

export default RaceTrack;
