import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import listenForOutsideClick from "../src/utils/listenForOutsideClicks";
import DrinksCard from "./DrinksCard";

const RandomCocktail = (isMobile) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
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
        const resLength = res.data.drinks.length;
        function getRandomInt(max) {
          return Math.floor(Math.random() * max);
        }
        const randomInLengthRange = getRandomInt(resLength);
        if (searchTerm) {
          axios
            .get(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${res.data.drinks[randomInLengthRange].idDrink}
          `
            )
            .then((res2) => {
              console.log("res", res2);
              setData(res2.data.drinks[0]);
              setLoading(false);
            });
        } else {
          setData(res.data.drinks[0]);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log("error:", error);
        setLoading;
      });
  };

  // Get random cocktail on page load
  useEffect(() => {
    getData();
  }, []);

  // Conditional page renders for loading, no data, and error states
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  // happy path output
  return (
    <MainContainer>
      <MainTitle>
        <h2>Mix It Up</h2>
      </MainTitle>
      <OptionsContainer>
        <Button onClick={() => getData()}>Randomize!</Button>
        <div className="container">
          <div className="menu-container">
            <button
              ref={menuRef}
              onClick={() => openMenu()}
              className="menu-trigger"
            >
              <span>By Category</span>
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
      <DrinksListContainer>
        <DrinksCard data={data}></DrinksCard>
      </DrinksListContainer>
    </MainContainer>
  );
};

const DrinksListContainer = styled.div`
  @media only screen and (max-width: 1440px) {
    margin-left: 30px;
    margin-right: 30px;
  }

  @media only screen and (min-width: 1440px) {
    margin-left: 90px;
    margin-right: 90px;
  }
`;

const MainContainer = styled.div`
  padding-bottom: 90px;
`;

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
  margin-bottom: 50px;
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
  border-radius: 90px;
`;

const MainTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;

  h2 {
    font-weight: 300;
    font-size: 36px;
  }
`;

export default RandomCocktail;
