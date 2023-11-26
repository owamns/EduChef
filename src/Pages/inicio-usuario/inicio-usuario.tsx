import "./inicio-usuario.css";
import DisplayCursos from "../../components/displayCursos";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import tarjetas from "../../assets/tarjetas";

function InicioUsuario() {
	const [alturaDisplayCursos, setAlturaDisplayCursos] =
		useState("fit-content");
	const [alturaCursos, setAlturaCursos] = useState("0px");

	useEffect(() => {
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
