interface TarjetaCursoProps {
	Name: string;
	Instructor: string;
	Dificultad: string;
	Horas: number;
	Img: string;
}

const handleCursoClick = () => {
	window.open("Cocina-usuario.html", "_self");
};

function TarjetaCurso({
	Name,
	Instructor,
	Dificultad,
	Horas,
	Img,
}: TarjetaCursoProps) {
	return (
		<div className="TarjetaCurso" onClick={handleCursoClick}>
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
			</div>
			<div className="cursoImagen">
				<img src={Img} alt="" width={"200px"} />
			</div>
		</div>
	);
}

export default TarjetaCurso;
