//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "./StandardERC20.sol";

/// @title Green Energy Token Contract
/// @author BlockExplorers
/// @notice This token is used in tokenize the energy assest from green energy producer
/// @dev Implements the ERC20 Contract
contract GreenEnergyToken is StandardERC20{

    /// @notice Current state of carbon emissions from a company
    /// @dev State varible to track the companie's footprint
    mapping(address => uint) footprintGenerated;

    constructor() StandardERC20("Green Energy Token", "GET", 10000){}

    /// @notice Modifier used to restrict the permission to the owner of the contract.  
    modifier onlyOwner(){
        require(msg.sender == address(this));
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

    
    function mint(uint amount) public onlyOwner{
        _mint(address(this), amount);
    }

    function addFootprint(address company,uint footprint) public  {
        footprintGenerated[company] += footprint;
    }

    function buy(address to, uint amount)public payable{
        require(msg.value == amount*(10**18));
        transferFrom(address(this), to, amount);
        emit Buy(to,footprintGenerated[to],amount);
    }

    function compensate(uint amount) public {        
        require(balanceOf(msg.sender)>= amount);
        _burn(msg.sender,amount);
        footprintGenerated[msg.sender] -=amount;
        emit Compensate(msg.sender,footprintGenerated[msg.sender], amount);
    }

}