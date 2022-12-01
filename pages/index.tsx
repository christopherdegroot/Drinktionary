import { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

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

  const handleChange = function (value?) {
    console.log("value", value);
  };

  // Get random cocktail on page load
  useEffect(() => {
    getData();
  }, []);

  // Conditional page renders for loading, no data, and error states
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;
  if (error) return <p>Not found in Pokedex, please refresh and try again</p>;

  // happy path output
  return (
    <>
      <h1>Random Cocktail Generator</h1>
      <p>{data.strDrink}</p>
      <p>{data.strInstructions}</p>
      <p>{data.strCategory}</p>
      <p>{data.strGlass}</p>
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
