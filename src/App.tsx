import { useState } from "react";
import "./App.css";
import { DataProvider, iRandomDrink } from "./data/DataProvider";

function App() {
  const [drink, setDrink] = useState<iRandomDrink>();

  const onRandomDrinkClick = () => {
    DataProvider.getRandomDrink().then(setDrink);
  };
  return (
    <>
      <h1>Random Drink Recipe</h1>
      <div className="card">
        <button onClick={onRandomDrinkClick}>generate</button>
      </div>
      <p>{drink?.name}</p>
      <img src={drink?.img} width={250} height={250} />
      <h2>Glass: {drink?.glass}</h2>
      <h2>Contains alcohol: {drink?.isAlcohol}</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>Ingredient</th>
            <th style={{ border: "1px solid black" }}>Measure</th>
          </tr>
        </thead>
        <tbody>
          {drink?.ingredients.map((ingredient, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black" }}>{ingredient.name}</td>
              <td style={{ border: "1px solid black" }}>
                {ingredient.measure}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Instructions:</h2>
      <p>{drink?.instruction}</p>
    </>
  );
}

export default App;
