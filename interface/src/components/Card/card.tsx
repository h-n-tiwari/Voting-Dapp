import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import { Images } from "@assets/index";

const Card = ({ candidateArray, giveVote }) => {
  return (
    // card
    <div className="">
      {candidateArray.map((el, i) => (
        // card_box
        <div className="">
          {/* images */}
          <div className="">
            <img src={el[3]} alt="profile" />
          </div>
          {/* card_info */}
          <div className="">
            <h2>
              {el[1]} #{el[2].toNumber()}
            </h2>
            <p>{el[0]}</p>
            <p>Address: {el[6].slice(0, 30)}...</p>
            {/* total */}
            <p className="">Total Vote</p>
          </div>

          {/* card_vote */}
          <div className="">
            <p>{el[4].toNumber()}</p>
          </div>
          {/* card_button */}
          <div className="">
            <button
              onClick={() => giveVote({ id: el[3].toNumber(), address: el[6] })}
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
