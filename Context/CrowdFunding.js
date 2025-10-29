"use client"
import React, {useState, useEffect} from "react";
import Web3Modal from "web3modal";
import {ethers} from "ethers";

import {CrowdFundingABI, CrowdFundingAddress} from "./contants";

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();
export const CrowdFundingProvider = ({children}) =>{
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) =>{
        const {title, description, amount, deadline} = campaign;
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        // ensure we use the connected signer address as the campaign owner
        const signerAddress = await signer.getAddress();
        // keep local state in sync
        setCurrentAccount(signerAddress);
        console.log('creating campaign from', signerAddress);
        try{
            const deadlineSeconds = Math.floor(new Date(deadline).getTime() / 1000);
            const transaction = await contract.createCampaign(
                signerAddress,
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
                deadlineSeconds
            );

            await transaction.wait();

            console.log("contract call success", transaction);
            // refresh so the created campaign appears in the UI
            if (typeof window !== "undefined") location.reload();
        }
        catch(error){
            console.log("contract call failure", error);
        }
    };

    const getCampaigns = async () =>{
        // const provider = new ethers.providers.JsonRpcProvider();
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaigns();

        const parsedCampaigns = campaigns.map((campaign, i) =>({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }));
        return parsedCampaigns;
    };
    const getUserCampaigns = async()=>{
        // use the same local provider as getCampaigns
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
        const contract = fetchContract(provider);

        const allCampaigns= await contract.getCampaigns();

        // prefer the connected account in state, fallback to window.ethereum
        let currentUser = currentAccount;
        try{
            if(!currentUser && window.ethereum){
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                currentUser = accounts && accounts[0];
            }
        }catch(e){
            console.warn('unable to read window.ethereum accounts', e);
        }

        if(!currentUser) return [];

        const userData = [];
        allCampaigns.forEach((campaign, i) => {
            if (campaign.owner.toLowerCase() === currentUser.toLowerCase()) {
                userData.push({
                    owner: campaign.owner,
                    title: campaign.title,
                    description: campaign.description,
                    target: ethers.utils.formatEther(campaign.target.toString()),
                    deadline: campaign.deadline.toNumber(),
                    amountCollected: ethers.utils.formatEther(
                        campaign.amountCollected.toString()
                    ),
                    pId: i,
                });
            }
        });

        return userData;
    };
    const donate = async(pId,amount)=>{
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),
        });

        await campaignData.wait();
        location.reload();

        return campaignData;
    };

    const getDonations = async(pId) =>{
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i =0;i<numberOfDonations;i++){
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }

        return parsedDonations;
    };

    const checkIfWalletConnected = async () =>{
        try{
            if (!window.ethereum)
                return setOpenError(true), setError("Install MetaMask");
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }
            else{
                console.log("No Account Found");
            }
        } catch (error){
            console.log("Something wrong while connecting to wallet");
        }
    };
    useEffect(() =>{
        checkIfWalletConnected();
    }, []); 
    const connectWallet = async () =>{
        try{
            if(!window.ethereum)return console.log("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        } catch(error){
            console.log("Error while connecting to wallet");
        }
    };
    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
            }}
            >
                {children}
            </CrowdFundingContext.Provider>
    );
};
