import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

// INTERNAL IMPORT

import { VotingContext } from "@/context/voter";
import { Images } from "@assets/index";

const NavBar = () => {
  const { connectWallet, error, currentAccount } = useContext(VotingContext);
  const [openNav, setOpenNav] = useState(true);
  const openNavigation = () => {
    if (openNav) {
      setOpenNav(false);
    } else if (!openNav) {
      setOpenNav(true);
    }
  };

  return (
    // navbar
    <div className="relative bg-[#231e39] shadow-[10px_10px_15px_rgba(0,0,3,0.35)] mb-8 w-full h-22 max-[35em]:w-full">
      {error?.trim() && (
        <div className="absolute top-2/4 left-2/4 z-111111 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#9a02ac] p-20 text-[2rem] max-[35em]:top-[55%] max-[35em]:w-[80%] max-[35em]:px-4 max-[35em]:py-8 max-[35em]:text-[1.3rem]">
          <div>
            <p>{error}</p>
          </div>
        </div>
      )}
      {/* navbar_box */}
      <div className="w-4/5 mx-auto flex items-center justify-between text-white">
        {/* title */}
        <div className="cursor-pointer">
          <Link href={{ pathname: "/" }}>
            <Image src={Images.LOADING} alt="logo" width={80} height={80} />
          </Link>
        </div>

        {/* connect */}
        <div className="bg-[#9a02ac] py-2 px-8 rounded-[0.2rem] cursor-pointer shadow-[10px_10px_15px_rgba(0,0,3,0.35)] relative">
          {currentAccount ? (
            <div>
              {/* connect_flex */}
              <div className="flex justify-between items-center">
                <button onClick={() => openNavigation()}>
                  {currentAccount.slice(0, 10)}...
                </button>
                {currentAccount && (
                  <span className="text-[2rem] ml-4 ">
                    {openNav ? (
                      <AiFillUnlock onClick={() => openNavigation()} />
                    ) : (
                      <AiFillLock onClick={() => openNavigation()} />
                    )}
                  </span>
                )}
              </div>

              {openNav && (
                // navigation
                <div className="absolute bg-[#9a02ac] p-4 w-60 left-0 top-12 rounded-[0.2rem] z-111111">
                  <p>
                    <Link href={{pathname: '/'}}>Home</Link>
                  </p>
                  <p>
                    <Link href={{pathname: "/candidate-registration"}}>Candidate Registration</Link>
                  </p>
                  <p>
                    <Link href={{pathname: "/allow-voters"}}>Voter Registration</Link>
                  </p>
                  <p>
                    <Link href={{pathname: "/voterList"}}>Voter List</Link>
                  </p>
                </div>
              )}

            </div>
          ) : (
            <button onClick={() => connectWallet()} className="bg-transparent border-0 text-base text-white font-semibold cursor-pointer "> Connect Wallet </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
