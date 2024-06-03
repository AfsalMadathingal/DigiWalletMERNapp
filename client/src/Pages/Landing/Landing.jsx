import React, { useEffect } from "react";
import Header from "../../Components/Header";
import CreditCardAnimation from "../../Components/CreditCardAnimation";

const Home = () => {
  useEffect(() => {
      document.title = "DigiWallet"
  })
  return (
    <>
    <div className="flex flex-col overflow-hidden  h-screen items-center lg:items-start lg:pl-16 lg:flex-row sm:pt-20 lg:pt-48 grad-bg">
      <div className="flex flex-col lg:mr-8 lg:w-1/2 items-center lg:items-start">
        <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl text-white font-bold text-center lg:text-left mb-4 lg:mb-0">
          Carry Less, Live More <br />
          With Our Digital Wallet
        </h1>
        <div className="text-white cursor-pointer bg-black w-32 px-5 py-3  h-12 mt-4 btn-grad text-center lg:text-left">
          Get Started
        </div>
      </div>
      <div className="mt-8 lg:mt-0 lg:ml-8 lg:w-1/2 flex justify-center lg:justify-start">
        <CreditCardAnimation />
      </div>
    </div>
  </>
  );
};

export default Home;
