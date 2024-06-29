import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd'; // Assuming you are using Ant Design for buttons

const FilmCard = ({ film }) => {
  return (
    <a href="#" className="group relative block bg-black">
      <img
        alt={film.title}
        src={film.posterImageUrl}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />
      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">Developer</p>
        <p className="text-xl font-bold text-white sm:text-2xl">{film.title}</p>
        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white">
              {`Genre: ${film.genre} Duration: ${film.duration} Minutes`}
            </p>
          </div>
        </div>
        <Button type="primary">
          <Link to={`/films/${film.id}`}>View Details</Link>
        </Button>
      </div>
    </a>
  );
};

export default FilmCard;
