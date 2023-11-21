import "./Cocina-usuario.css";
import { useState } from "react";
import ListGroup from "../../components/ListGroup";
import Test from "../Test/Test";
const items = [
	"1. Introducción",
	"2. Lomo Saltado",
	"3. Causas",
	"4. Asado con puré",
];
const handleSelectItem = (item: string) => {
	console.log(item);
};

const CocinaUsuario = () => {
	const [TestChecked, SetTestCheck] = useState(true);
	const handleRadioCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
		SetTestCheck(!event.target.checked);
	};
	return (
		<div className="backgroundDiv">
			<nav>
				<h3>Gastronomía de la costa</h3>

				<a href="inicio-usuario.html" className="mr-3">
					Inicio
				</a>
				<a href="#" className="mr-1">
					Cocina
				</a>
				<a href="">Perfil</a>
			</nav>
			<div className="BodyDiv">
				{TestChecked ? (
					<main>
						<div className="videoContainer">
							<iframe
								src="https://www.youtube.com/embed/9dbDFWhF6GU"
								title="TE ENSEÑO A PREPARAR EL MEJOR ASADO CON PURÉ | GIACOMO BOCCHIO"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							></iframe>
						</div>
						<div className="Opciones">
							<ul>
								<li>
									<strong>Descripción</strong>
								</li>
								<li>Comentario</li>
								<li>Notas</li>
								<li>Ayuda</li>
							</ul>
							<hr></hr>
						</div>
					</main>
				) : (
					<main>
						<Test></Test>
					</main>
				)}

				<aside>
					<ListGroup
						heading="Contenido del curso"
						items={items}
						onSelectedItem={handleSelectItem}
					></ListGroup>
					<div className="border border-primary">
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="flexCheckDefault"
								checked
							/>
							<label
								className="form-check-label"
								htmlFor="flexCheckDefault"
							>
								Preparación
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="flexCheckChecked"
								onChange={handleRadioCheck}
							/>
							<label
								className="form-check-label"
								htmlFor="flexCheckChecked"
							>
								Test
							</label>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
};

export default CocinaUsuario;
