import React from "react";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";

function MealDetails({ mealId }) {
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const meal = data?.meals?.[0];
  if (loading) return <Loader />;
  if (error || !meal) return <p className="error-text">Meal not found.</p>;

  // Collect ingredients + measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({ ing, meas });
    }
  }

  return (
    <div className="meal-details-modal">
      <div className="details-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-thumb" />
        <div className="details-text">
          <h2 className="meal-title">{meal.strMeal}</h2>
          <p className="meal-meta">
            {meal.strCategory && <span>{meal.strCategory}</span>}
            {meal.strArea && (
              <>
                {" "}
                <span className="dot">•</span> <span>{meal.strArea}</span>
              </>
            )}
          </p>
          {meal.strTags && (
            <div className="meal-tags">
              {meal.strTags.split(",").map((tag, idx) => (
                <span key={idx} className="tag">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <h4>🧂 Ingredients</h4>
      <ul className="ingredients-list">
        {ingredients.map((item, idx) => (
          <li key={idx}>
            <span>{item.ing}</span> <em>{item.meas}</em>
          </li>
        ))}
      </ul>

      <h4>👩‍🍳 Instructions</h4>
      <p className="instructions">{meal.strInstructions}</p>

      {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-link"
        >
          🎥 Watch Recipe Video
        </a>
      )}
    </div>
  );
}

export default MealDetails;
