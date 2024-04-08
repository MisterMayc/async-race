import { LoadCarsFunction } from '../types';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';
import GenerateCars from './GenerateCars';

export default function GarageControls({
  setRaceStarted,
  raceStarted,
  carsData,
  loadCars,
  selectedCar,
  // TODO remove this shit and find a use or delete the variables
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentCars,
}: {
  setRaceStarted: Function;
  raceStarted: Boolean;
  carsData: object[];
  selectedCar: number;
  loadCars: LoadCarsFunction;
  id: number;
  currentCars: object;
}) {
  return (
    <div>
      <div className="flex w-full h-14 items-center gap-4 bg-amber-900">
        <button type="submit" onClick={() => setRaceStarted(!raceStarted)}>
          {raceStarted ? 'Stop Race' : 'Start Race'}
        </button>
        <AddCar loadCars={loadCars} />
        <UpdateCar id={selectedCar} loadCars={loadCars} />
        <GenerateCars carsToDelete={carsData} loadCars={loadCars} />
      </div>
    </div>
  );
}
