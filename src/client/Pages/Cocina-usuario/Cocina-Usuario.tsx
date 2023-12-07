import "./Cocina-usuario.css";
import { useState, useEffect } from "react";
import ListGroup from "../../components/ListGroup.js";
import Test from "../Test/Test.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "axios";

const handleSelectItem = (item: string) => {
	console.log(item);
};

const CocinaUsuario = () => {
	const params = useParams();
	const [recetas, setReceta] = useState([]);
	const [video, setVideo] = useState("");

	useEffect(() => {
		const fetchRecetas = async () => {
			try {
				const response = await axios.get(`/recetas/${params.id}`);
				console.log(response.data);
				const r = response.data.map((v: any) => {
					return v.Nombre.trim();
				});
				setReceta(r);
			} catch (error) {
				console.error("Error al obtener los cursos: ", error);
			}
		};
		const fetchVideo = async () => {
			try {
				const response = await axios.get(`/videos/${params.id}`);
				console.log("response.data: ", response.data[0].Video);
				setVideo(response.data[0].Video);
			} catch (error) {
				console.error("Error al obtener los cursos: ", error);
			}
		};
		fetchRecetas();
		fetchVideo();
	}, []);

	const [TestChecked, SetTestCheck] = useState(true);
	const handleTestClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		SetTestCheck(!event.target.checked);
	};
	return (
		<div id="backgroundDivCocinaUser">
			<nav id="CocinaUserNav">
				<h3>Gastronomía de la costa</h3>

				<div id="linksContainer">
					<Link to={"/home"} className="mr-3">
						Inicio
					</Link>
					<Link to={"/perfil"}>Perfil</Link>
				</div>
			</nav>
			<div id="BodyDivCocinaUser">
				{TestChecked ? (
					<main id="CocinaUserDiv">
						<div className="videoContainer">
							<iframe
								src={video}
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
					<main id="CocinaUserDiv">
						<Test id={params.id}></Test>
					</main>
				)}

				<aside>
					<ListGroup
						heading="Contenido del curso"
						items={recetas}
						onTestClick={handleTestClick}
					></ListGroup>
				</aside>
			</div>
		</div>
	);
};

export default CocinaUsuario;
