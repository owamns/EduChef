import { constants } from "buffer";
import "./Test.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

interface TestProps {
	id: string | undefined;
}

interface pregunta {
	indice: string;
	question: string;
	answer: string;
}

const Test = ({ id }: TestProps) => {
	const [preguntas, setPreguntas] = useState([
		{
			indice: "1",
			question: "",
			answer: "",
		},
	]);

	const params = useParams();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`/preguntas/${params.id}`);
				console.log("response.data: ", response.data);
				setPreguntas(response.data);
				console.log("preguntas: ", preguntas);
			} catch (error) {
				console.error("Error al obtener preguntas: ", error);
			}
		};
		fetchData();
	}, []);

	const qu = [
		{
			indice: "1",
			question:
				"¿Qué tipo de carne es la más recomendada al momento de preparar un asado con puré?",
			answer: "lomo",
		},
		{
			indice: "2",
			question:
				"¿Cuánto es el tiempo recomendado en el que se debe cocinar el asado para que quede bien hecho?",
			answer: "2 horas",
		},
		{
			indice: "3",
			question:
				"¿Cuál es la técnica ideal para que el puré de papas quede cremoso y sin grumos?",
			answer: "mucha mantequilla",
		},
		{
			indice: "4",
			question:
				"¿Qué tipo de carne es la más recomendada al momento de preparar un asado con puré?",
			answer: "lomo",
		},
	];

	type ObjetoPreguntas = {
		[K in `question${(typeof qu)[number]["indice"]}`]: (typeof qu)[number]["question"];
	};

	const obj: ObjetoPreguntas = {} as ObjetoPreguntas;

	// preguntas.forEach((pregunta) => {
	// 	const key = `question${pregunta.indice}` as const;
	// 	obj[key] = "";
	// });

	console.log(obj);

	const [formState, setFormState] = useState(obj);
	const isFormValid = () => {
		return Object.values(formState);
	};

	const handleAnswerChange = (event: any) => {
		const isValid = event.target.value.trim() == event.target.name.trim();
		setFormState((prevState) => ({
			...prevState,
			[event.target.id]: isValid,
		}));
		console.log(formState);
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		console.log(isFormValid());
		if (isFormValid()) {
			Swal.fire({
				title: "Buen trabajo!",
				text: "Test aprobado",
				icon: "success",
			});
			const response = await axios.post(`/curso/${id}/enviar-formulario`);
			console.log(response);
		} else {
			Swal.fire({
				title: "Error",
				text: "Hay preguntas incompletas o mal respondidas",
				icon: "error",
			});
		}
	};
	return (
		<div className="TestContainer">
			<header>
				<h3>ASADO CON PURÉ</h3>
				<h6>Test 1</h6>
			</header>
			<form onSubmit={handleSubmit} className="TestForm">
				{preguntas.map((item) => (
					<>
						<label
							key={item.indice}
							htmlFor={`question${item.indice}`}
						>
							{item.indice}. {item.question}
						</label>
						<input
							type="text"
							id={`question${item.indice}`}
							name={item.answer}
							placeholder={item.answer.trim().replace(/./g, "*")}
							onKeyDown={handleAnswerChange}
							style={{
								border: `2px solid ${
									formState[`question${item.indice}`] === ""
										? ""
										: formState[`question${item.indice}`]
										? "green"
										: "red"
								}`,
								background: `${
									formState[`question${item.indice}`] === ""
										? ""
										: formState[`question${item.indice}`]
										? "rgba(0, 255, 0, 0.1)"
										: "rgba(255, 0, 0, 0.1)"
								}`,
							}}
						></input>
					</>
				))}
				{/* <label htmlFor="question1">
					1. ¿Qué tipo de carne es la más recomendada al momento de
					preparar un asado con puré?
				</label>
				<input
					type="text"
					name="lomo"
					id="question1"
					placeholder="****"
					onChange={handleAnswerChange}
					style={{
						border: `2px solid ${
							formState.question1 === ""
								? ""
								: formState.question1
								? "green"
								: "red"
						}`,
						background: `${
							formState.question1 === ""
								? ""
								: formState.question1
								? "rgba(0, 255, 0, 0.1)"
								: "rgba(255, 0, 0, 0.1)"
						}`,
					}}
				/>
				<label htmlFor="question2">
					2. ¿Cuánto es el tiempo recomendado en el que se debe
					cocinar el asado para que quede bien hecho?
				</label>
				<input
					type="text"
					name="2 horas"
					id="question2"
					placeholder="* *****"
					onChange={handleAnswerChange}
					style={{
						border: `2px solid ${
							formState.question2 === ""
								? ""
								: formState.question2
								? "green"
								: "red"
						}`,
						background: `${
							formState.question2 === ""
								? ""
								: formState.question2
								? "rgba(0, 255, 0, 0.1)"
								: "rgba(255, 0, 0, 0.1)"
						}`,
					}}
				/>
				<label htmlFor="question3">
					3. ¿Cuál es la técnica ideal para que el puré de papas quede
					cremoso y sin grumos?
				</label>
				<input
					type="text"
					name="mucha mantequilla"
					id="question3"
					placeholder="***** ***********"
					onChange={handleAnswerChange}
					style={{
						border: `2px solid ${
							formState.question3 === ""
								? ""
								: formState.question3
								? "green"
								: "red"
						}`,
						background: `${
							formState.question3 === ""
								? ""
								: formState.question3
								? "rgba(0, 255, 0, 0.1)"
								: "rgba(255, 0, 0, 0.1)"
						}`,
					}}
				/>
				<label htmlFor="question4">
					4. ¿Qué tipo de carne es la más recomendada al momento de
					preparar un asado con puré?
				</label>
				<input
					type="text"
					name="lomo"
					id="question4"
					placeholder="****"
					onChange={handleAnswerChange}
					style={{
						border: `2px solid ${
							formState.question4 === ""
								? ""
								: formState.question4
								? "green"
								: "red"
						}`,
						background: `${
							formState.question4 === ""
								? ""
								: formState.question4
								? "rgba(0, 255, 0, 0.1)"
								: "rgba(255, 0, 0, 0.1)"
						}`,
					}}
				/> */}
				<div className="btnContainer">
					<button type="submit" className="btn btn-primary">
						Enviar
					</button>
					<button type="reset" className="btn btn-secondary">
						Limpiar
					</button>
				</div>
			</form>
		</div>
	);
};

export default Test;
function trim() {
	throw new Error("Function not implemented.");
}
