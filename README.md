#  Recipe Ideas

A simple and responsive React web app to explore meal ideas using **TheMealDB API**.  
Built with **React (Vite)**, **Framer Motion**, and **React Router**.

---

##  Live Demo
Deployed on **Vercel** — [Add your Vercel URL here after deployment](https://vercel.com)

---

##  Overview
**Recipe Ideas** helps users find meals based on ingredients, categories, or names.  
It’s designed for a smooth user experience with animated transitions, responsive layouts, and real-time API fetching.

**Key Features:**
- Search recipes by ingredient or name  
- View full recipe details (instructions, ingredients, YouTube link)  
- Browse meals by category  
- Smooth transitions and skeleton loaders  
- Responsive on desktop and mobile  

---

## Tech Stack

- **Frontend:** React (Vite)
- **Styling:** CSS + Framer Motion
- **Routing:** React Router DOM
- **Data Source:** [TheMealDB API](https://www.themealdb.com/api.php)

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Jithendhar18/recipe-ideas.git

# 2. Navigate into project folder
cd recipe-ideas

# 3. Install dependencies
npm install

# 4. Run the project locally
npm run dev
```

App runs at **http://localhost:5173**

---

## API Reference

| Endpoint | Description |
|-----------|--------------|
| `/search.php?s={mealName}` | Search meals by name |
| `/filter.php?i={ingredient}` | Filter meals by ingredient |
| `/filter.php?c={category}` | Filter meals by category |
| `/lookup.php?i={mealId}` | Get full meal details |

---

##  Project Structure

```
src/
├── components/
│   ├── Loader.jsx
│   ├── MealCard.jsx
│   ├── Navbar.jsx
│   └── SkeletonCard.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useFetch.js
│   └── useWindowSize.js
├── pages/
│   ├── Home.jsx
│   ├── MealDetails.jsx
│   └── About.jsx
├── App.jsx
├── main.jsx
├── index.css
└── styles.css
```

---

## Deployment (Vercel)

1. Push your project to a **GitHub repository**.  
2. Go to [https://vercel.com](https://vercel.com) → Import your repo.  
3. Select **Vite** as the framework (Vercel auto-detects it).  
4. Wait for build → Vercel gives a **live URL**.  
5. Update that URL in the “Live Demo” section above.

---

## Future Enhancements
- Save favorite recipes (localStorage)  
- Multi-ingredient search  
- Improved error handling

---

## Author
Developed by **Pullur Jithendhar Reddy**  
Part of a **Take-Home UI Challenge** (Recipe Ideas problem statement).
