import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import AgeModal from "../components/AgeModal";
import RandomCocktail from "../../components/RandomCocktail";
import DefaultCocktails from "../../components/DefaultCocktails";

const Index = () => {
  return (
    <>
      <Head>
        <title>Drinktionary</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <DefaultCocktails />
      <RandomCocktail />
      {/* <AgeModal /> */}
    </>
  );
};

export default Index;
