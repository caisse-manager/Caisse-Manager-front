"use client";

import { forwardRef } from "react";

interface Restaurant {
  video: string;
  nom: string;
  ville: string;
  adresse: string;
}

interface PreviousWorkCardProps {
  restaurant: Restaurant;
  index: number;
  isActive: boolean;
}

const PreviousWorkCard = forwardRef<HTMLDivElement, PreviousWorkCardProps>(
  ({ restaurant, isActive }, ref) => {
    return (
      <div
        ref={ref}
        className={`client-card min-w-[400px] h-[850px] px-6 py-8 rounded-3xl shadow-2xl flex flex-col items-center justify-between text-white text-xl font-semibold gap-6${
          isActive ? " active-card" : ""
        }`}
      >
        <div className="relative w-[400px] h-[850px] rounded-2xl overflow-hidden">
          <video
            src={restaurant.video}
            autoPlay={false}
            loop
            playsInline
            muted
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              filter: "grayscale(1) brightness(0.8)",
            }}
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              const ratio = video.videoWidth / video.videoHeight;
              video.style.width = "100%";
              video.style.height = `calc(100% / ${ratio})`;
            }}
            onLoadStart={(e) => {
              const video = e.target as HTMLVideoElement;
              video.pause();
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="client-info text-center opacity-0">
          <h3 className="text-3xl font-black text-white tracking-tight leading-tight">
            {restaurant.nom}
          </h3>
          <p className="text-xl text-gray-300 font-semibold mb-12">
            <span className="font-bold text-white tracking-tight leading-tight">
              {restaurant.ville}
            </span>
            , {restaurant.adresse}
          </p>
        </div>
      </div>
    );
  }
);

PreviousWorkCard.displayName = "PreviousWorkCard";

export default PreviousWorkCard;