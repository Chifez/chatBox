import React from 'react';
import Button from '../../component/Buton';

const Hero = () => {
  return (
    <section className="w-full items-center justify-center py-10 ">
      <div className="text-center py-4 space-y-4">
        <h1 className="text-5xl font-medium">More Than Just A Chat App</h1>
        <p className="text-slate-800 text-sm">
          Experience a secure and hatch free chat Experience with end to end
          encryption
        </p>
      </div>
      <div className="flex items-center justify-center w-full">
        <Button className="w-40">Get started</Button>
      </div>
    </section>
  );
};

export default Hero;
