// TODO manage keeping types in another place

export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IGarageControls {
  setRaceStarted: Function;
  raceStarted: Boolean;
  carsData: object[];
  selectedCar: number | null;
  loadCars: LoadCarsFunction;
}

export interface RaceTrackProps {
  racersCount: number;
  setRacersCount: (n: (prev: number) => number) => void;
  handleWinner: (id: number, name: string, color: string) => void;
  raceStarted: Boolean;
  currentCars: ICar[];
  loadCars: LoadCarsFunction;
  selectedCar: number;
  setSelectedCar: (key: number) => void;
  winner: number | null;
  setWinner: (id: number) => void;
}

export interface IWinner {
  id: number;
  wins?: number;
  time: number;
}

interface ICarModels {
  [brand: string]: string[];
}

export interface IWinnerInfo {
  name: string;
  color: string;
  id: number;
  time?: number;
  wins?: number;
}

export interface IPopup {
  car: IWinnerInfo;
  onClose: () => void;
  raceStarted: boolean;
}

export interface ICarTrack {
  setRacersCount: (n: (prev: number) => number) => void;
  racersCount: number;
  setWinner: (n: number) => void;
  raceStarted: Boolean;
  loadCars: LoadCarsFunction;
  selectedCar: number;
  setSelectedCar: (key: number) => void;
  carColor: string;
  carName: string;
  carID: number;
  handleWinner: (
    carID: number,
    carName: string,
    carColor: string,
    time: number,
  ) => void;
  winner: number | null;
}

export type LoadCarsFunction = () => void;

export const CarBrands: string[] = [
  'Toyota',
  'Honda',
  'Ford',
  'Mercedes',
  'BMW',
];
export const CarModels: ICarModels = {
  Toyota: ['Camry', 'Corolla', 'Rav4'],
  Honda: ['Civic', 'Accord', 'CR-V'],
  Ford: ['Mustang', 'F-150', 'Explorer'],
  Mercedes: ['CLA', 'CLS', 'G-Class'],
  BMW: ['M3', 'M5 F90', 'M8', 'M4', 'X5'],
};
