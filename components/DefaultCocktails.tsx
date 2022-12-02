import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import listenForOutsideClick from "../src/utils/listenForOutsideClicks";
import DrinksCard from "./DrinksCard";

const DefaultCocktails = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [IsDropdownActive, setIsDropdownActive] = useState(false);

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  useEffect(
    listenForOutsideClick(listening, setListening, menuRef, setIsDropdownActive)
  );

  const openMenu = () => {
    setIsDropdownActive(!IsDropdownActive);
  };

  const handleMenuClick = (option) => {
    getData(option);
    setIsDropdownActive(!IsDropdownActive);
  };

  // function to get 1 random cocktal
  const getData = async (searchTerm?) => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
      .then((res) => {
        console.log("res.data in default:", res.data);
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
    getData();
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
      <DrinksCard data={data}></DrinksCard>
    </>
  );
};

const StyledOption = styled.option`
  cursor: pointer;
`;

export default DefaultCocktails;
