import React from "react";
import styles from "./favs.module.css";
import Card from "../card/Card";
import { connect } from "react-redux";

function FavPage({ characters = [0], fetchingFav }) {
 function renderCharacter(char, i) {
  return <Card key={i} {...char} hiden={true} />;
 }

 if (fetchingFav) {
  return <h2>Estamos cargando la informacion</h2>;
 }

 return (
  <>
   <h2 style={{ textAlign: "center" }}>Favoritos</h2>
   <div className={styles.container}>
    {characters.map(renderCharacter)}
    {!characters.length && <h3>No hay personajes agregados</h3>}
   </div>
  </>
 );
}

const mapState = ({ characters: { favoritus, fetchingFav } }) => {
 return {
  characters: favoritus,
  fetchingFav,
 };
};

export default connect(mapState)(FavPage);
