import axios from "axios";

interface ingredients {
  name: string;
  measure: string;
}

export interface iRandomDrink {
  name: string;
  categories: string[];
  isAlcohol: string;
  glass: string;
  img: string;
  ingredients: ingredients[];
  instruction: string;
}

export class DataProvider {
  public static getRandomDrink(): Promise<iRandomDrink> {
    return axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then((res) => {
        const data = res.data.drinks[0];
        console.log(data);
        const randomDrinkData: iRandomDrink = {
          name: data.strDrink,
          categories: data.strCategory.split(" / "),
          isAlcohol: data.strAlcoholic === "Alcoholic" ? "Yes" : "No",
          glass: data.strGlass,
          img: data.strDrinkThumb,
          ingredients: Object.entries(data)
            .filter(
              ([key, value]) =>
                key.startsWith("strIngredient") && value && value !== "null"
            )
            .map(([ingredientKey, ingredientValue]) => {
              const measureKey = "strMeasure" + ingredientKey.slice(13);
              const measureValue = data[measureKey] || "-";
              return {
                name: ingredientValue as string,
                measure: measureValue as string,
              };
            }),
          instruction: data.strInstructions,
        };
        console.log(randomDrinkData);
        return randomDrinkData;
      });
  }
}
