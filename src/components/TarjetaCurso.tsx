import { Link } from "react-router-dom";

interface TarjetaCursoProps {
	Name: string;
	Instructor: string;
	Dificultad: string;
	Horas: number;
	Img: string;
	Calificacion?: number;
}

function TarjetaCurso({
	Name,
	Instructor,
	Dificultad,
	Horas,
	Img,
	Calificacion,
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
		<Link to={"/curso"}>
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
					{Calificacion && (
						<p style={styles.calificacion}>
							Calificación: <strong>{Calificacion}</strong>
						</p>
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
