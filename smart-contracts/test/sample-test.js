const { expect } = require("chai");

describe("StandardErc20", function() {
  it("Should return correct token symbol", async function() {
    const StandardERC20 = await ethers.getContractFactory("StandardERC20");
    const standardERC20 = await StandardERC20.deploy("GBC Token", "GBC", 1000000000000000);
    
    await standardERC20.deployed();
    expect(await standardERC20.symbol()).to.equal("GBC");
  });
});
