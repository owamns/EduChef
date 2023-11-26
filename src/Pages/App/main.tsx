import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import InicioUsuario from "../inicio-usuario/inicio-usuario.tsx";
import CocinaUsuario from "../Cocina-usuario/Cocina-Usuario.tsx";
import SubirContenido from "../Subir-Contenido/subirContenido.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Perfil from "../Perfil/Perfil.tsx";

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
		path: "/Curso",
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</React.StrictMode>
);
