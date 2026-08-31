import React, { useContext } from "react";

interface InputProps {
  inputType: string;
  title: string;
  placeholder?: string;
  handleClick?: React.MouseEventHandler<HTMLInputElement>;
}

const Input = ({ inputType, title, placeholder, handleClick }: InputProps) => {
  return (
    <div className="input">
      <p>{title}</p>
      {inputType === "text" ? (
        <div className="w-full bg-[#730283] p-4 rounded-">
          <input
            type="text"
            className="input_box_form"
            placeholder={placeholder}
            onClick={handleClick}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
