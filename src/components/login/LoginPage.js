import React from "react";
import { connect } from "react-redux";

import styles from "./login.module.css";
import { doGoogleLoginAction, logoutAction } from "../../redux/userDuck";

function LoginPage({ doGoogleLoginAction, fetching, loggin, logoutAction }) {
 const doLogin = () => {
  doGoogleLoginAction();
 };

 const doLogout = () => {
  logoutAction();
 };

 if (fetching) {
  return <h1>Cargado ....</h1>;
 }

 return (
  <div className={styles.container}>
   {loggin ? (
    <>
     <h1>Cierra tu sesión</h1>
     <button onClick={doLogout}>Cerrar Sesión</button>
    </>
   ) : (
    <>
     <h1>Inicia Sesión con Google</h1>
     <button onClick={doLogin}>Iniciar</button>
    </>
   )}
  </div>
 );
}

const mapState = ({ user: { fetching, loggin } }) => {
 return {
  fetching,
  loggin,
 };
};

export default connect(mapState, { doGoogleLoginAction, logoutAction })(
 LoginPage
);
