import React from 'react';
import Button from '../../component/Buton';

const Hero = () => {
  return (
    <section className="w-full h-full items-center justify-center py-10">
      <div className="text-center py-4 space-y-4">
        <h1 className="text-5xl font-bold">
          Introducing <span className="text-[#551FFF]">Chat Box</span>
        </h1>
        <div className="text-gray-500 text-base">
          <p>
            Experience a secure and hatch free chat app with end to end
            encryption.
          </p>
          <p>
            Connect with your friends and family with our beautifully designed
            chat app.
          </p>
          <p>Simple. Secure. Fun.</p>
        </div>
      </div>

      <div className="mx-auto my-2 w-[50vw] h-[60vh] rounded-lg bg-gray-400 border">
        <img src="" alt="mg" />
      </div>
      <div className="flex gap-2 items-center justify-center w-[20%] mx-auto">
        <Button className="!text-base">Get Started</Button>
        <Button className="!text-base bg-transparent border-2 hover:bg-gray-200 text-black">
          Learn more
        </Button>
      </div>
    </section>
  );
};

export default Hero;
