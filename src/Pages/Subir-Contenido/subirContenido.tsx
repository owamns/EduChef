import { Link } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import react, { useState } from "react";
import "./subirContenido.css";

const SubirContenido = () => {
	const [cantidadIngredientes, setCantidadIngredientes] = useState(1);
	const [ingredientes, setIngredientes] = useState([
		{ nombre: "", cantidad: "" },
	]);

	const handleCantidadIngredientesChange = (e) => {
		const nuevaCantidad = parseInt(e.target.value, 10) || 1;
		setCantidadIngredientes(nuevaCantidad);

		const nuevosIngredientes = Array.from(
			{ length: nuevaCantidad },
			(_, i) => ingredientes[i] || { nombre: "", cantidad: "" }
		);
		setIngredientes(nuevosIngredientes);
	};

	const handleNombreIngredienteChange = (i, e) => {
		const nuevosIngredientes = [...ingredientes];
		nuevosIngredientes[i].nombre = e.target.value;
		setIngredientes(nuevosIngredientes);
	};

	const handleCantidadIngredienteChange = (i, e) => {
		const nuevosIngredientes = [...ingredientes];
		nuevosIngredientes[i].cantidad = e.target.value;
		setIngredientes(nuevosIngredientes);
	};

	const handleEliminarIngrediente = (i) => {
		const nuevosIngredientes = [...ingredientes];
		nuevosIngredientes.splice(i, 1);
		setIngredientes(nuevosIngredientes);

		if (nuevosIngredientes.length === 0) {
			setCantidadIngredientes(1);
		}
	};

	const [imagen, setImagen] = useState("");

	const handleImagenSeleccionada = (e) => {
		const archivo = e.target.files[0];

		if (archivo) {
			const objetoURL = URL.createObjectURL(archivo);
			setImagen(objetoURL);
		}
	};

	const [video, SetVideo] = useState("");

	const handleVideoSeleccionado = (e) => {
		const archivo = e.target.files[0];

		if (archivo) {
			const videoURL = URL.createObjectURL(archivo);
			SetVideo(videoURL);
		}
	};

	return (
		<div id="SC-bg">
			<nav id="SC-nav">
				<h3>EduChef</h3>
				<div id="linksContainer">
					<Link to={"/home"} className="mr-3">
						Inicio
					</Link>
					<Link to={"/perfil"}>Perfil</Link>
				</div>
			</nav>
			<header id="SCHeader">
				<div className="infoDeUser">
					<i className="bi bi-person-circle"></i>
					<p>Nombre de Usuario</p>
					<i className="bi bi-gear"></i>
				</div>
			</header>
			<form id="SC-Main" action="#">
				<div className="SC-Contenido" id="DatosGeneralesCurso">
					<label htmlFor="Titulo">
						Título
						<input type="text" name="Titulo" />
					</label>
					<label htmlFor="Imagen">
						Portada
						<input
							id="ImgInput"
							type="file"
							accept="image/png, image/jpeg"
							name="Imagen"
							onChange={handleImagenSeleccionada}
						/>
						{imagen && (
							<div id="imgContainer">
								<img
									src={imagen}
									alt="previsualizacion"
									width="100%"
								/>
							</div>
						)}
					</label>

					<label htmlFor="Description">
						Descripción del curso
						<textarea name="Description" id="" rows="3"></textarea>
					</label>
					<label htmlFor="Dificultad">
						Nivel de dificultad{" "}
						<select name="Dificultad" id="Dificultad">
							<option value="none" disabled hidden selected>
								Seleccione un valor
							</option>
							<option value="Facil">Fácil</option>
							<option value="Medio">Medio</option>
							<option value="Dificil">Dificil</option>
							<option value="Experto">Experto</option>
						</select>
					</label>
				</div>

				<div className="SC-Contenido" id="IngredientesCurso">
					<label htmlFor="cantidad de Ingredientes">
						Cantidad de ingredientes
						<input
							type="number"
							min="1"
							max="15"
							id="CantIngredientes"
							value={cantidadIngredientes}
							onChange={handleCantidadIngredientesChange}
						/>
					</label>
					<div id="ingredientesContainer">
						{ingredientes.map((ingrediente, index) => (
							<div key={index} className="ContenedoDeIngrediente">
								<input
									type="text"
									placeholder="Nombre del ingrediente"
									value={ingrediente.nombre}
									onChange={(event) =>
										handleNombreIngredienteChange(
											index,
											event
										)
									}
								/>
								<input
									type="text"
									placeholder="Cantidad"
									id="cantidadIngrediente"
									value={ingrediente.cantidad}
									onChange={(event) =>
										handleCantidadIngredienteChange(
											index,
											event
										)
									}
								/>
								<i
									className="bi bi-x-circle"
									onClick={() =>
										handleEliminarIngrediente(index)
									}
								></i>
							</div>
						))}
					</div>
				</div>
				<div className="SC-Contenido" id="MultimediaCurso">
					<label htmlFor="Video" id="VideoLabel">
						Cargar Video{" "}
						<input
							type="file"
							name="Video"
							id="videoInput"
							accept="video/*"
							onChange={handleVideoSeleccionado}
						/>
						<span>
							<i className="bi bi-file-earmark-play"></i>
						</span>
					</label>
					{video && (
						<div id="videoContainer">
							<video controls width="100%" src={video}></video>
						</div>
					)}
				</div>
				<div id="BtnGroup">
					<button className="btn btn-secundary" type="reset">
						Cancelar
					</button>
					<button className="btn btn-primary" type="submit">
						Listo
					</button>
				</div>
			</form>
		</div>
	);
};

export default SubirContenido;
