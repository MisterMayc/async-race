import { CarBrands, CarModels, ICar } from '../types';

const generateRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export default function generateCars() {
  const cars: ICar[] = [];
  let idCounter = 1;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 100; i++) {
    const brandIndex = Math.floor(Math.random() * CarBrands.length);
    const modelIndex = Math.floor(
      Math.random() * CarModels[CarBrands[brandIndex]].length,
    );
    const name = `${CarBrands[brandIndex]} ${CarModels[CarBrands[brandIndex]][modelIndex]}`;
    const color = generateRandomColor();
    cars.push({ id: idCounter, name, color });
    // eslint-disable-next-line no-plusplus
    idCounter++;
  }

  return cars;
}
