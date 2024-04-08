import { useEffect, useState } from 'react';
import '../index.css';
import { TbCarSuv } from 'react-icons/tb';
import { VscDebugStart, VscDebugStop } from 'react-icons/vsc';
import { deleteData, patchData } from '../api';
import { LoadCarsFunction } from '../types';

export default function CarTrack({
  raceStarted,
  loadCars,
  selectedCar,
  setSelectedCar,
  carColor,
  carName,
  carID,
}: {
  raceStarted: Boolean;
  loadCars: LoadCarsFunction;
  selectedCar: number;
  setSelectedCar: (key: number) => void;
  carColor: string;
  carName: string;
  carID: number;
}) {
  const [switchPlace, setSwitchPlace] = useState(true);
  const [animationTime, setAnimationTime] = useState('');
  const handleCarDelete = () => {
    deleteData(`http://127.0.0.1:3000/garage/${carID}`);
    loadCars();
  };

  const startEngine = async (id: number, status: string) => {
    const res = await patchData(
      `http://127.0.0.1:3000/engine?id=${id}&status=${status}`,
    );
    return res.status;
  };

  const getCarPower = async (id: number, status: string) => {
    const res = await patchData(
      `http://127.0.0.1:3000/engine?id=${id}&status=${status}`,
    );
    console.log(res);
    return res;
  };

  useEffect(() => {
    if (raceStarted) {
      console.log(raceStarted);
    }
  }, [raceStarted]);

  useEffect(() => {
    if (raceStarted) {
      startEngine(carID, 'stopped')
        .then((engineResponse) => {
          if (engineResponse === 200) {
            getCarPower(carID, 'started').then((r) => {
              setAnimationTime(
                `${Math.floor(r.data.distance / r.data.velocity)}ms`,
              );
              console.log(r.data.distance / r.data.velocity);
              setSwitchPlace(true);
            });
          }
        })
        .catch((error) => {
          // Handle error if the startEngine function fails
          console.error('Error starting engine:', error);
        });
    }
  }, [raceStarted]);
  return (
    <div className="w-full">
      <div
        className="flex w-full gap-6 h-28 items-center"
        style={{
          borderWidth: `${selectedCar === carID ? '5' : '2'}px 0`,
          borderColor: `${carColor}`,
        }}
      >
        <div className="flex gap-2 flex-col">
          <div className="flex">
            <button
              className="w-1/2"
              type="submit"
              onClick={() =>
                setSwitchPlace(animationTime ? !switchPlace : switchPlace)
              }
            >
              {switchPlace ? <VscDebugStart /> : <VscDebugStop />}
            </button>
          </div>
          <div className="flex">
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
        <div className="flex w-full left-0 justify-center relative items-center h-14">
          <div className="flex justify-center left-0 items-center w-14 h-14 gap-3 absolute">
            <TbCarSuv
              className={`w-14 left-0 h-14 ${animationTime ? 'animate-move' : ''}`}
              style={{
                color: carColor,
                animation: `${animationTime ? `move ${animationTime} linear forwards` : ''}`, // Apply animation directly in style
              }}
            />
          </div>
          <p
            className="absolute opacity-60 font-extrabold left-20 uppercase text-2xl"
            style={{ color: carColor }}
          >
            {carName}
          </p>
        </div>
      </div>
      <style>
        {`
          @keyframes move {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(100vw - 260px));
            }
          }
        `}
        {/* .animate-move { */}
        {/*  animation: move ${animationTime} linear forwards; */}
        {/* } */}
      </style>
    </div>
  );
}
