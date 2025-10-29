"use client"
import React,{useEffect,useContext,useState} from "react";

import { CrowdFundingContext } from "@/Context/CrowdFunding";
import Hero from "@/Components/Hero";
import Card from "@/Components/Card";
import PopUp from "@/Components/PopUp";


const index= () =>{
  const{
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allcampaign,setAllcampaign] = useState();
  const [usercampaign,setUsercampaign] =useState();

  useEffect(()=>{
    const fetchData = async () => {
      const allData = await getCampaigns();
      const userData = await getUserCampaigns();
      setAllcampaign(allData);
      setUsercampaign(userData);
    };
    fetchData();
  }, []);

  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState();

  console.log(donateCampaign);
  return(
    <>
      <Hero titleData={titleData} createCampaign={createCampaign}/>
  <Card title="All Listed Campaigns" allcampaign={allcampaign} setOpenModel={setOpenModel} setDonate={setDonateCampaign}/>
      <Card title="Your Created Campaign" allcampaign={usercampaign} setOpenModel={setOpenModel} setDonate={setDonateCampaign}/>
      {openModel && (<PopUp setOpenModel={setOpenModel} getDonation={getDonations} donate={donateCampaign} donateFunction={donate}/>)} 
    </>
  )
};
export default index;