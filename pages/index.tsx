import { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const getCocktailData = async () => {
    setLoading(true);
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
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

  useEffect(() => {
    getCocktailData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;
  if (error) return <p>Not found in Pokedex, please refresh and try again</p>;

  return (
    <>
      <h1>Random Cocktail</h1>
      <p>{data.strDrink}</p>
    </>
  );
};

export default Index;
