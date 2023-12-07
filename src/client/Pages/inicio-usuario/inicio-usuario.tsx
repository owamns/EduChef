import "./inicio-usuario.css";
import DisplayCursos from "../../components/displayCursos.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function InicioUsuario() {
	const [alturaDisplayCursos, setAlturaDisplayCursos] =
		useState("fit-content");
	const [alturaCursos, setAlturaCursos] = useState("0px");
	const [tarjetas, setTarjeta] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/cursos");
				console.log(response.data);
				setTarjeta(response.data);
			} catch (error) {
				console.error("Error al obtener los cursos: ", error);
			}
		};
		fetchData();

		const BusquedaPorVozHeight = (
			document.querySelector(".BusquedaPorVozContainer") as HTMLElement
		)?.offsetHeight;
		const CursosHeight =
			BusquedaPorVozHeight -
			((document.querySelector(".header") as HTMLElement)?.offsetHeight +
				(document.querySelector(".search") as HTMLElement)
					?.offsetHeight);
		if (BusquedaPorVozHeight) {
			setAlturaDisplayCursos(`${BusquedaPorVozHeight}px`);
		}
		if (CursosHeight) {
			setAlturaCursos(`${CursosHeight}px`);
		}
	}, []);

	return (
		<div id="backgroundDivHomeUser">
			<nav id="navHomeUser">
				<h3>EduChef</h3>
				<div id="linksContainer">
					<Link to={"/home"} className="mr-3">
						Inicio
					</Link>
					<Link to={"/perfil"}>Perfil</Link>
				</div>
			</nav>
			<main id="mainHomeUser">
				<DisplayCursos
					altura={alturaDisplayCursos}
					alturaCursos={alturaCursos}
					header="cursos"
					items={tarjetas}
				></DisplayCursos>
			</main>
		</div>
	);
}

export default InicioUsuario;
