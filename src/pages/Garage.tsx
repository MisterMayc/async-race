import { useCallback, useContext, useEffect, useState } from 'react';
import { ICar, IWinnerInfo } from '../types';
import fetchData from '../api';
import GarageControls from '../components/GarageControls';
import RaceTrack from '../components/RaceTrack';
import Layout from '../Layout';
import WinnerPopup from '../components/WinnerPopup';
import WinnerContext from '../WinnerContext';

export default function Garage() {
  const [data, setData] = useState<ICar[]>([]);
  const [winnerss, setWinnerss] = useState<IWinnerInfo[]>([]);
  const [selectedCar, setSelectedCar] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [raceStarted, setRaceStarted] = useState<boolean>(false);
  // @ts-ignore
  const { winner, setWinner } = useContext(WinnerContext);
  const carsPerPage: number = 7;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = data.slice(indexOfFirstCar, indexOfLastCar);
  const [racersCount, setRacersCount] = useState(0);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleWinner = useCallback(
    (carID: number, carName: string, carColor: string, time?: number) => {
      if (!winner) {
        setWinner(carID);
        setWinnerss((prevState: object | null) => {
          return [
            // @ts-ignore
            ...prevState,
            { name: carName, id: carID, color: carColor, time },
          ];
        });
      }
    },
    [winner, raceStarted],
  );

  useEffect(() => {
    if (racersCount === currentCars.length && winnerss.length) {
      setShowWinnerPopup(true);
      setWinner(winnerss[0]);
    }
  }, [winnerss, racersCount]);
  const loadCars = () => {
    fetchData(`${import.meta.env.VITE_BACKEND_API}/garage`).then((r) => {
      if (!r) {
        throw new Error('Bad request !');
      }
      setData(r);
      paginate(currentPage);
    });
  };

  const handleRaceFinish = () => {
    setRaceStarted(false);
    setShowWinnerPopup(false);
    setRacersCount(0);
  };

  useEffect(() => {
    loadCars();
  }, [currentPage]);
  return (
    <Layout>
      <GarageControls
        setRaceStarted={setRaceStarted}
        raceStarted={raceStarted}
        carsData={data}
        selectedCar={selectedCar}
        loadCars={loadCars}
      />
      <div className="flex gap-2 flex-col">
        <RaceTrack
          racersCount={racersCount}
          setRacersCount={setRacersCount}
          handleWinner={handleWinner}
          raceStarted={raceStarted}
          currentCars={currentCars}
          loadCars={loadCars}
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
          winner={winner}
          setWinner={setWinner}
        />
      </div>
      {showWinnerPopup && (
        <WinnerPopup
          onClose={() => handleRaceFinish()}
          car={winnerss[0]}
          raceStarted={raceStarted}
        />
      )}
      <div className="flex items-center gap-4 justify-center mt-4">
        <p className="absolute top-6 right-6 text-2xl">
          Total cars {data.length}
        </p>
        <button
          type="submit"
          onClick={() =>
            paginate(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          className="text-white"
        >
          Prev Page
        </button>
        <p className="text-2xl">Page {currentPage}</p>
        <button
          type="submit"
          onClick={() =>
            paginate(
              currentPage < data.length / carsPerPage ? currentPage + 1 : 1,
            )
          }
          className="text-white"
        >
          Next Page
        </button>
      </div>
    </Layout>
  );
}
