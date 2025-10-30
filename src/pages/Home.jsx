import React, { useState, useEffect, useCallback } from "react";
import useFetch from "../hooks/useFetch";
import MealCard from "../components/MealCard";
import SkeletonCard from "../components/SkeletonCard";
import Loader from "../components/Loader";
import MealDetails from "./MealDetails";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://www.themealdb.com/api/json/v1/1/";

function Home() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterType, setFilterType] = useState("search");
  const [meals, setMeals] = useState([]);
  const [loadingInit, setLoadingInit] = useState(true);

  // 🔹 Load base lists (category, ingredient, area)
  useEffect(() => {
    (async () => {
      try {
        const [catRes, ingRes, areaRes] = await Promise.all([
          fetch(`${API_BASE}list.php?c=list`),
          fetch(`${API_BASE}list.php?i=list`),
          fetch(`${API_BASE}list.php?a=list`),
        ]);
        const [catJson, ingJson, areaJson] = await Promise.all([
          catRes.json(),
          ingRes.json(),
          areaRes.json(),
        ]);
        setCategories(catJson.meals || []);
        setIngredients(ingJson.meals || []);
        setAreas(areaJson.meals || []);
      } catch (err) {
        console.error("Error loading base lists:", err);
      }
    })();
  }, []);

  // 🔹 Function to load 3 meals per category
  const loadInitialMeals = useCallback(async () => {
    try {
      if (!categories.length) return;
      setLoadingInit(true);

      const mealsByCategory = await Promise.all(
        categories.map(async (cat) => {
          const res = await fetch(`${API_BASE}filter.php?c=${cat.strCategory}`);
          const json = await res.json();
          // Take first 3 meals per category
          return (json.meals || []).slice(0, 3);
        })
      );

      const allMeals = mealsByCategory.flat().filter(Boolean);
      setMeals(allMeals);
    } catch (err) {
      console.error("Error loading meals by category:", err);
    } finally {
      setLoadingInit(false);
    }
  }, [categories]);

  // 🔹 Load initial meals when categories are ready
  useEffect(() => {
    if (categories.length) loadInitialMeals();
  }, [categories, loadInitialMeals]);

  // 🔹 Build API dynamically for search
  const getEndpoint = useCallback(() => {
    if (!query) return null;
    const term = query.toLowerCase();
    switch (filterType) {
      case "ingredient":
        return `${API_BASE}filter.php?i=${term}`;
      case "category":
        return `${API_BASE}filter.php?c=${term}`;
      case "area":
        return `${API_BASE}filter.php?a=${term}`;
      default:
        return `${API_BASE}search.php?s=${term}`;
    }
  }, [filterType, query]);

  const { data, loading, error } = useFetch(getEndpoint());

  // 🔹 Update meals on search result
  useEffect(() => {
    if (loading) return;
    if (data?.meals?.length) setMeals(data.meals);
    else if (!loading && query) setMeals([]);
  }, [loading, data, query]);

  // 🔹 Handle search input
  const handleChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    setShowSuggestions(val.trim().length > 0);

    // 🔹 When cleared, reset to initial meals
    if (val.trim() === "") {
      setQuery("");
      loadInitialMeals();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim()) handleSmartSearch(search.trim());
  };

  const handleSmartSearch = (term) => {
    const lower = term.toLowerCase();
    const isIngredient = ingredients.some(
      (i) => i.strIngredient.toLowerCase() === lower
    );
    const isCategory = categories.some(
      (c) => c.strCategory.toLowerCase() === lower
    );
    const isArea = areas.some((a) => a.strArea.toLowerCase() === lower);

    if (isIngredient) setFilterType("ingredient");
    else if (isCategory) setFilterType("category");
    else if (isArea) setFilterType("area");
    else setFilterType("search");

    setQuery(term);
    setSearch(term);
    setShowSuggestions(false);
  };

  // 🔹 Suggestions
  const lower = search.toLowerCase();
  const suggestions = [
    ...categories
      .filter((c) => c.strCategory.toLowerCase().includes(lower))
      .slice(0, 3)
      .map((c) => ({ name: c.strCategory, type: "category" })),
    ...ingredients
      .filter((i) => i.strIngredient.toLowerCase().includes(lower))
      .slice(0, 3)
      .map((i) => ({ name: i.strIngredient, type: "ingredient" })),
    ...areas
      .filter((a) => a.strArea.toLowerCase().includes(lower))
      .slice(0, 3)
      .map((a) => ({ name: a.strArea, type: "area" })),
  ];

  // 🔹 Animations
  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 40, transition: { duration: 0.3 } },
  };


  return (
    <section className="home">
      {/* 🔹 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onClick={() => setSelectedMeal(null)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search by meal, ingredient, category, or area..."
          onFocus={() => search && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((s, idx) => (
              <li
                key={idx}
                onMouseDown={() => handleSmartSearch(s.name)}
                className="suggestion-item"
              >
                {s.type === "ingredient"
                  ? "🥕"
                  : s.type === "category"
                    ? "🍽️"
                    : "🌍"}{" "}
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔹 Page Slide Transition */}
      <div className="slide-container">
        <AnimatePresence mode="wait">
          {!selectedMeal ? (
            <motion.div
              key="list"
              className="meals-grid"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {loadingInit && !query && <Loader />}
              {error && <p className="error-text">{error.message}</p>}
              {meals.length === 0 && !loadingInit && !loading && (
                <p className="no-results">No meals found for "{query}"</p>
              )}
              {meals.map((meal, index) =>
                meal ? (
                  <MealCard
                    key={meal.idMeal || index}
                    meal={meal}
                    onClick={() => setSelectedMeal(meal)}
                  />
                ) : (
                  <SkeletonCard key={index} />
                )
              )}
            </motion.div>
          ) : (
            <motion.div
              key="details"
              className="meal-details-page"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <button className="back-btn" onClick={() => setSelectedMeal(null)}>
                Back
              </button>
              <MealDetails mealId={selectedMeal.idMeal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Home;
