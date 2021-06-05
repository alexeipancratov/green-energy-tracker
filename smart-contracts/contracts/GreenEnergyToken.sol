//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "./StandardERC20.sol";

/// @title Green Energy Token Contract
/// @author BlockExplorers
/// @notice This token is used in tokenize the energy assest from green energy producer
/// @dev Implements the ERC20 Contract
contract GreenEnergyToken is StandardERC20{

    /// @notice Current state of carbon emissions from a company
    /// @dev State varible to track the company's footprint
    mapping(address => uint) footprintGenerated;
    
    /// @notice approved IOT devices of company
    /// @dev State varible to track the company's iot address
    mapping(address=>address) approvedIot;
    
    address public owner;
    
    constructor() StandardERC20("Green Energy Token", "GET", 10000){
        owner = msg.sender;
    }

    /// @notice Modifier used to restrict the permission to the owner of the contract.  
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier onlyIOT(address company){
        address caller = msg.sender;
        address toVerify = approvedIot[company];
        require(msg.sender == approvedIot[company]);
        _;
    }

    /// @notice To generate Event for Buy Action
    /// @dev Buy Event defiinition
    /// @param to address of the buyer
    /// @param amount amount of tokens requested to be bought
    event Buy(address indexed to, uint indexed footPrint, uint indexed amount);

    /// @notice To generate Event for Compensate Action
    /// @dev Compensate Event defiinition
    /// @param to address of the Token holder(company)
    /// @param amount amount of tokens requested to be compensated
    event Compensate(address indexed to, uint indexed footPrint, uint indexed amount);

    /// @notice Create new tokens and store it in smart contract
    /// @dev calls the _mint function from standard ERC20
    /// @param amount specifies the amount of token to be newly minted
    function mint(uint amount) public onlyOwner{
        _mint(owner, amount);
    }

    function addFootprint(address company,uint footprint) public  {
        footprintGenerated[company] += footprint;
    }
    
    function getFootPrint(address company) public view returns(uint){
        return footprintGenerated[company];
    }
    
    function buy(uint amount)public payable{
        require(msg.value == amount*(10**18));
        _transfer(owner, msg.sender,amount);
        emit Buy(msg.sender,footprintGenerated[msg.sender],amount);
    }

    function compensate(address company, uint amount) public onlyIOT(company){        
        require(balanceOf(company)>= amount);
        transferFrom(company,owner,amount);
        _burn(company,amount);
        footprintGenerated[company] -=amount;
        emit Compensate(company,footprintGenerated[company], amount);
    }

    function approveIot(address spender, uint amount) public{
        bool isApproved = approve(spender,amount);
        if(isApproved)
            approvedIot[msg.sender]=spender;
    }

}