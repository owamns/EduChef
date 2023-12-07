import DisplayCursos from "../../components/displayCursos.js";
import "./Perfil.css";
import { Link } from "react-router-dom";
import cursosSubidos from "../../assets/cursosSubidos.js";
import { useEffect, useState } from "react";
import axios from "axios";

function Perfil() {
	const [cursosCompletados, setCursosCompletados] = useState([]);
	const [cursosSubidos, setCursosSubidos] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/cursos-completados");
				setCursosCompletados(response.data);

				const response2 = await axios.get("/cursos-subidos");
				setCursosSubidos(response2.data);
			} catch (error) {
				console.error("Error al obtener los cursos: ", error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="backgroundDivPerfilUser">
			<nav id="navProfileUser">
				<h3>EduChef</h3>
				<div id="linksContainer">
					<Link to={"/home"} className="mr-3">
						Inicio
					</Link>
					<Link to={"/perfil"}>Perfil</Link>
				</div>
			</nav>
			<div id="displayCursosDiv">
				<DisplayCursos
					altura="100%"
					alturaCursos="Fit-Content"
					header="Cursos completados"
					items={cursosCompletados}
				></DisplayCursos>
				<DisplayCursos
					altura="100%"
					alturaCursos="Fit-Content"
					header="Cursos subidos"
					items={cursosSubidos}
				></DisplayCursos>
			</div>
			<footer id="profileFooter">
				<div className="cargarContenido">
					<Link to={"/SubirContenido"}>Cargar Contenido</Link>
				</div>
			</footer>
		</div>
	);
}

export default Perfil;
