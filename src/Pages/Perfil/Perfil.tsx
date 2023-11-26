import DisplayCursos from "../../components/displayCursos";

import "./Perfil.css";
import { Link } from "react-router-dom";
import cursosCompletados from "../../assets/cursosCompletados";
import cursosSubidos from "../../assets/cursosSubidos";

function Perfil() {
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
