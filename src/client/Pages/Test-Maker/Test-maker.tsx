import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Test-maker.css";
import axios from "axios";
const TestMaker = () => {
	const [preguntas, setPreguntas] = useState<
		{ pregunta: string; respuesta: string }[]
	>([]);

	const agregarPregunta = () => {
		setPreguntas([...preguntas, { pregunta: "", respuesta: "" }]);
	};
	const handleInputChange = (
		index: number,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = event.target;

		setPreguntas((prevPreguntas) => {
			const newPreguntas = [...prevPreguntas];
			newPreguntas[index] = { ...newPreguntas[index], [name]: value };
			return newPreguntas;
		});
	};

	const handleRemoveQuestion = (index: number) => {
		setPreguntas((prevPreguntas) =>
			prevPreguntas.filter((_, i) => i !== index)
		);
	};

	const enviarFormulario = async (event: any) => {
		event.preventDefault();
		try {
			const response = await axios.post("/api/enviar-preguntas", {
				preguntas,
			});

			console.log(response.data);

			setPreguntas([]);
		} catch (error) {
			console.error("Error al enviar las preguntas:", error);
		}
	};

	return (
		<div id="backgroundDivTestMaker">
			<nav id="TestMakerNav">
				<h3>Crear Test</h3>

				<div id="linksContainer">
					<Link to={"/home"} className="mr-3">
						Inicio
					</Link>
					<Link to={"/perfil"}>Perfil</Link>
				</div>
			</nav>
			<div className="BodyDivTestMaker">
				<main className="mainTestMaker">
					<h3>Preguntas</h3>
					{preguntas.map((item, index) => (
						<div key={index} className="preguntaContenedor">
							<i
								className="bi bi-x-circle"
								onClick={() => handleRemoveQuestion(index)}
							></i>
							<label htmlFor={`pregunta-${index}`}>
								Pregunta{" "}
								<input
									type="text"
									name="pregunta"
									placeholder="Ingresa la pregunta"
									className="TestMakerQuestion"
									id={`pregunta-${index}`}
									value={item.pregunta}
									onChange={(e) =>
										handleInputChange(index, e)
									}
								/>
							</label>

							<label htmlFor={`respuesta-${index}`}>
								Respuesta{" "}
								<input
									type="text"
									name="respuesta"
									placeholder="Ingresa la respuesta"
									className="TestMakerAnswer"
									id={`respuesta-${index}`}
									value={item.respuesta}
									onChange={(e) =>
										handleInputChange(index, e)
									}
								/>
							</label>
						</div>
					))}

					<button
						className="btn btn-secondary"
						onClick={agregarPregunta}
					>
						Agregar Pregunta
					</button>
					<button
						className="btn btn-primary"
						onClick={enviarFormulario}
					>
						Enviar
					</button>
				</main>
			</div>
		</div>
	);
};

export default TestMaker;
