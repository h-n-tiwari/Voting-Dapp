import React, { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

// INTERNAL import

import { VotingContext } from "@/context/voter";
import images from "@/assets";
import Button from "@/components/Button/button";
import Input from "@/components/Input/input";

interface FormInput {
  name: string;
  address: string;
  position: string;
}

const AllowedVoters = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [formInput, setFormInput] = useState<FormInput>({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();
  const { uploadToPinata } = useContext(VotingContext);

  // ------ VOTER IMAGE DROP
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
      if (!acceptedFiles?.length) return;
      const url = await uploadToPinata(acceptedFiles[0]);
      setFileUrl(url);
    },
    [uploadToPinata],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1_000_000,
  });

  return <div>allowedvoters</div>;
};

export default AllowedVoters;
