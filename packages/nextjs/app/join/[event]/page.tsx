"use client";

import { useState } from "react";
import Image from "next/image";
import JsonFileUploader from "~~/components/JsonFileUploader";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import { EVENTS } from "~~/const/events";
import { useJoinEvent } from "~~/hooks/useJoinEvent";

export default function Event({ params }: { params: { event: string } }) {
  const event = EVENTS[params.event as keyof typeof EVENTS];
  const [inviteCode, setInviteCode] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const { joinEvent } = useJoinEvent();

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleJoin = async () => {
    console.log("join");
    // TODO: add secret network part
    try {
      await joinEvent(params.event, inviteCode);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-safe-link.png')" }}
    >
      <div className="absolute top-0 right-0">
        <RainbowKitCustomConnectButton />
      </div>
      <div className="flex flex-col max-w-3xl mx-auto min-h-screen bg-[#FDFEFF] items-center p-4 justify-evenly">
        <div className="flex flex-col items-center">
          <Image src={event.img} alt="SafeLink" width={200} height={100} />
          <div className={`text-center mb-2 text-xl text-[${event.color}]`}>{event.description}</div>
        </div>

        <form className="gap-2 text-[#9F64A7] max-w-xl" onSubmit={handleJoin}>
          <input
            className={`w-auto input border-none rounded-full bg-[#9F64A7]/10 text-2xl leading-8 focus:outline-none focus:ring-0 my-2`}
            type="text"
            value={inviteCode}
            onChange={e => setInviteCode(e.target.value)}
            placeholder="your invite code"
            required
          />
          <div className="flex flex-wrap gap-2">
            <input
              className={`input border-none rounded-full bg-[#9F64A7]/10 text-2xl leading-8 focus:outline-none focus:ring-0`}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="title"
              required
            />
            <input
              className={`input border-none rounded-full bg-[#9F64A7]/10 text-2xl leading-8 focus:outline-none focus:ring-0`}
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>
          <h6 className="text-4xl">Verification</h6>
          <JsonFileUploader />
          <p className="text-sm text-[#9F64A7]">
            *We take great care of your privacy. Upon uploading your passport, your gender (only) information will be
            encrypted and verified, confirming your eligibility while keeping your identity protected.
          </p>
          <div className="flex justify-center w-full mt-10">
            <button className="btn px-6 text-[#9F64A7] text-xl shadow-2xl font-semibold" type="submit">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
