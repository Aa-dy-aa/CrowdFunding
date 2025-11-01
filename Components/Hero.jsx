"use client";
import React, { useState } from "react";
import { TypewriterEffect } from "./ui/typewriter-effect";


const Hero = ({ titleData, createCampaign }) => {
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
  });

  // Words for typewriter
  const words = [
    { text: "Crypto King" },
    { text: "Crowd Funding CK" },
  ];

  const createNewCampaign = async (e) => {
    e.preventDefault();
    try {
      await createCampaign(campaign);
      setCampaign({ title: "", description: "", amount: "", deadline: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {/* Background image */}
      <span className="coverLine"></span>
      <img
        src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        className="absolute inset-0 object-cover w-full h-full"
        alt="Crowdfunding banner"
      />

      {/* Overlay */}
      <div className="relative bg-opacity-75 backgroundMain">
        {/* SVG Wave */}
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M0,64L60,85.3C120,107,240,149,360,160C480,171,600,149,720,144C840,139,960,149,1080,170.7C1200,192,1320,224,1380,240L1440,256L1440,320L0,320Z"
          />
        </svg>

        {/* Content */}
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8 lg:py-20">
          <div className="flex flex-col items-start justify-between xl:flex-row">
            {/* Left side: text */}
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none text-left">
                <TypewriterEffect words={words} className="text-white text-left" />
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                consequuntur, corporis nobis accusantium laborum maiores
                consectetur, iste voluptatibus commodi quod numquam eius
                repudiandae cum esse debitis molestias minus nemo earum?
              </p>
              <a
                href="/"
                aria-label="Learn more"
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-gray-200 hover:text-teal-400"
              >
                Learn more
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>

            {/* Right side: Form */}
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Create Campaign
                </h3>
                <form onSubmit={createNewCampaign}>
                  {/* Title */}
                  <div className="mb-2">
                    <label className="inline-block mb-1 font-medium">Title</label>
                    <input
                      type="text"
                      value={campaign.title}
                      onChange={(e) =>
                        setCampaign({ ...campaign, title: e.target.value })
                      }
                      placeholder="Campaign title"
                      required
                      className="w-full h-12 px-4 mb-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-2">
                    <label className="inline-block mb-1 font-medium">
                      Description
                    </label>
                    <input
                      type="text"
                      value={campaign.description}
                      onChange={(e) =>
                        setCampaign({
                          ...campaign,
                          description: e.target.value,
                        })
                      }
                      placeholder="Campaign description"
                      required
                      className="w-full h-12 px-4 mb-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                  </div>

                  {/* Target Amount */}
                  <div className="mb-2">
                    <label className="inline-block mb-1 font-medium">
                      Target Amount (ETH)
                    </label>
                    <input
                      type="number"
                      value={campaign.amount}
                      onChange={(e) =>
                        setCampaign({ ...campaign, amount: e.target.value })
                      }
                      placeholder="Amount"
                      required
                      className="w-full h-12 px-4 mb-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                  </div>

                  {/* Deadline */}
                  <div className="mb-2">
                    <label className="inline-block mb-1 font-medium">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={campaign.deadline}
                      onChange={(e) =>
                        setCampaign({ ...campaign, deadline: e.target.value })
                      }
                      required
                      className="w-full h-12 px-4 mb-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full h-12 px-6 font-medium text-white rounded bg-indigo-600 hover:bg-indigo-700 transition duration-200"
                    >
                      Create Campaign
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                    Create your campaign to raise funds.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
