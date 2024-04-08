import { useEffect, useState } from 'react';
import { ICar } from '../types';
import fetchData from '../api';
import GarageControls from '../components/GarageControls';
import RaceTrack from '../components/RaceTrack';

export default function Garage() {
  const [data, setData] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState(0);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [raceStarted, setRaceStarted] = useState(false);
  const carsPerPage: number = 7;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = data.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const loadCars = () => {
    fetchData('http://127.0.0.1:3000/garage').then((r) => {
      if (!r) {
        throw new Error('Bad request !');
      }

      setData(r);
      paginate(currentPage);
    });
  };

  useEffect(() => {
    loadCars();
  }, [currentPage]);
  console.log(currentCars);
  return (
    <div className="flex flex-col gap-2 max-w-full w-full">
      <GarageControls
        setRaceStarted={setRaceStarted}
        raceStarted={raceStarted}
        carsData={data}
        selectedCar={selectedCar}
        loadCars={loadCars}
        id={selectedCar}
        currentCars={currentCars}
      />
      <div className="flex pt-10 gap-2 flex-col">
        <RaceTrack
          raceStarted={raceStarted}
          currentCars={currentCars}
          loadCars={loadCars}
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
        />
      </div>
      <div className="flex items-center gap-4 justify-center mt-4">
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
    </div>
  );
}
