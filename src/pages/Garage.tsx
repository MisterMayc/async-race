import { useCallback, useEffect, useState } from 'react';
import { ICar, IWinner } from '../types';
import fetchData from '../api';
import GarageControls from '../components/GarageControls';
import RaceTrack from '../components/RaceTrack';
import Layout from '../Layout';
import WinnerPopup from '../components/WinnerPopup';

export default function Garage() {
  const [data, setData] = useState<ICar[]>([]);
  const [winnerss, setWinnerss] = useState<IWinner[]>([]);
  const [selectedCar, setSelectedCar] = useState(0);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [raceStarted, setRaceStarted] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [isWinnerDeclared, setIsWinnerDeclared] = useState(false);
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
    (carID: number, carName: string, carColor: string) => {
      if (!winner) {
        console.log(`Car ${carID} won the race!`);
        setWinner(carID);
        // setRaceStarted(false);
        // setIsWinnerDeclared(true);
        setWinnerss((prevState: object | null) => {
          // @ts-ignore
          return [...prevState, { name: carName, id: carID, color: carColor }];
        });
      }
    },
    [isWinnerDeclared, winner, raceStarted],
  );

  useEffect(() => {
    console.log(winnerss);
    console.log(racersCount);
    if (racersCount === currentCars.length && winnerss.length) {
      setShowWinnerPopup(true);
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
    setWinner(0);
    setRacersCount(0);
  };

  useEffect(() => {
    loadCars();
  }, [currentPage]);
  console.log(currentCars);
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
          isWinnerDeclared={isWinnerDeclared}
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
