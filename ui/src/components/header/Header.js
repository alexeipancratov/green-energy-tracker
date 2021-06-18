import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiWalletAlt } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import "./header.css";

const Header = ({instance, account}) => {
  const [balance, setBalance] = useState(0);
  const [footprint, setFootprint] = useState(0);

  //subscribing to updates regarding balance and footprint
  useEffect(() => {
    const updateBalances = async () => {
      const _balance = await instance.methods.balanceOf(account).call();
      const _footprint = await instance.methods.getFootPrint(account).call();
      
      setBalance(_balance / (10**18));
      setFootprint(_footprint / (10**18));
    }

    if (instance && account) {
      setInterval(() => {
        updateBalances();
      }, 2000);
    }
  }, [instance, account]);

  return (
    <nav>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row header">
          <NavLink
            to="/"
            className="btn link"
            exact
            activeClassName="link-active"
          >
            Buy GET tokens
          </NavLink>
          <NavLink
            to="/compensate"
            className="btn link"
            activeClassName="link-active"
          >
            Compensate Footprint
          </NavLink>
        </div>
        <div className="d-flex flex-row-reverse header">
          <div
            className="d-flex align-items-center"
            style={{ fontWeight: "700", marginRight: "20px" }}
          >
            <span
              className="balances"
              style={{ backgroundColor: "#009879", marginRight: "10px" }}
            >
              <BiWalletAlt /> Balance: {balance} GET
            </span>
            <span className="balances" style={{ backgroundColor: "tomato" }}>
              <AiOutlineFire /> Footprint: {footprint}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
