import React, { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
// INTERNAL import
import { VotingContext } from "@/context/voter";
import { Images } from "@assets/index";
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
            <div className="card">
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
        <div className="voter">
          <div className="voter_container">
            <h1>Create New Voter</h1>
            <div className="voter_container_box">
              <div className="voter_container_box_div">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="voter_container_box_div_info">
                    <p>Upload File: PNG, JPG, GIF, WEBM, WEBP Max 20MB</p>
                    <div className="voter_container_box_div_image">
                      <Image
                        src={Images.CREATOR}
                        width={150}
                        height={150}
                        objectFit="contain"
                        alt="File Upload"
                      />
                    </div>
                    <p>Drag and Drop File</p>
                    <p>or Browse Media on your Device</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="input_container">
              <Input
                inputType="text"
                title="Name"
                placeholder="Voter Name"
                handleClick={(e) =>
                  setFormInput({ ...formInput, name: e.target.value })
                }
              />
              <Input
                inputType="text"
                title="Address"
                placeholder="Voter Address"
                handleClick={(e) =>
                  setFormInput({ ...formInput, address: e.target.value })
                }
              />
              <Input
                inputType="text"
                title="Position"
                placeholder="Voter Position"
                handleClick={(e) =>
                  setFormInput({ ...formInput, position: e.target.value })
                }
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default AllowedVoters;
