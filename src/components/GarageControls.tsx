import { LoadCarsFunction } from '../types';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';

export default function GarageControls({
  loadCars,
  selectedCar,
  id,
  currentCars,
}: {
  selectedCar: number;
  loadCars: LoadCarsFunction;
  id: number;
  currentCars: object;
}) {
  return (
    <div>
      <div className="flex w-full h-10 bg-amber-900">
        <AddCar loadCars={loadCars} />
        <UpdateCar id={selectedCar} loadCars={loadCars} />
      </div>
    </div>
  );
}
