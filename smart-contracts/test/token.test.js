const { expect } = require("chai");

describe("GreenEnergyToken", function() {

    it("should have 10000 tokens after deployment",async function(){
        const GreenEnergyToken = await ethers.getContractFactory("GreenEnergyToken");
        const GET = await GreenEnergyToken.deploy();
        const instance = await GET.deployed();
        console.log(await instance.totalSupply())
        expect(await instance.totalSupply()).to.equal(10000);
    });
});