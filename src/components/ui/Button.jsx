// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
  const baseClasses = 'font-bold py-2 px-4 rounded transition duration-200 focus:outline-none';
  const variants = {
    primary: 'bg-primary hover:bg-accent text-white',
    secondary: 'bg-secondary hover:bg-primary text-white',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  // Ensure onClick is a function before passing it
<<<<<<< HEAD
  const handleClick = (e) => {
    if (typeof onClick === 'function' && !disabled) {
      onClick(e);
    }
  };
=======
  const handleClick = typeof onClick === 'function' ? onClick : undefined;
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick} // Use the safe handleClick
      disabled={disabled}
      {...props} // Spread any other props (like type, etc.)
    >
      {children}
    </button>
  );
};

export default Button;