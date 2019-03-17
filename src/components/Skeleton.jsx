import React from 'react';

const Skeleton = ({ active, order }) => (
  <img src={require("../img/skeleton.png")} className={`skeleton ${active === order ? 'active' : ''}`} />
);

export default Skeleton;