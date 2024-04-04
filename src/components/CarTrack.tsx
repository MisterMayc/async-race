import '../index.css';
import { TbCarSuv } from 'react-icons/tb';
import { deleteData } from '../api';
import { LoadCarsFunction } from '../types.ts';

export default function CarTrack({
  loadCars,
  selectedCar,
  setSelectedCar,
  carColor,
  carName,
  carID,
}: {
  loadCars: LoadCarsFunction;
  selectedCar: number;
  setSelectedCar: (key: number) => void;
  carColor: string;
  carName: string;
  carID: number;
}) {
  const handleCarDelete = () => {
    deleteData(`http://127.0.0.1:3000/garage/${carID}`);
    loadCars();
  };
  return (
    <div className="w-full">
      <div
        className="flex w-full gap-6 h-28 rounded-lg items-center"
        style={{
          border: `${selectedCar === carID ? '6' : '2'}px solid ${carColor}`,
        }}
      >
        <div className="flex gap-2 flex-col w-52">
          <div className="flex w-52">
            <button className="w-1/2" type="submit">
              Start
            </button>
            <button className="w-1/2" type="submit">
              Stop
            </button>
          </div>
          <div className="flex w-52">
            <button
              onClick={() =>
                selectedCar === carID
                  ? setSelectedCar(0)
                  : setSelectedCar(carID)
              }
              className="w-1/2"
              type="submit"
            >
              Select
            </button>
            <button
              className="w-1/2"
              onClick={() => handleCarDelete()}
              type="submit"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="flex w-full justify-center relative items-center">
          <div className="flex left-0 justify-center items-center gap-3 absolute">
            <TbCarSuv className="w-14 h-14" style={{ color: carColor }} />
          </div>
          <p
            className="absolute left-20 uppercase text-2xl"
            style={{ color: carColor }}
          >
            {carName}
          </p>
        </div>
      </div>
    </div>
  );
}
