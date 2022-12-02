import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import listenForOutsideClick from "../src/utils/listenForOutsideClicks";
import DrinksCard from "./DrinksCard";

const DefaultCocktails = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const menuRef = useRef(null);
  const [letter, setLetter] = useState("a");

  // function to get 1 random cocktal
  const getData = async (letter) => {
    axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
      .then((res) => {
        setData(res.data.drinks);
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
    getData(letter);
  }, []);

  useEffect(() => {
    getIngredients();
  }, [data]);

  // Conditional page renders for loading, no data, and error states
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  // happy path output
  return (
    <>
      <MainTitle>
        <h2>The Drinktionary</h2>
      </MainTitle>
      {data.slice(0, 5).map((drink) => {
        console.log("drink:", drink);
        return <DrinksCard data={drink}></DrinksCard>;
      })}
    </>
  );
};

const StyledOption = styled.option`
  cursor: pointer;
`;

const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  width: 100vw;

  h2 {
    font-weight: 300;
    font-size: 48px;
  }
`;

export default DefaultCocktails;
