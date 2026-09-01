interface ButtonProps {
  btnName: string;
  handleClick: () => void;
}

const Button = ({ btnName, handleClick }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="my-8 bg-transparent border border-dotted border-[#9a02ac] py-2 px-4 text-[#9a02ac] rounded-2xl cursor-pointer font-semibold transition-all duration-400 ease-in-out hover:bg-[#9a02ac] hover:text-[#231e39]"
    >
      {btnName}
    </button>
  );
};

export default Button;
