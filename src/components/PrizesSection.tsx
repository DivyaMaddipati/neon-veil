
import React from 'react';

const PrizesSection = () => {
  return (
    <section id="prizes" className="py-16 md:py-20 bg-black relative px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Prizes</h2>
          <p className="text-gray-400">Rewards That Recognize Excellence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* First Prize */}
          <div className="bg-[#252215] rounded-lg p-6 md:p-8 flex items-center justify-between relative overflow-hidden">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">1st Prize</h3>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">1,00,000 /-</div>
            </div>
            <div className="relative">
              <img 
                src="/public/lovable-uploads/gold.png" 
                alt="Gold Medal" 
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
          </div>

          {/* Second Prize */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 md:p-8 flex items-center justify-between relative overflow-hidden">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">2nd Prize</h3>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">60,000 /-</div>
            </div>
            <div className="relative">
              <img 
                src="/public/lovable-uploads/silver.png" 
                alt="Silver Medal" 
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
