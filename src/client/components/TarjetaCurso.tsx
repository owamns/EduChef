import { Link } from "react-router-dom";

interface TarjetaCursoProps {
	Id: number;
	Name: string;
	Instructor: string;
	Dificultad: string;
	Horas: number;
	Img: string;
	Completado: boolean;
}

function TarjetaCurso({
	Id,
	Name,
	Instructor,
	Dificultad,
	Horas,
	Img,
	Completado,
}: TarjetaCursoProps) {
	const styles: { [key: string]: React.CSSProperties } = {
		calificacion: {
			backgroundColor: "#79C267",
			padding: "10px",
			width: "fit-content",
			borderRadius: "8px",
			fontWeight: "600",
		},
	};
	return (
		<Link to={`/curso/${Id}`}>
			<div className="TarjetaCurso">
				<div className="CursoInfo">
					<h4>{Name}</h4>
					<p>
						Instructor: <strong>{Instructor}</strong>
					</p>
					<p>
						Dificultad: <strong>{Dificultad}</strong>
					</p>
					<p>
						Horas: <strong>{Horas}</strong>
					</p>
					{Completado && (
						<p style={styles.calificacion}>COMPLETADO</p>
					)}
				</div>
				<div className="cursoImagen">
					<img src={Img} alt="" width={"200px"} />
				</div>
			</div>
		</Link>
	);
}

export default TarjetaCurso;
