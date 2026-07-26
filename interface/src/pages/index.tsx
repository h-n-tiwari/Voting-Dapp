import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Countdown from "react-countdown";

// INTERNAL IMPORT

import { VotingContext } from "@/context/voter";
// import Card from "@/components/Card/card";
import image from "@/assets/candidate-1.jpg";

const index = () => {
  const { votingTitle } = useContext(VotingContext);
  return <div>{ votingTitle }</div>;
}


export default index;