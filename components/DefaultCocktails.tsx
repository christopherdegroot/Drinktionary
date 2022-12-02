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
  const getData = async (letter?, category?) => {
    axios
      .get(
        !category
          ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
          : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
      )
      .then((res) => {
        setData(res.data.drinks);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("error:", error);
        setLoading;
      });
  };

  const [IsDropdownActive, setIsDropdownActive] = useState(false);

  const [listening, setListening] = useState(false);
  useEffect(
    listenForOutsideClick(listening, setListening, menuRef, setIsDropdownActive)
  );

  const openMenu = () => {
    setIsDropdownActive(!IsDropdownActive);
  };

  const handleMenuClick = (option) => {
    getData(null, option);
    setIsDropdownActive(!IsDropdownActive);
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

  // happy path output
  return (
    <>
      <MainTitle>
        <h2>The Drinktionary</h2>
      </MainTitle>
      <OptionsContainer>
        <AlphabetSelector>
          <li
            onClick={() => {
              getData("A");
            }}
          >
            A
          </li>
          <li
            onClick={() => {
              getData("B");
            }}
          >
            B
          </li>
          <li
            onClick={() => {
              getData("C");
            }}
          >
            C
          </li>
          <li
            onClick={() => {
              getData("D");
            }}
          >
            D
          </li>
          <li
            onClick={() => {
              getData("E");
            }}
          >
            E
          </li>
          <li
            onClick={() => {
              getData("F");
            }}
          >
            F
          </li>
          <li
            onClick={() => {
              getData("G");
            }}
          >
            G
          </li>
          <li
            onClick={() => {
              getData("H");
            }}
          >
            H
          </li>
          <li
            onClick={() => {
              getData("I");
            }}
          >
            I
          </li>
          <li
            onClick={() => {
              getData("J");
            }}
          >
            J
          </li>
          <li
            onClick={() => {
              getData("K");
            }}
          >
            K
          </li>
          <li
            onClick={() => {
              getData("L");
            }}
          >
            L
          </li>
          <li
            onClick={() => {
              getData("M");
            }}
          >
            M
          </li>
          <li
            onClick={() => {
              getData("N");
            }}
          >
            N
          </li>
          <li
            onClick={() => {
              getData("O");
            }}
          >
            O
          </li>
          <li
            onClick={() => {
              getData("P");
            }}
          >
            P
          </li>
          <li
            onClick={() => {
              getData("Q");
            }}
          >
            Q
          </li>
          <li
            onClick={() => {
              getData("R");
            }}
          >
            R
          </li>
          <li
            onClick={() => {
              getData("S");
            }}
          >
            S
          </li>
          <li
            onClick={() => {
              getData("T");
            }}
          >
            T
          </li>
          <li
            onClick={() => {
              getData("U");
            }}
          >
            U
          </li>
          <li
            onClick={() => {
              getData("V");
            }}
          >
            V
          </li>
          <li
            onClick={() => {
              getData("W");
            }}
          >
            W
          </li>
          <li
            onClick={() => {
              getData("X");
            }}
          >
            X
          </li>
          <li
            onClick={() => {
              getData("Y");
            }}
          >
            Y
          </li>
          <li
            onClick={() => {
              getData("Z");
            }}
          >
            Z
          </li>
        </AlphabetSelector>
        <div className="container">
          <div className="menu-container">
            <button
              ref={menuRef}
              onClick={() => openMenu()}
              className="menu-trigger"
              id="menu-top"
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
      {data ? (
        data.slice(0, 5).map((drink) => {
          console.log("drink:", drink);
          return <DrinksCard data={drink}></DrinksCard>;
        })
      ) : (
        <NoDrinksMessage>No drinks, try again!</NoDrinksMessage>
      )}
    </>
  );
};

const NoDrinksMessage = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const AlphabetSelector = styled.ul`
float: left;
list-style-type: none;
cursor: pointer;
background-color: cornflowerBlue;
padding: 15px;
border-radius: 90px;
margin-bottom: 0px;
width: 500px;


li {
    padding:0px;
    border-right:1px solid @darkgrey;
    font-size: 18px;
    text-align: center;
    padding-left: 3px;
    padding-right: 3px;
    display:inline;
    color: white;
}

li:last-child {
    border:none;
    padding-right: 0px;
}

li:hover {
    color:@green;
    background-color: @lightgrey;
}
}`;

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

const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
  width: 100%;
`;

export default DefaultCocktails;
