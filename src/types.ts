// TODO manage keeping types in another place

export interface ICar {
  name: string;
  color: string;
  id: number;
}

interface ICarModels {
  [brand: string]: string[];
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
