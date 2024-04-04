import { useEffect, useState } from 'react';
import CarTrack from '../components/CarTrack';
import { ICar } from '../types';
import AddCar from '../components/AddCar';
import fetchData from '../api';
import UpdateCar from '../components/UpdateCar.tsx';

export default function Garage() {
  const [data, setData] = useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = useState(0);

  const loadCars = () => {
    fetchData('http://127.0.0.1:3000/garage').then((r) => {
      if (!r) {
        console.error('Bad request !');
      }
      setData(r);
    });
  };

  useEffect(() => {
    loadCars();
  }, []);
  console.log(data);
  // @ts-ignore
  return (
    <div className="flex flex-col gap-2 max-w-full w-full">
      <div className="flex w-full h-10 bg-amber-900">
        <AddCar loadCars={loadCars} />
        <UpdateCar id={selectedCar} loadCars={loadCars} />
      </div>
      <div className="flex p-6 flex-col gap-6">
        {data.map((item: { color: string; name: string; id: number }) => (
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
        ))}
      </div>
    </div>
  );
}
