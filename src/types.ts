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
  setRacersCount: (n: number) => void;
  handleWinner: (id: number, name: string, color: string) => void;
  raceStarted: Boolean;
  currentCars: ICar[];
  loadCars: LoadCarsFunction;
  selectedCar: number;
  setSelectedCar: (key: number) => void;
  winner: number | null;
  setWinner: (id: number) => void;
  isWinnerDeclared: boolean;
}

export interface IWinner {
  id: number;
  wins: number;
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
}

export interface IPopup {
  car: IWinnerInfo;
  onClose: () => void;
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
  BMW: ['3 Series', '5 Series', 'X5'],
};
