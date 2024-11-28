import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import AuthForm from '../component/formulario';

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			  <div className="App">
            <h1>Welcome to My App</h1>
            <AuthForm />
        </div>
		</div>
	);
};
