import React from "react";

const SkeletonCard = () => (
  <div className="meal-card skeleton">
    <div className="skeleton-thumb"></div>
    <div className="meal-info">
      <div className="skeleton-line short"></div>
      <div className="skeleton-line long"></div>
    </div>
  </div>
);

export default SkeletonCard;
