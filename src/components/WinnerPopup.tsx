import { FaCarSide } from 'react-icons/fa';
import { IPopup } from '../types';

function WinnerPopup({ car, onClose }: IPopup) {
  return (
    <div className="absolute flex w-screen top-0 bottom-0 items-center justify-center bg-[--transparent-bg]">
      <div className="absolute flex shadow-2xl flex-col gap-6 items-center justify-center w-96 h-72 bg-cyan-950 rounded-xl">
        <FaCarSide className="w-14 h-14" style={{ color: car.color }} />
        <p className="text-2xl">
          <span style={{ color: car.color }}>{`${car.name}`} </span> is the
          winner !
        </p>
        <button type="submit" onClick={onClose} className="w-20 h-10">
          OK
        </button>
      </div>
    </div>
  );
}

export default WinnerPopup;
