import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import Ingredients from "../public/assets/icons/ingredients.png";

export default function DrinksCard(props) {
  const data = props.data;
  const [ingredients, setIngredients] = useState([]);

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

  useEffect(() => {
    getIngredients();
  }, [data]);

  return (
    <DrinksCardWrapper>
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
    </DrinksCardWrapper>
  );
}

const IngredientList = styled.ul``;

const IngredientCount = styled.span`
  color: blue;
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

const DrinksCardWrapper = styled.div`
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
