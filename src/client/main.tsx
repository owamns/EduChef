import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Pages/App/App.js";
import InicioUsuario from "./Pages/inicio-usuario/inicio-usuario.js";
import CocinaUsuario from "./Pages/Cocina-usuario/Cocina-Usuario.js";
import SubirContenido from "./Pages/Subir-Contenido/subirContenido.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Perfil from "./Pages/Perfil/Perfil.js";
import "vite/modulepreload-polyfill";
import TestMaker from "./Pages/Test-Maker/Test-maker.js";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: (
			<>
				{" "}
				<h1>Error :{"["}</h1> <br />{" "}
				<p>No se ha encontrado o no existe la ruta indicada</p>
			</>
		),
	},
	{
		path: "/curso/:id",
		element: <CocinaUsuario />,
	},
	{
		path: "/Home",
		element: <InicioUsuario />,
	},
	{
		path: "/perfil",
		element: <Perfil></Perfil>,
	},
	{
		path: "/SubirContenido",
		element: <SubirContenido />,
	},
	{
		path: "/realizarTest",
		element: <TestMaker></TestMaker>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</React.StrictMode>
);
