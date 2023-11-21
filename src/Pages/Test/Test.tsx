import "./Test.css";

const Test = () => {
	return (
		<div className="TestContainer">
			<header>
				<h3>ASADO CON PURÉ</h3>
				<h6>Test 1</h6>
			</header>
			<section>
				<label htmlFor="question1">
					1. ¿Qué tipo de carne es la más recomendada al momento de
					preparar un asado con puré?
				</label>
				<input
					type="text"
					name=""
					id="question1"
					placeholder="Ingrese su respuesta aquí"
				/>
				<label htmlFor="question2">
					2. ¿Cuánto es el tiempo recomendado en el que se debe
					cocinar el asado para que quede bien hecho?
				</label>
				<input
					type="text"
					name=""
					id="question2"
					placeholder="Ingrese su respuesta aquí"
				/>
				<label htmlFor="question3">
					3. ¿Cuál es la técnica ideal para que el puré de papas quede
					cremoso y sin grumos?
				</label>
				<input
					type="text"
					name=""
					id="question3"
					placeholder="Ingrese su respuesta aquí"
				/>
				<label htmlFor="question4">
					4. ¿Qué tipo de carne es la más recomendada al momento de
					preparar un asado con puré?
				</label>
				<input
					type="text"
					name=""
					id="question4"
					placeholder="Ingrese su respuesta aquí"
				/>
			</section>
		</div>
	);
};

export default Test;
