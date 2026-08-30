import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

// INTERNAL import

import { VotingContext } from "@/context/voter";
import images from "@/assets";
import Button from "@/components/Button/button";
import Input from "@/components/Input/input";

const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();
  const { uploadToPinata } = useContext(VotingContext);

  return (
    <div>allowedvoters</div>
  )
}

export default allowedVoters
