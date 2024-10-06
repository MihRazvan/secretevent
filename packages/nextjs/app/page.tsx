"use client";

import type { NextPage } from "next";
import { CreateEvent } from "~~/components/CreateEvent";
import { Hero } from "~~/components/Hero";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

const Home: NextPage = () => {
  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div className="absolute top-0 right-0">
        <RainbowKitCustomConnectButton />
      </div>
      <div className="flex flex-col w-full max-w-3xl mx-auto min-h-screen bg-[#FDFEFF]">
        <Hero />
        <CreateEvent />
        <div className="text-center mb-2">Built at ETHRome 2024</div>
      </div>
    </div>
  );
};

export default Home;
