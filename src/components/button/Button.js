import React from "react";

const Button = ({
  onClick,
  children,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg bg-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
