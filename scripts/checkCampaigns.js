const { ethers } = require("ethers");
const fs = require('fs');

const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/CrowdFunding.sol/CrowdFunding.json")).abi;
const address = require('../Context/CrowdFunding.json')?.address || '0x8464135c8F25Da09e49BC8782676a84730C318bC';

(async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const contract = new ethers.Contract(address, abi, provider);
    const campaigns = await contract.getCampaigns();
    console.log('Raw campaigns length:', campaigns.length);
    const parsed = campaigns.map((c, i) => ({
      owner: c.owner,
      title: c.title,
      description: c.description,
      target: c.target.toString(),
      deadline: c.deadline.toString(),
      amountCollected: c.amountCollected.toString(),
      pId: i,
    }));
    console.dir(parsed, { depth: null });
  } catch (err) {
    console.error('Error fetching campaigns:', err);
  }
})();
