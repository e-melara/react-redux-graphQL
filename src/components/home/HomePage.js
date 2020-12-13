import React from "react";
import { connect } from "react-redux";

import Card from "../card/Card";
import styles from "./home.module.css";
import { removeCharacters, addFavoritus } from "../../redux/characterDuck";

function Home({ chars, removeCharacters, addFavoritus }) {
 function renderCharacter() {
  let char = chars[0];
  return <Card rightClick={addFav} leftClick={nextCharacters} {...char} />;
 }

 const nextCharacters = () => {
  removeCharacters();
 };

 const addFav = () => {
  addFavoritus();
 };

 return (
  <div className={styles.container}>
   <h2>Personajes de Rick y Morty</h2>
   <div>{renderCharacter()}</div>
  </div>
 );
}

const mapState = (state) => {
 return {
  chars: state.characters.array,
 };
};

export default connect(mapState, { removeCharacters, addFavoritus })(Home);
