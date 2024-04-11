import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col max-w-screen w-screen">
      <div className="flex justify-center items-center gap-4 h-20">
        <Link className="font-bold text-2xl text-blue-800" to="/">
          Garage
        </Link>
        <Link className="font-bold text-2xl text-blue-800" to="/winners">
          Winners
        </Link>
      </div>
      {children}
    </div>
  );
}
