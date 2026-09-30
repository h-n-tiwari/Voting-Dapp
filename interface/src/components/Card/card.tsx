import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import { Images } from "@assets/index";

const Card = ({ candidateArray, giveVote }) => {
  return (
    // card
    <div className="w-full grid grid-cols-3 gap-8 max-[35em]:grid-cols-1 ">
      {candidateArray.map((el, i) => (
        // card_box
        <div className="bg-[#231e39] shadow-[10px_10px_15px_rgba(0,0,0,0.35)] text-[#b3b8cd] text-center overflow-hidden rounded-lg">
          {/* images */}
          <div className="">
            <img src={el[3]} alt="profile" className="w-full" />
          </div>
          {/* card_info */}
          <div className="leading-none px-6">
            <h2>
              {el[1]} #{el[2].toNumber()}
            </h2>
            <p>{el[0]}</p>
            <p>Address: {el[6].slice(0, 30)}...</p>
            {/* total */}
            <p className="bg-[#9a02ac] p-2 rounded-[0.2rem] font-black tracking-[1px] text-white uppercase">Total Vote</p>
          </div>

          {/* card_vote */}
          <div className="text-[#9a02ac]">
            <p className="text-2xl">{el[4].toNumber()}</p>
          </div>
          {/* card_button */}
          <div className="mb-8 p-2">
            <button
              onClick={() => giveVote({ id: el[3].toNumber(), address: el[6] })} className="bg-[#9a02ac] shadow-[10px_10px_15px_rgba(0,0,0,0.35)] border-none px-4 py-2 text-base font-medium text-white rounded-[0.2rem] cursor-pointer"
            >
              Give Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
