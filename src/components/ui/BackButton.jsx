import React from 'react';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD
const BackButton = ({ className = "" }) => {
=======
const BackButton = () => {
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
<<<<<<< HEAD
    <button
      onClick={handleClick}
      className={`back-button p-2 rounded-full hover:bg-gray-700 ${className}`}
      aria-label="Back"
    >
=======
    <button onClick={handleClick} className="back-button">
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
};

export default BackButton;