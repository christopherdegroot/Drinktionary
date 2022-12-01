import { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState(null);

  const getRandomCocktail = async () => {
    try {
      axios
        .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then((res) => {
          console.log("res.data:", res.data);
          setData(res.data);
        });
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getRandomCocktail();
  }, []);

  return <p> hello world</p>;
};

export default Index;
