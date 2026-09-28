import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

// INTERNAL IMPORT

import { VotingContext } from "@/context/voter";
import loading from "@/assets/loading.gif";

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
    <div className="">
      {error === "" ? (
        ""
      ) : (
        // message_box
        <div className="">
          {/* message */}
          <div className="">
            <p>{error}</p>
          </div>
        </div>
      )}
      {/* navbar_box */}
      <div className="">
        {/* title */}
        <div className="">
          <Link href={{ pathname: "/" }}>
            <Image src={loading} alt="logo" width={80} height={80} />
          </Link>
        </div>

        {/* connect */}
        <div className="">
          {currentAccount ? (
            <div>
              {/* connect_flex */}
              <div className="">
                <button onClick={() => openNavigation()}>
                  {currentAccount.slice(0, 10)}...
                </button>
                {currentAccount && (
                  <span>
                    {openNav ? (
                      <AiFillUnlock onClick={() => openNavigation()} />
                    ) : (
                      <AiFillLock onClick={() => openNavigation()} />
                    )}
                  </span>
                )}
              </div>

              {openNav && (
                {/* navigation */}
                <div className="">
                  <p>
                    <Link href={{pathname: '/'}}>Home</Link>
                  </p>
                  <p>
                    <Link href={{pathname: "candidate-registration"}}>Candidate Registration</Link>
                  </p>
                  <p>
                    <Link href={{pathname: "allow-voters"}}>Voter Registration</Link>
                  </p>
                  <p>
                    <Link href={{pathname: "voterList"}}>Voter List</Link>
                  </p>
                </div>
              )}

            </div>
          ) : (
            <button onClick={() => connectWallet()}> Connect Wallet </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
