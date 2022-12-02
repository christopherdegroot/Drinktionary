import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import styled from "@emotion/styled";
import Ingredients from "../public/assets/icons/ingredients.png";
import listenForOutsideClick from "../src/utils/listenForOutsideClicks";

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
      .get(
        searchTerm
          ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchTerm}`
          : "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      )
      .then((res) => {
        console.log("res.data:", res.data);
        if (searchTerm) {
          axios
            .get(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${res.data.drinks[0].idDrink}
          `
            )
            .then((res) => {
              setData(res.data.drinks[0]);
            });
        }
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

  // happy path output
  return (
    <>
      <OptionsContainer>
        <Button onClick={() => getData()}>Find a New Cocktail!</Button>
        <div className="container">
          <div className="menu-container">
            <button
              ref={menuRef}
              onClick={() => openMenu()}
              className="menu-trigger"
            >
              <span>By Category</span>
              <img
                src="https://img.icons8.com/fluency/512/cocktail.png"
                width="30"
                height="30"
                alt="drink icon"
              />
            </button>
            <nav className={`menu ${IsDropdownActive ? "active" : "inactive"}`}>
              <ul>
                <li>
                  <StyledOption
                    onClick={() => handleMenuClick("cocktail")}
                    value="cocktail"
                  >
                    Cocktail
                  </StyledOption>
                </li>
                <li>
                  <StyledOption
                    onClick={() => handleMenuClick("ordinary_drink")}
                    value="ordinary_drink"
                  >
                    Ordinary Drink
                  </StyledOption>
                </li>
                <li>
                  <StyledOption
                    onClick={() => handleMenuClick("shot")}
                    value="shot"
                  >
                    Shot
                  </StyledOption>
                </li>
                <li>
                  <StyledOption
                    onClick={() => handleMenuClick("punch_/_party_drink")}
                    value="punch_/_party_drink"
                  >
                    Punch/Party Drink
                  </StyledOption>
                </li>
                <li>
                  <StyledOption
                    onClick={() => handleMenuClick("beer")}
                    value="beer"
                  >
                    Beer
                  </StyledOption>
                </li>
                <li>
                  <StyledOption
                    onClick={() => handleMenuClick("shake")}
                    value="shake"
                  >
                    Shake
                  </StyledOption>
                </li>
                <li>
                  <StyledOption
                    onClick={() => handleMenuClick("coffee_/_tea")}
                    value="coffee_/_tea"
                  >
                    Coffee/Tea
                  </StyledOption>
                </li>
                <li>
                  <StyledOption
                    onClick={() => handleMenuClick("other/unknown")}
                    value="other/unknown"
                  >
                    Other/Unknown
                  </StyledOption>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </OptionsContainer>
      <DrinksCard>
        <CocktailName>{data.strDrink}</CocktailName>

        <IngredientsContainer>
          <Image
            height={"24"}
            width={"24"}
            src={Ingredients}
            alt="ingredients"
          ></Image>
          <p> </p>
          <IngredientCount>{ingredients.length} Ingredients</IngredientCount>
        </IngredientsContainer>
        <IngredientList>
          {ingredients.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </IngredientList>

        <p>Category: {data.strCategory}</p>
        <p>Glass: {data.strGlass}</p>
      </DrinksCard>
    </>
  );
};

const StyledOption = styled.option`
  cursor: pointer;
`;

const CocktailName = styled.p`
  font-size: 32px;
  color: grey;
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;

const IngredientList = styled.ul``;

const IngredientCount = styled.span`
  color: blue;
`;

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
  width: 100%;
`;

const DrinksCard = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  border: white
  border-radius: 100px;
  padding: 20px;
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 30px;

  background: #FFFFFF;

  box-shadow: 0px 2px 5px 2px rgba(208, 217, 221, 0.4);
  border-radius: 20px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  gap: 4px;
  border: white;

  cursor: pointer;

  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: white;

  width: 220px;
  height: 40px;

  background: cornflowerBlue;
  border-radius: 100px;
`;

export default DefaultCocktails;
