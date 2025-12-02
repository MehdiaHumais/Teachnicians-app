import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
  const baseClasses = 'font-bold py-2 px-4 rounded transition duration-200 focus:outline-none';
  const variants = {
    primary: 'bg-primary hover:bg-accent text-white',
    secondary: 'bg-secondary hover:bg-primary text-white',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;