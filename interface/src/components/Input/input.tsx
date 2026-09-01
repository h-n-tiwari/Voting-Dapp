import React, { useContext } from "react";

interface InputProps {
  inputType: string;
  title: string;
  placeholder?: string;
  handleClick?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ inputType, title, placeholder, handleClick }: InputProps) => {
  return (
    <div className="input">
      <p>{title}</p>
      {inputType === "text" ? (
        <div className="w-full bg-[#730283] p-0 rounded-[0.2rem]">
          <input
            type="text"
            className="w-full bg-transparent border-0 outline-none px-2 text-white placeholder:text-[#2d0036] placeholder:font-medium placeholder:capitalize"
            placeholder={placeholder}
            onChange={handleClick}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
