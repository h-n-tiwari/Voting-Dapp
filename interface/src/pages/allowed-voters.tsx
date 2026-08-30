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
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
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

  // --- JSX ---

  return (
    <div className="createVoter">
      <div>
        {fileUrl && (
          <div className="voterInfo">
            <img src={fileUrl} alt="Voter Image" />
            <p className="flex gap-1">
              <span>Name:</span>
              <span>{formInput.name}</span>
            </p>
            <p className="flex gap-1">
              <span>Add:</span>
              <span>{formInput.address.slice(4, 20)}</span>
            </p>
            <p className="flex gap-1">
              <span>Pos:</span>
              <span>{formInput.position}</span>
            </p>
          </div>
        )}

        {!fileUrl && (
          <div className="sidInfo">
            <div className="sidInfo_box">
              <h4> Create candidate For Voting </h4>
              <p> Blockchain voting organization, provide ethereum ecosystem </p>
              <p className="sideInfo_para"> Contract Candidate </p>
            </div>

            <div className="car">
              {/*{voterArray.map((el, index) => (
                <div key={index + 1} className="card_box">
                  <div className="image">
                    <img src="" alt="Voter Image" />
                  </div>

                  <div className="card_info">
                    <p>Name</p>
                    <p>Address</p>
                    <p>Position</p>
                  </div>

                </div>
              ))}*/}

            </div>
          </div>
        )}



      </div>
    </div>
  );
};

export default AllowedVoters;
