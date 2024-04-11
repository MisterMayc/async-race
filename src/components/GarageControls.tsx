import { IGarageControls } from '../types';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';
import GenerateCars from './GenerateCars';

export default function GarageControls({
  setRaceStarted,
  raceStarted,
  carsData,
  loadCars,
  selectedCar,
}: IGarageControls) {
  return (
    <div>
      <div className="garage-controls">
        <button
          disabled={!!raceStarted}
          type="submit"
          className={`${raceStarted ? 'default text-gray-500' : 'pointer}'}`}
          onClick={() => setRaceStarted(!raceStarted)}
        >
          Start Race
        </button>
        <AddCar loadCars={loadCars} />
        <UpdateCar id={selectedCar} loadCars={loadCars} />
        <GenerateCars carsToDelete={carsData} loadCars={loadCars} />
      </div>
    </div>
  );
}
