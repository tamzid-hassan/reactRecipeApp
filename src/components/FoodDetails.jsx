import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "ce95e82ecc4a4786bb50b147db0e0906";

  useEffect(() => {
    async function fetchFood() {
      const response = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await response.json();

      console.log(data);
      setFood(data);
      setIsLoading(false);
    }

    fetchFood();
  }, [foodId]);

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />
        <div className={styles.recipeDetails}>
          <span>
            <strong>Ready in: {food.readyInMinutes} Minutes ⏰</strong>
          </span>
          <span>
            <strong>
              Serves:{" "}
              {food.servings > 2 ? `${food.servings} 👨‍👩‍👧‍👧` : `${food.servings}👫`}
            </strong>
          </span>
          <span>
            <strong>Vegetarian: {food.vegetarian ? "✔" : "❌"}</strong>
          </span>
        </div>
        <div>
          <span>
            <strong>
              $ {Math.ceil(food.pricePerServing / 100)} Per Serving
            </strong>
          </span>
        </div>
        <h2>Instructions</h2>
        <div className={styles.recipeInstruction}>
          <ol>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
