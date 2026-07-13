// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.34;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create {
    using Counters for Counters.Counter;

    Counters.Counter public _voterId;
    Counter.Counter public _candidateId;

    address public votingOrganizer;

    // CANDIDATE FOR VOTING

    struct Candidate {
        uint256 candidateId;
        string age;
        string name;
        string image;
        uint256 voteCount;
        address _address;
        string ipfs;
    }

    event CandidateCreated (
        uint256 indexed candidateId,
        string age,
        string name,
        string image,
        uint256 voteCount,
        address _address,
        string ipfs
    )

    address[] public candidateAddress;

    mapping(address => Candidate) public candidates;


    // END OF CANDIDATE DATA //

    // VOTER DATA

    address[] public votedVoters;

    address public voterAddress;

    mapping(address => Voter) public voters;

    struct Voter {
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        uint256 voter_allowed;
        bool voter_voted;
        uint256 voter_vote;
        string voter_ipfs;
    }

    event VoterCreated (
        uint256 indexed voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        uint256 voter_allowed,
        bool voter_voted,
        uint256 voter_vote,
        string voter_ipfs

    )


    // END OF VOTER DATA //

    constructor() {
        votingOrganizer = msg.sender;
    }

    function setCandidate(
        address _address, 
        string memory _age, 
        string memory _name,
        string memory _image, 
        string memory _ipfs
    )
        public {
            require(votingOrganizer == msg.sender, "Only organizer can add candidates");

            _candidateId.increment();

            uint256 idNumber = _candidateId.current();

            Candiddate storage candidate = candidates[_address];

            candidate.age = _age;
            candidate.name = _name;
            candidate.candidateId = idNumber;
            candidate.image = _image;
            candidate.voteCount = 0;
            candidate._address = _address;
            candidate.ipfs = _ipfs;

            candidateAddress.push(_address);

            emit CandidateCreated(
                idNumber,
                _age,
                _name,
                _image,
                candidate.voteCount,
                _address,
                _ipfs
            );

        }


    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }

    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }

    function getCandidatedata(address _address) 
		public 
		view 
		returns(
			string memory, 
			string memory, 
			uint256, 
			string memory, 
			uint256,
			string memory,
			address
		);
	{
        return (
            candidates[_address].age,
            candidates[_address].name,
            candidates[_address].candidateId,
            candidates[_address].image,
            candidates[_address].voteCount,
            candidates[_address].ipfs,
            candidates[_address]._address,

        );

    }











}