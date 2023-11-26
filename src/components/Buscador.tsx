import { useState, ChangeEvent, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TarjetaCurso from "./TarjetaCurso";

interface BuscadorProps {
	tarjetas: {
		Name: string;
		Instructor: string;
		Dificultad: string;
		Horas: number;
		Img: string;
		Calificacion?: number;
	}[];
}

const SpeechRecognition = webkitSpeechRecognition;
const speech = new SpeechRecognition();
speech.onresult = (event) => {
	console.log(event);
};

function Buscador({ tarjetas }: BuscadorProps) {
	const [isListening, setIsListening] = useState(false);
	const [text, SetText] = useState("");
	const listen = () => {
		setIsListening(!isListening);
		if (isListening) {
			speech.stop();
		} else {
			speech.start();
		}
	};
	useEffect(() => {
		//handle if the browser does not support the Speech API
		if (!speech) {
			return;
		}
		speech.onresult = (event) => {
			console.log(event.results[event.results.length - 1][0].transcript);
			SetText(event.results[event.results.length - 1][0].transcript);
			setFiltro(event.results[event.results.length - 1][0].transcript);
		};
	}, []);

	const [filtro, setFiltro] = useState<string>("");

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFiltro(e.target.value);
	};

	const voiceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFiltro(text);
	};

	const tarjetasFiltradas = tarjetas.filter((tarjeta) =>
		tarjeta.Name.toLowerCase().includes(filtro.toLowerCase())
	);

	return (
		<>
			<div className="search">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-search"
					viewBox="0 0 16 16"
				>
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
				</svg>
				<input
					type="search"
					placeholder="Buscar por título"
					id="searchInput"
					value={filtro}
					onChange={handleInputChange}
				/>
				<span onClick={listen}>
					<i className="bi bi-mic"></i>
				</span>
			</div>
			<TransitionGroup className="childrenContainer">
				{tarjetasFiltradas.map((tarjeta, index) => (
					<CSSTransition
						key={index}
						timeout={500}
						classNames="tarjeta"
					>
						<TarjetaCurso
							Name={tarjeta.Name}
							Instructor={tarjeta.Instructor}
							Horas={tarjeta.Horas}
							Dificultad={tarjeta.Dificultad}
							Img={tarjeta.Img}
							Calificacion={tarjeta.Calificacion}
						/>
					</CSSTransition>
				))}
			</TransitionGroup>
		</>
	);
}

export default Buscador;
