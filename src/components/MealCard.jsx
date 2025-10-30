import React from "react";

function MealCard({ meal, onClick }) {
  return (
    <div
      className="meal-card fade-in cursor-pointer"
      onClick={() => onClick(meal)}
    >
      <div className="meal-thumb">
        <img
          src={meal.strMealThumb || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={meal.strMeal}
          loading="lazy"
        />
      </div>
      <div className="meal-info">
        <h3>{meal.strMeal}</h3>
        {(meal.strArea || meal.strCategory) && (
          <p>{[meal.strArea, meal.strCategory].filter(Boolean).join(" | ")}</p>
        )}
      </div>
    </div>
  );
}

export default MealCard;
