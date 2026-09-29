import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Countdown from "react-countdown";

// INTERNAL IMPORT

import { VotingContext } from "@/context/voter";
import Card from "@/components/Card/card";
import image from "@/assets/candidate-1.jpg";

const index = () => {
  const {
    getNewCandidate,
    candidateArray,
    giveVote,
    checkIfWalletConnected,
    candidateLength,
    currentAccount,
    voterLength,
  } = useContext(VotingContext);

  useEffect(() => {
    checkIfWalletConnected();
  });
  return (
    // home
    <div className="">
      {currentAccount && (
        // winner
        <div className="">
          {/* winner_info */}
          <div className="">
            {/* candidate_list */}
            <div className="">
              <p>
                No Candidate: <span>{candidateLength}</span>
              </p>
            </div>
            {/* voter_list */}
            <div className="">
              <p>
                No Voter: <span>{voterLength}</span>
              </p>
            </div>
          </div>
          {/* winner_message */}
          <div className="">
            <small>
              <Countdown date={Date.now() + 100000} />
            </small>
          </div>
        </div>
      )}

      <Card candidateArray={candidateArray} giveVote={giveVote} />
    </div>
  );
};

export default index;
