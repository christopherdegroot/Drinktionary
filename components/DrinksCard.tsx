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
        if (
          ingredient != null &&
          ingredient != undefined &&
          !ingredients.includes(ingredient)
        ) {
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
      <div>
        <TitleWrapper>
          <CocktailName>{data.strDrink} </CocktailName>
          <Dot>•</Dot>
          <Category> {data.strCategory}</Category>
        </TitleWrapper>

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
          {ingredients.map((item, index) => {
            return <Ingredient key={index}>{item} </Ingredient>;
          })}
        </IngredientList>
      </div>
      <GlassType>Use a {data.strGlass}</GlassType>
    </DrinksCardWrapper>
  );
}

const Ingredient = styled.li`
  float: left;
  margin-right: 30px;
  color: grey;
`;

const GlassType = styled.p`
  color: lightSlateGrey;
  font-size: 18px;
  margin-bottom: 0px;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const Dot = styled.p`
  font-size: 24px;
  color: grey;
`;

const IngredientList = styled.ul`
  margin-top: 10px;
  overflow: hidden;

  padding-left: 0;
  font-size: 20px;
  & :first-of {
    list-style: none;
  }

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

const Category = styled.p`
  color: grey;
  font-size: 22px;
  margin-left: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const IngredientCount = styled.span`
  color: blue;
  font-size: 18px;
  padding-top: 3px;
`;

const CocktailName = styled.p`
  font-size: 32px;
  color: grey;
  margin-right: 10px;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 0;
  gap: 3px;
`;

const DrinksCardWrapper = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: white
  border-radius: 100px;
  padding: 20px;

  background: #FFFFFF;

  box-shadow: 0px 2px 5px 2px rgba(208, 217, 221, 0.4);
  border-radius: 20px;
`;
