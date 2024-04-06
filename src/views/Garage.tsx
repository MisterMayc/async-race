import { useEffect, useState } from 'react';
import CarTrack from '../components/CarTrack';
import { ICar } from '../types';
import fetchData from '../api';
import GarageControls from '../components/GarageControls';

export default function Garage() {
  const [data, setData] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage: number = 7;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = data.slice(indexOfFirstCar, indexOfLastCar);

  const loadCars = () => {
    fetchData('http://127.0.0.1:3000/garage').then((r) => {
      if (!r) {
        throw new Error('Bad request !');
      }
      setData(r);
    });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    loadCars();
  }, [currentPage]);
  console.log(data);
  // @ts-ignore
  return (
    <div className="flex flex-col gap-2 max-w-full w-full">
      <GarageControls
        selectedCar={selectedCar}
        loadCars={loadCars}
        id={selectedCar}
        currentCars={currentCars}
      />
      <div className="flex pt-10 gap-2 flex-col">
        {currentCars.map(
          (item: { color: string; name: string; id: number }) => (
            <div key={item.id}>
              <CarTrack
                loadCars={loadCars}
                selectedCar={selectedCar}
                setSelectedCar={setSelectedCar}
                carColor={item.color}
                carName={item.name}
                carID={item.id}
              />
            </div>
          ),
        )}
      </div>
      <div className="flex justify-center mt-4">
        <ul className="flex gap-2">
          {[...Array(Math.ceil(data.length / carsPerPage))].map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className="page-item">
              <button
                type="submit"
                onClick={() => paginate(index + 1)}
                className="text-white"
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
