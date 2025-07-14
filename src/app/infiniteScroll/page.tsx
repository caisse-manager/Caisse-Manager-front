'use client';

import React from 'react';
import HeroSection from '@/components/InfiniteScroll'; 
import Navbar from '@/components/Navbar'; 

const Page = () => {
  return (
    <div>
       <Navbar />
      <HeroSection />
    </div>
  );
};

export default Page;
