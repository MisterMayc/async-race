import { useContext, useEffect, useState } from 'react';
import { FaCarSide } from 'react-icons/fa';
import Layout from '../Layout';
import { IWinner, IWinnerInfo } from '../types';
import fetchData, { postData, putData } from '../api';
import WinnerContext from '../WinnerContext';

export default function Winners() {
  const { winner, winners, setWinners } = useContext(WinnerContext);
  const [renderingWinners, setRenderingWinners] = useState<IWinnerInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage: number = 10;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentWinners = renderingWinners?.slice(
    indexOfFirstCar,
    indexOfLastCar,
  );
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const updateWinners = async (winnerToUpdate: IWinner) => {
    const winnerCar = await fetchData(
      `${import.meta.env.VITE_BACKEND_API}/garage/${winnerToUpdate.id}`,
    );
    console.log(winnerCar);
    const winnersData = await fetchData(
      `${import.meta.env.VITE_BACKEND_API}/winners`,
    );
    const updatedWinners = [...winnersData];

    // Check if the winner exists
    const existingWinnerIndex = updatedWinners.findIndex(
      (w) => w.id === winnerToUpdate.id,
    );
    if (existingWinnerIndex !== -1) {
      const existingWinner = updatedWinners[existingWinnerIndex];
      existingWinner.wins += 1;
      if (existingWinner.time > winnerToUpdate.time) {
        existingWinner.time = winnerToUpdate.time;
      }
      await putData(
        `${import.meta.env.VITE_BACKEND_API}/winners/${winnerToUpdate.id}`,
        existingWinner,
      );
    } else {
      // Add the new winner
      await postData(`${import.meta.env.VITE_BACKEND_API}/winners`, {
        id: winnerToUpdate.id,
        wins: 1,
        time: winnerToUpdate.time,
      });
      updatedWinners.push(winnerToUpdate);
    }

    setWinners(updatedWinners);
    loadWinners();
  };

  const sortWinner = async (id: number) => {
    const carDetails = await fetchData(
      `${import.meta.env.VITE_BACKEND_API}/garage/${id}`,
    );
    const winnerDetails = await fetchData(
      `${import.meta.env.VITE_BACKEND_API}/winners/${id}`,
    );
    return {
      id,
      name: carDetails.name,
      color: carDetails.color,
      time: winnerDetails.time,
      wins: winnerDetails.wins,
    };
  };

  const loadWinners = async () => {
    const winnersPromises = winners.map((winner) => sortWinner(winner.id));
    const winnersData = await Promise.all(winnersPromises);
    console.log(winnersPromises);
    console.log(winnersData);
    setRenderingWinners(winnersData);
  };

  useEffect(() => {
    loadWinners();
  }, [winners]); // This will re-fetch winners when the winners state changes

  useEffect(() => {
    if (winner) {
      updateWinners(winner);
    }
  }, [winner]);

  return (
    <Layout>
      <table className="flex flex-col justify-between w-screen">
        <thead>
          <tr className="flex gap-4 justify-around items-center">
            <td>ID</td>
            <td>Car</td>
            <td>Name</td>
            <td>Wins</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {currentWinners?.map((current, index) => (
            <tr key={index} className="flex gap-4 justify-around items-center">
              <td>{current.id}</td>
              <td>
                <FaCarSide
                  style={{
                    color: current.color,
                    width: '46px',
                    height: '46px',
                  }}
                />
              </td>
              <td>{current.name}</td>
              <td>{current.wins}</td>
              <td>{current.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>{currentPage}</p>
        <button
          type="submit"
          onClick={() =>
            paginate(
              currentPage < winners.length / carsPerPage ? currentPage + 1 : 1,
            )
          }
        >
          Next Page
        </button>
      </div>
    </Layout>
  );
}
