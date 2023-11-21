import "./inicio-usuario.css";
import BusquedaPorVoz from "../../components/busquedaPorVoz";
import DisplayCursos from "../../components/displayCursos";
import TarjetaCurso from "../../components/TarjetaCurso";
function InicioUsuario() {
	return (
		<div className="backgroundDiv">
			<nav>
				<a href="#" className="mr-3">
					Inicio
				</a>
				<a href="#" className="mr-1">
					Cocina
				</a>
				<a href="">Perfil</a>
			</nav>
			<main>
				<div className="TituloModulo">
					<h1>Busqueda de Modulos</h1>
				</div>
				<div className="Contenido">
					<BusquedaPorVoz></BusquedaPorVoz>
					<DisplayCursos>
						<TarjetaCurso
							Name="Curso Gastronomía De La Costa"
							Instructor="Giacomo Bocchio"
							Horas={6.5}
							Dificultad="Baja"
							Img="http://localhost:5173/recursos/CocinaCosta.jpg"
						></TarjetaCurso>
						<TarjetaCurso
							Name="Curso Cocina Mexicana"
							Instructor="Ricardo Muñoz"
							Dificultad="Media"
							Horas={8}
							Img="http://localhost:5173/recursos/CocinaMexicana.jpg"
						></TarjetaCurso>
						<TarjetaCurso
							Name="Curso de Parrilla"
							Instructor="Joaquín Bernal"
							Dificultad="Media alta"
							Horas={10}
							Img="http://localhost:5173/recursos/CursoParrilla.jpg"
						></TarjetaCurso>
					</DisplayCursos>
				</div>
			</main>
		</div>
	);
}

export default InicioUsuario;
