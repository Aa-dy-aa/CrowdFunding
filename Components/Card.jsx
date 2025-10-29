import React from "react";
import { BentoGrid, BentoGridItem } from "../Components/ui/bento-grid";
import blackbg from "./image/blackbg.jpg";

const Card = ({ title, allcampaign = [], setOpenModel, setDonate }) => {
  const daysLeft = (deadline) => {
    if (!deadline) return "0";

    // Detect if deadline is in seconds or milliseconds
    const deadlineNum = Number(deadline);
    const deadlineMs = deadlineNum > 1e12 ? deadlineNum : deadlineNum * 1000;

    const difference = deadlineMs - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    const days = Math.ceil(remainingDays);

    return String(days > 0 ? days : 0);
  };

  if (!allcampaign || allcampaign.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-8 mb-6">
        {title && <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>}
        <p className="text-center mt-4 text-gray-500">No campaigns available</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-6">
      {title && <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>}
      <BentoGrid>
        {allcampaign.slice(0, 3).map((campaign, i) => (
          <BentoGridItem
            key={i}
            title={campaign.title}
            description={
              <>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {campaign.description}
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    daysLeft(campaign.deadline) === "0"
                      ? "text-red-500"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                >
                  ⏳ {daysLeft(campaign.deadline)} days left
                </p>
              </>
            }
            header={
              <div
                className="h-40 w-full rounded-t-xl bg-cover bg-center"
                style={{
                  backgroundImage: `url(${blackbg.src || blackbg})`,
                }}
              />
            }
            icon={null}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden"
            onClick={() => {
              setDonate(campaign);
              setOpenModel(true);
            }}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default Card;
