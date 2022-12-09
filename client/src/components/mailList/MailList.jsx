import React from "react";
import "./MailList.css";

const MailList = () => {
  return (
    <div className="bg-[#003580] w-full text-white py-16">
      <div className="container mx-auto max-w-5xl py-2 px-2 md:px-0 ">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-4xl font-bold">Save time, save money</h1>
          <span className="font-bold">
            Sign up and we'll send the best deals to you
          </span>
          <div className="space-x-2">
            <input className="px-10 py-1 rounded-sm" type="text" placeholder="Your Email" />
            <button className="bg-blue-500 rounded-sm px-3 py-1">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailList;
