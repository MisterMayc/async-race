import '../index.css';
import { TbCarSuv } from 'react-icons/tb';

export default function CarTrack({
  carColor,
  carName,
}: {
  carColor: string;
  carName: string;
}) {
  return (
    <div className="w-full">
      <div
        className="flex w-full gap-6 h-28 rounded-lg items-center"
        style={{ border: `2px solid ${carColor}` }}
      >
        <div className="flex gap-2 flex-col w-52">
          <div className="flex w-52">
            <button className="w-1/2" type="submit">
              Start
            </button>
            <button className="w-1/2" type="submit">
              Stop
            </button>
          </div>
          <div className="flex w-52">
            <button className="w-1/2" type="submit">
              Select
            </button>
            <button className="w-1/2" type="submit">
              Remove
            </button>
          </div>
        </div>
        <div className="flex w-full justify-center relative items-center">
          <div className="flex left-0 justify-center items-center gap-3 absolute">
            <TbCarSuv className="w-14 h-14" style={{ color: carColor }} />
          </div>
          <p
            className="absolute left-20 uppercase text-2xl"
            style={{ color: carColor }}
          >
            {carName}
          </p>
        </div>
      </div>
    </div>
  );
}
