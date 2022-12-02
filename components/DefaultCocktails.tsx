import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import listenForOutsideClick from "../src/utils/listenForOutsideClicks";
import DrinksCard from "./DrinksCard";

const DefaultCocktails = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const menuRef2 = useRef(null);
  const [letter, setLetter] = useState("A");
  const [limit, setLimit] = useState(5);

  // function to get 1 random cocktal
  const getData = async (letter?, category?) => {
    axios
      .get(
        !category
          ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
          : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
      )
      .then((res) => {
        if (category) {
          const categoryCount = res.data.drinks.length;
          const dataArray = [];
          res.data.drinks.map((drink) => {
            axios
              .get(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}
            `
              )
              .then((res2) => {
                dataArray.push(res2.data.drinks[0]);
                if (dataArray.length == categoryCount) {
                  setData(dataArray);
                }
              });
          });
        } else {
          setData(res.data.drinks);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log("error:", error);
        setLoading;
      });
  };

  const [IsDropdownActive, setIsDropdownActive] = useState(false);

  const [listening, setListening] = useState(false);
  useEffect(
    listenForOutsideClick(
      listening,
      setListening,
      menuRef2,
      setIsDropdownActive
    )
  );

  const openMenu = () => {
    setIsDropdownActive(!IsDropdownActive);
  };

  const handleMenuClick = (option) => {
    getData(null, option);
    setIsDropdownActive(!IsDropdownActive);
  };

  // Get random cocktail on page load
  useEffect(() => {
    getData(letter);
  }, []);

  // Conditional page renders for loading, no data, and error states
  if (loading) return <p>Loading...</p>;

  // happy path output
  return (
    <>
      <MainTitle>
        <h2>The Drinktionary</h2>
      </MainTitle>
      <OptionsContainer>
        <div className="container">
          <div className="menu-container">
            <button
              ref={menuRef2}
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
        <AlphabetSelector>
          <li
            className={letter === "A" ? "active" : ""}
            onClick={() => {
              setLetter("A");
              getData("A");
            }}
          >
            A
          </li>
          <li
            className={letter === "B" ? "active" : ""}
            onClick={() => {
              setLetter("B");
              getData("B");
            }}
          >
            B
          </li>
          <li
            className={letter === "C" ? "active" : ""}
            onClick={() => {
              setLetter("C");
              getData("C");
            }}
          >
            C
          </li>
          <li
            className={letter === "D" ? "active" : ""}
            onClick={() => {
              setLetter("D");
              getData("D");
            }}
          >
            D
          </li>
          <li
            className={letter === "E" ? "active" : ""}
            onClick={() => {
              setLetter("E");
              getData("E");
            }}
          >
            E
          </li>
          <li
            className={letter === "F" ? "active" : ""}
            onClick={() => {
              setLetter("F");
              getData("F");
            }}
          >
            F
          </li>
          <li
            className={letter === "G" ? "active" : ""}
            onClick={() => {
              setLetter("G");
              getData("G");
            }}
          >
            G
          </li>
          <li
            className={letter === "H" ? "active" : ""}
            onClick={() => {
              setLetter("H");
              getData("H");
            }}
          >
            H
          </li>
          <li
            className={letter === "I" ? "active" : ""}
            onClick={() => {
              setLetter("I");
              getData("I");
            }}
          >
            I
          </li>
          <li
            className={letter === "J" ? "active" : ""}
            onClick={() => {
              setLetter("J");
              getData("J");
            }}
          >
            J
          </li>
          <li
            className={letter === "K" ? "active" : ""}
            onClick={() => {
              setLetter("K");
              getData("K");
            }}
          >
            K
          </li>
          <li
            className={letter === "L" ? "active" : ""}
            onClick={() => {
              setLetter("L");
              getData("L");
            }}
          >
            L
          </li>
          <li
            className={letter === "M" ? "active" : ""}
            onClick={() => {
              setLetter("M");
              getData("M");
            }}
          >
            M
          </li>
          <li
            className={letter === "N" ? "active" : ""}
            onClick={() => {
              setLetter("N");
              getData("N");
            }}
          >
            N
          </li>
          <li
            className={letter === "O" ? "active" : ""}
            onClick={() => {
              setLetter("O");
              getData("O");
            }}
          >
            O
          </li>
          <li
            className={letter === "P" ? "active" : ""}
            onClick={() => {
              setLetter("P");
              getData("P");
            }}
          >
            P
          </li>
          <li
            className={letter === "Q" ? "active" : ""}
            onClick={() => {
              setLetter("Q");
              getData("Q");
            }}
          >
            Q
          </li>
          <li
            className={letter === "R" ? "active" : ""}
            onClick={() => {
              setLetter("R");
              getData("R");
            }}
          >
            R
          </li>
          <li
            className={letter === "S" ? "active" : ""}
            onClick={() => {
              setLetter("S");
              getData("S");
            }}
          >
            S
          </li>
          <li
            className={letter === "T" ? "active" : ""}
            onClick={() => {
              setLetter("T");
              getData("T");
            }}
          >
            T
          </li>
          <li
            className={letter === "U" ? "active" : ""}
            onClick={() => {
              setLetter("U");
              getData("U");
            }}
          >
            U
          </li>
          <li
            className={letter === "V" ? "active" : ""}
            onClick={() => {
              setLetter("V");
              getData("V");
            }}
          >
            V
          </li>
          <li
            className={letter === "W" ? "active" : ""}
            onClick={() => {
              setLetter("W");
              getData("W");
            }}
          >
            W
          </li>
          <li
            className={letter === "X" ? "active" : ""}
            onClick={() => {
              setLetter("X");
              getData("X");
            }}
          >
            X
          </li>
          <li
            className={letter === "Y" ? "active" : ""}
            onClick={() => {
              setLetter("Y");
              getData("Y");
            }}
          >
            Y
          </li>
          <li
            className={letter === "Z" ? "active" : ""}
            onClick={() => {
              setLetter("Z");
              getData("Z");
            }}
          >
            Z
          </li>
        </AlphabetSelector>
      </OptionsContainer>
      {data ? (
        data.slice(0, limit).map((drink, index) => {
          return <DrinksCard key={index} data={drink}></DrinksCard>;
        })
      ) : (
        <NoDrinksMessage>No drinks, try again!</NoDrinksMessage>
      )}
      <OptionsContainer>
        <Limit>
          <P>Select Limit</P>
          <NumberLimit
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </NumberLimit>
        </Limit>
      </OptionsContainer>
    </>
  );
};

const P = styled.p``;

const Limit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NumberLimit = styled.select`
  width: 50px;
`;

const NoDrinksMessage = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const AlphabetSelector = styled.ul`
display: flex;
justify-content: space-between;
float: left;
list-style-type: none;
cursor: pointer;
padding: 15px;
border-radius: 90px;
width: 80%;
overflow: hidden;


li {
  overflow: hidden;
    padding:0px;
    border-right:1px solid @darkgrey;
    font-size: 18px;
    text-align: center;
    padding-left: 3px;
    padding-right: 3px;
    display:inline;
    color: grey;

   
}

.active {
  color: blue;
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
