import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  // function to get 1 random cocktal
  const getData = async (searchTerm?) => {
    axios
      .get(
        searchTerm
          ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchTerm}`
          : "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      )
      .then((res) => {
        console.log("res.data:", res.data);
        setData(res.data.drinks[0]);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("error:", error);
        setLoading;
      });
  };

  const getIngredients = () => {
    if (data) {
      let ingredientsKeys = Object.keys(data).filter((key) =>
        key.includes("strIngredient")
      );

      let ingredientsArray = ingredientsKeys.map((ingredient) => {
        return data[ingredient];
      });

      let ingredients = [];
      ingredientsArray.forEach((ingredient) => {
        if (ingredient != null || ingredient != undefined) {
          ingredients.push(ingredient);
        }
      });

      setIngredients(ingredients);
    }
  };

  // Get random cocktail on page load
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getIngredients();
  }, [data]);

  // Conditional page renders for loading, no data, and error states
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;
  if (error) return <p>Not found in Pokedex, please refresh and try again</p>;

  // happy path output
  return (
    <>
      <Head>
        <title>Mixology</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <h1>Random Cocktail Generator</h1>
      <p>Name: {data.strDrink}</p>

      <p>Ingredients:</p>
      <ul>
        {ingredients.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>

      <p>Category: {data.strCategory}</p>
      <p>Glass: {data.strGlass}</p>
      <button onClick={() => getData()}>New Cocktail</button>
      <select
        onChange={(e) => getData(e.target.value)}
        name="drinks"
        id="drinks"
      >
        <option value="cocktail">Cocktail</option>
        <option value="ordinary_drink">Ordinary Drink</option>
        <option value="shot">Shot</option>
        <option value="punch_/_party_drink">Punch/Party Drink</option>
        <option value="beer">Beer</option>
        <option value="shake">Shake</option>
        <option value="coffee_/_tea">Coffee/Tea</option>
        <option value="other/unknown">Other/Unknown</option>
      </select>
    </>
  );
};

export default Index;
