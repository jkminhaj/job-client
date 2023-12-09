import React from 'react';
import { motion } from 'framer-motion';

const Explore = () => {
  return (
    <div className="">
      <div>
        <p className="text-2xl font-semibold mb-9">Explore more on Remoto blog</p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {/* 1st */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full border rounded-md"
        >
          <img
            className="w-full h-52 rounded-t-md"
            src="https://blog-consumer.glassdoor.com/app/uploads/sites/2/2023_perfectionism-at-work_640x427.png"
            alt=""
          />
          <div className="px-4 mt-3 pb-2  bg-white">
            <h1 className="font-medium text-lg mb-4 leading-6">
              How to prioritize your mental health and overcome perfectionism at work
            </h1>
            <p>
              If you’ve ever felt yourself tensing up while staring down a deadline or important meeting, you’re not alone.
            </p>
            <p className="mt-4 font-medium text-blue-600">read more</p>
            <p className="text-xs mt-1">Javed Khan</p>
            <p className="text-xs mt-2">Nov 6, 2023</p>
          </div>
        </motion.div>
        {/* 2nd */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full border rounded-md"
        >
          <img
            className="w-full h-52 rounded-t-md"
            src="https://blog-consumer.glassdoor.com/app/uploads/sites/2/2023_GD_Tips-for-Building-an-Online-Personal-Brand-for-Growing-Your-Career_BLUE_3687x2459-scaled.jpg"
            alt=""
          />
          <div className="px-4 mt-3 pb-2  bg-white">
            <h1 className="font-medium text-lg mb-4 leading-6">
              14 tips for building an online personal brand for growing your career
            </h1>
            <p>
              Building an online personal brand for yourself is an important part of moving your career forward. When you hear
            </p>
            <p className="mt-4 font-medium text-blue-600">read more</p>
            <p className="text-xs mt-1">Nami Mali</p>
            <p className="text-xs mt-2">Oct 25, 2023</p>
          </div>
        </motion.div>
        {/* 3rd */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full border rounded-md"
        >
          <img
            className="w-full h-52 rounded-t-md"
            src="https://blog-consumer.glassdoor.com/app/uploads/sites/2/2023_GD_Tracking-results-not-hours_T_Orange_4501x4501-scaled.jpg"
            alt=""
          />
          <div className="px-4 mt-3 pb-2  bg-white">
            <h1 className="font-medium text-lg mb-4 leading-6">
              Is your company monitoring you? 36% of employees are unsure
            </h1>
            <p>
              When asked in a recent poll on tracking at work, a number of employees admitted they didn't know if they were.
            </p>
            <p className="mt-4 font-medium text-blue-600">read more</p>
            <p className="text-xs mt-1">James Rou</p>
            <p className="text-xs mt-2">Jan 12, 2023</p>
          </div>
        </motion.div>
        {/* 4th */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-full border rounded-md"
        >
          <img
            className="w-full h-52 rounded-t-md"
            src="https://www.keka.com/media/2023/04/Resource-Planning-Hero-Img.svg"
            alt=""
          />
          <div className="px-4 mt-3 pb-2  bg-white">
            <h1 className="font-medium text-lg mb-4 leading-6">
              Ask a therapist: Childhood trauma’s career impact for being thinking
            </h1>
            <p>
              If you’ve ever felt yourself tensing up while staring down a deadline or important meeting, you’re not alone.
            </p>
            <p className="mt-4 font-medium text-blue-600">read more</p>
            <p className="text-xs mt-1">Naila alia</p>
            <p className="text-xs mt-2">Feb 05, 2023</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;
