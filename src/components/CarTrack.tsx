import { useEffect, useState } from 'react';
import '../index.css';
import { VscDebugStart, VscDebugStop } from 'react-icons/vsc';
import { FaCarSide } from 'react-icons/fa';
import { deleteData, patchData } from '../api';
import { ICarTrack } from '../types';

export default function CarTrack({
  setRacersCount,
  raceStarted,
  loadCars,
  selectedCar,
  setSelectedCar,
  carColor,
  carName,
  carID,
  handleWinner,
  winner,
}: ICarTrack) {
  const [driveMode, setDriveMode] = useState(false);
  const [animationTime, setAnimationTime] = useState('');
  const [animationStatus, setAnimationStatus] = useState('paused');
  const handleCarDelete = () => {
    deleteData(`http://127.0.0.1:3000/garage/${carID}`);
    deleteData(`http://127.0.0.1:3000/winners/${carID}`);
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

  const testDrive = (id: number) => {
    if (!driveMode) {
      startEngine(id, 'stopped').then((engineResponse) => {
        if (engineResponse === 200) {
          getCarPower(id, 'started').then((r) => {
            const speed = r.data.distance / r.data.velocity;
            setAnimationTime(`${Math.floor(speed)}ms`);
            setAnimationStatus('running');
            setDriveMode(true);
          });
        }
      });
    } else {
      setAnimationTime('0');
      setDriveMode(false);
    }
  };

  useEffect(() => {
    if (raceStarted && !winner) {
      startEngine(carID, 'stopped')
        .then((engineResponse) => {
          if (engineResponse === 200) {
            getCarPower(carID, 'started').then((r) => {
              const raceDuration = r.data.distance / r.data.velocity;
              setAnimationTime(`${Math.floor(raceDuration)}ms`);
              setAnimationStatus('running');
              setDriveMode(true);
              getCarPower(carID, 'drive')
                .then(() => {
                  if (!winner) {
                    handleWinner(
                      carID,
                      carName,
                      carColor,
                      Math.floor(raceDuration),
                    );
                  }
                  setRacersCount((prev: number) => prev + 1);
                })
                .catch(() => {
                  setAnimationStatus('paused');
                  setRacersCount((prev: number) => prev + 1);
                });
            });
          }
        })
        .catch((error) => {
          // Handle error if the startEngine function fails
          console.error('Error starting engine:', error);
        });
    } else if (!raceStarted) {
      setAnimationTime('');
    }
  }, [raceStarted, winner]);
  return (
    <div className="w-full">
      <div
        className="flex w-full gap-6 h-32 items-center bg-gray-800"
        style={{
          borderWidth: `${selectedCar === carID ? '5' : '2'}px 0`,
          borderColor: `${carColor}`,
        }}
      >
        <div className="flex gap-1 flex-col">
          <div className="flex flex-col">
            <button
              className="w-full flex justify-center items-center text-center"
              type="submit"
              // onClick={() => setDriveMode(!driveMode)}
              onClick={() => testDrive(carID)}
            >
              {driveMode ? <VscDebugStop /> : <VscDebugStart />}
            </button>
          </div>
          <div className="flex gap-1 flex-col w-18">
            <button
              onClick={() =>
                selectedCar === carID
                  ? setSelectedCar(0)
                  : setSelectedCar(carID)
              }
              className="w-full"
              type="submit"
            >
              Select
            </button>
            <button
              className="w-full"
              onClick={() => handleCarDelete()}
              type="submit"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="flex w-full left-0 justify-center relative items-center h-14">
          <div className="flex justify-center left-0 items-center w-14 h-14 gap-3 absolute">
            <FaCarSide
              className={`w-14 left-0 h-14 ${animationTime ? 'animate-move' : ''}`}
              style={{
                color: carColor,
                animation: `${animationTime ? `move ${animationTime} linear forwards` : 'none'}`,
                animationPlayState: animationStatus,
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
    </div>
  );
}
