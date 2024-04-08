import React from 'react';
import CarTrack from './CarTrack';
import { ICar, LoadCarsFunction } from '../types';

interface RaceTrackProps {
  raceStarted: Boolean;
  currentCars: ICar[];
  loadCars: LoadCarsFunction;
  selectedCar: number;
  setSelectedCar: (key: number) => void;
}

const RaceTrack: React.FC<RaceTrackProps> = ({
  raceStarted,
  currentCars,
  loadCars,
  selectedCar,
  setSelectedCar,
}) => {
  return (
    <div>
      {currentCars.map((item: ICar) => (
        <div key={item.id}>
          <CarTrack
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
