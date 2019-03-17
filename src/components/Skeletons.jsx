import React from 'react';
import Skeleton from './Skeleton';

const skeletonsAmount = [0,1,2,3,4];

const Skeletons = ({ active }) => (
  <div className="skeletons-container">
    {skeletonsAmount.map((_, idx) => 
      <Skeleton active={active} order={idx + 1} key={idx + 1} />
    )}
  </div>
);

export default Skeletons;