import { Link } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from "react";
import "./subirContenido.css";
import axios from "axios";
import Swal from "sweetalert2";
const SubirContenido = () => {
	const redirectSwal = () => {
		Swal.fire({
			title: "Éxito",
			html: "El curso ha sido guardado con éxito. Redireccionando al perfil.",
			timer: 4000,
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading();
			},
		}).then((result) => {
			if (result.dismiss === Swal.DismissReason.timer) {
				window.open("/realizarTest", "_self");
			}
		});
	};
	const CLOUDINARY_URL_video =
		"https://api.cloudinary.com/v1_1/dotzuup10/video/upload";
	const CLOUDINARY_URL_Image =
		"https://api.cloudinary.com/v1_1/dotzuup10/image/upload";
	const CLOUDINARY_UP_PRESET = "yl93owff";

	const [cantidadIngredientes, setCantidadIngredientes] = useState(1);
	const [ingredientes, setIngredientes] = useState([
		{ nombre: "", cantidad: "" },
	]);
	const [imagen, setImagen] = useState("");
	const [video, setVideo] = useState("");
	const [titulo, setTitulo] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [dificultad, setDificultad] = useState("");
	const [cargando, setCargando] = useState<boolean>(false);

	const handleTitleChange = (e: any) => {
		const nuevotitulo = e.target.value;
		setTitulo(nuevotitulo);
	};
	const handleDescriptionChange = (e: any) => {
		const nuevaDescription = e.target.value;
		setDescripcion(nuevaDescription);
	};
	const handleDificultadeChange = (e: any) => {
		const nuevaDificultad = e.target.value;
		setDificultad(nuevaDificultad);
	};

	const handleCantidadIngredientesChange = (e: any) => {
		const nuevaCantidad = parseInt(e.target.value, 10) || 1;
		setCantidadIngredientes(nuevaCantidad);

		const nuevosIngredientes = Array.from(
			{ length: nuevaCantidad },
			(_, i) => ingredientes[i] || { nombre: "", cantidad: "" }
		);
		setIngredientes(nuevosIngredientes);
	};

	const handleNombreIngredienteChange = (i: any, e: any) => {
		const nuevosIngredientes = [...ingredientes];
		nuevosIngredientes[i].nombre = e.target.value;
		setIngredientes(nuevosIngredientes);
	};

	const handleCantidadIngredienteChange = (i: any, e: any) => {
		const nuevosIngredientes = [...ingredientes];
		nuevosIngredientes[i].cantidad = e.target.value;
		setIngredientes(nuevosIngredientes);
	};

	const handleEliminarIngrediente = (i: any) => {
		const nuevosIngredientes = [...ingredientes];
		nuevosIngredientes.splice(i, 1);
		setIngredientes(nuevosIngredientes);
		setCantidadIngredientes(cantidadIngredientes - 1);

		if (nuevosIngredientes.length === 0) {
			setCantidadIngredientes(1);
		}
	};

	const handleImagenSeleccionada = async (e: any) => {
		const file = e.target.files[0];

		try {
			setCargando(true);
			const formdata = new FormData();
			formdata.append("file", file);
			formdata.append("upload_preset", CLOUDINARY_UP_PRESET);

			const res = await axios.post(CLOUDINARY_URL_Image, formdata, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setImagen(res.data.secure_url);
		} catch (error) {
			console.error(error);
		} finally {
			setCargando(false);
		}
	};

	const handleVideoSeleccionado = async (e: any) => {
		const file = e.target.files[0];

		try {
			setCargando(true);
			const formdata = new FormData();
			formdata.append("file", file);
			formdata.append("upload_preset", CLOUDINARY_UP_PRESET);

			const res = await axios.post(CLOUDINARY_URL_video, formdata, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log(res.data);
			setVideo(res.data.url);
		} catch (error) {
			console.error(error);
		} finally {
			setCargando(false);
		}
	};

	const handleSubmitContenido = async (event: any) => {
		event.preventDefault();
		try {
			const formDataContenido = new FormData();
			formDataContenido.append("Titulo", titulo);
			formDataContenido.append("Description", descripcion);
			formDataContenido.append("Dificultad", dificultad);
			formDataContenido.append("Img", imagen);
			formDataContenido.append("Video", video);
			console.log("FORMDATA: ", formDataContenido);
			const response = await axios.post(
				"/subir-contenido",
				formDataContenido
			);
			const response2 = await axios.post(
				"/subir-contenido-recetas",
				ingredientes
			);
			console.log("Contenido subido exitosamente:", response.data);
			redirectSwal();
		} catch (error: any) {
			console.error("Error al subir contenido:", error.message);
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
			<form
				id="SC-Main"
				method="POST"
				encType="multipart/form-data"
				onSubmit={handleSubmitContenido}
			>
				<div className="SC-Contenido" id="DatosGeneralesCurso">
					<label htmlFor="Titulo">
						Título
						<input
							type="text"
							name="Titulo"
							onChange={handleTitleChange}
							required
						/>
					</label>
					<label htmlFor="Imagen">
						Portada
						<input
							id="ImgInput"
							type="file"
							accept="image/png, image/jpeg"
							name="Imagen"
							onChange={handleImagenSeleccionada}
							required
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
						<textarea
							name="Description"
							id=""
							rows={3}
							onChange={handleDescriptionChange}
						></textarea>
					</label>
					<label htmlFor="Dificultad">
						Nivel de dificultad{" "}
						<select
							name="Dificultad"
							id="Dificultad"
							onChange={handleDificultadeChange}
							required
						>
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
						Número de Recetas
						<input
							type="number"
							min="1"
							max="5"
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
									placeholder="Nombre de la receta"
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
									placeholder="Horas de preparación"
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
						Cargar Video Introductorio{" "}
						<input
							type="file"
							name="Video"
							id="videoInput"
							accept="video/*"
							onChange={handleVideoSeleccionado}
							required
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
					<button className="btn btn-secondary" type="reset">
						Cancelar
					</button>
					<button className="btn btn-primary" type="submit">
						Listo
					</button>
				</div>
			</form>
			{cargando && (
				<div className="cargando-overlay">
					<div className="spinner-border text-light" role="status">
						<span className="visually-hidden">Cargando...</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default SubirContenido;
