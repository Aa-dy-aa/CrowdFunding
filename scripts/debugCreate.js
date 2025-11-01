const { ethers } = require("ethers");
const fs = require('fs');

async function main(){
  const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  const accounts = await provider.listAccounts();
  const signer = provider.getSigner(accounts[0]);

  const abi = JSON.parse(fs.readFileSync("./artifacts/contracts/CrowdFunding.sol/CrowdFunding.json")).abi;
  const address = require('../Context/CrowdFunding.json')?.address || '0x8464135c8F25Da09e49BC8782676a84730C318bC';
  const contract = new ethers.Contract(address, abi, signer);

  const owner = accounts[0];
  const title = "Debug title";
  const description = "Debug description";
  const target = ethers.utils.parseUnits('0.1', 18);
  const deadlineSeconds = Math.floor(Date.now() / 1000) + 60*60*24; // 1 day in future

  console.log('Attempting callStatic.createCampaign with:');
  console.log({ owner, title, description, target: target.toString(), deadlineSeconds });

  try{
    // callStatic will simulate and throw if it would revert
    const res = await contract.callStatic.createCampaign(owner, title, description, target, deadlineSeconds);
    console.log('callStatic succeeded, returned:', res);
  }catch(err){
    console.error('callStatic threw error:');
    // try to extract revert reason
    console.error(err);
    console.error('Possible revert reason fields:');
    console.error('reason:', err.reason);
    console.error('error.message:', err.error && err.error.message);
    console.error('data:', err.data && err.data.message);
    console.error('message:', err.message);
  }
}

main().catch(e=>{console.error(e); process.exit(1)});
