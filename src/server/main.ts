import express from "express";
import ViteExpress from "vite-express";
import sql from "mssql";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();
const app = express();
const PORT = 3000;

cloudinary.config({
	cloud_name: "dotzuup10",
	api_key: "316451932145233",
	api_secret: process.env.CLD_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage(); // Almacenar la imagen en memoria
const upload = multer({ storage: storage });

const dbSettings = {
	user: "AGallo",
	password: "262312",
	server: "localhost",
	database: "eduChef",
	options: {
		encrypt: false,
		trustServerCertificate: true,
	},
};

async function getConnection() {
	try {
		const pool = await sql.connect(dbSettings);
		return pool;
	} catch (error) {
		console.error("error en getConnection: ", error);
	}
}
getConnection();

app.get("/hello", (_, res) => {
	res.send("Hello Vite + React + TypeScript!");
});

app.get("/cursos", async (req, res) => {
	try {
		const pool = await sql.connect(dbSettings);
		const result = await pool.request().query("SELECT * FROM cursos");
		res.json(result.recordset);
	} catch (error: any) {
		console.error("Error al obtener los cursos:", error.message);
		res.status(500).send("Error interno del servidor");
	}
});

app.get("/recetas/:id_curso", async (req, res) => {
	try {
		const { id_curso } = req.params;
		const pool = await sql.connect(dbSettings);
		const result = await pool
			.request()
			.input("id_curso", sql.Int, id_curso)
			.query("SELECT * FROM Recetas WHERE Id_Curso=@id_curso");
		res.json(result.recordset);
	} catch (error: any) {
		console.log("error al obtener las recetas del curso: ", error.message);
		res.status(500).send("Error interno del servidor");
	}
});

app.get("/videos/:id_curso", async (req, res) => {
	try {
		const { id_curso } = req.params;
		const pool = await sql.connect(dbSettings);
		const result = await pool
			.request()
			.input("id_curso", sql.Int, id_curso)
			.query("SELECT Video FROM Cursos WHERE Id=@id_curso");
		res.json(result.recordset);
	} catch (error: any) {
		console.log("error al obtener las recetas del curso: ", error.message);
		res.status(500).send("Error interno del servidor");
	}
});

app.post("/curso/:id_curso/enviar-formulario", async (req, res) => {
	const { id_curso } = req.params;

	try {
		const pool = await sql.connect(dbSettings);
		await pool
			.request()
			.input("id_curso", sql.Numeric, id_curso)
			.query("UPDATE Cursos SET Completado = 1 WHERE Id = @id_curso");
		res.status(200).send("Formulario enviado correctamente");
	} catch (error: any) {
		console.error(
			"Error al enviar el formulario y actualizar la tabla Cursos:",
			error.message
		);
		res.status(500).send("Error interno del servidor");
	}
});

app.post(
	"/subir-contenido",
	upload.fields([
		{ name: "Imagen", maxCount: 1 },
		{ name: "Video", maxCount: 1 },
	]),
	async (req: any, res) => {
		try {
			const { Titulo, Description, Dificultad, Img, Video } = req.body;

			console.log("req: ", req.body);

			const query = `
			  INSERT INTO Cursos (Name, Description, Dificultad, Img, Video, Horas, Instructor)
			  VALUES (@Titulo, @Description, @Dificultad, @Img, @Video, 7, 'Tú')
			`;
			const pool: any = await getConnection();

			await pool
				.request()
				.input("Titulo", sql.NVarChar, Titulo)
				.input("Description", sql.NVarChar, Description)
				.input("Dificultad", sql.NVarChar, Dificultad)
				.input("Img", sql.VarChar, Img)
				.input("Video", sql.VarChar, Video)
				.query(query);

			res.status(200).send("Contenido subido exitosamente");
		} catch (error) {
			console.error("Error al procesar y subir contenido:", error);
			res.status(500).send("Error interno del servidor");
		}
	}
);

app.post("/subir-contenido-recetas", async (req: any, res) => {
	try {
		const pool = await sql.connect(dbSettings);

		const resultCurso = await pool
			.request()
			.query("SELECT TOP 1 Id FROM Cursos ORDER BY Id DESC");
		const ultimoIdCurso = resultCurso.recordset[0].Id;
		console.log("ultimoIdCurso:", ultimoIdCurso);
		for (const receta of req.body) {
			const { nombre, cantidad } = receta;
			await pool
				.request()
				.input("nombre", sql.VarChar(255), nombre)
				.input("horas", sql.Float, parseFloat(cantidad))
				.input("id_curso", sql.Int, ultimoIdCurso)
				.query(
					"INSERT INTO Recetas (Nombre, Horas, id_curso) VALUES (@nombre, @horas, @id_curso)"
				);
		}

		res.status(200).send("Contenido subido exitosamente");
	} catch (error) {
		console.error("Error al procesar y subir contenido:", error);
		res.status(500).send("Error interno del servidor");
	}
});

app.get("/cursos-completados", async (req, res) => {
	try {
		const pool = await sql.connect(dbSettings);
		const result = await pool
			.request()
			.query("SELECT * FROM cursos WHERE Completado=1");
		res.json(result.recordset);
	} catch (error) {
		console.error("Error al procesar y subir contenido:", error);
		res.status(500).send("Error interno del servidor");
	}
});

app.get("/cursos-subidos", async (req, res) => {
	try {
		const pool = await sql.connect(dbSettings);
		const result = await pool
			.request()
			.query("SELECT * FROM cursos WHERE Instructor='Tú'");
		res.json(result.recordset);
	} catch (error) {
		console.error("Error al procesar y subir contenido:", error);
		res.status(500).send("Error interno del servidor");
	}
});

app.post("/api/enviar-preguntas", async (req, res) => {
	const { preguntas } = req.body;
	try {
		// Obtener el id_curso del último curso (esto puede variar según tu estructura de base de datos)
		const result =
			await sql.query`SELECT TOP 1 Id FROM Cursos ORDER BY Id DESC`;
		const id_curso = result.recordset[0].Id;

		// Insertar cada pregunta en la base de datos
		for (const [index, pregunta] of preguntas.entries()) {
			await sql.query`INSERT INTO Preguntas (indice, question, answer, id_curso) VALUES (${
				index + 1
			}, ${pregunta.pregunta}, ${pregunta.respuesta}, ${id_curso})`;
		}

		// Enviar una respuesta al cliente
		res.json({ mensaje: "Preguntas enviadas con éxito" });
	} catch (error) {
		console.error("Error al procesar y subir preguntas:", error);
		res.status(500).send("Error interno del servidor");
	}
});

app.get("/preguntas/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const pool = await sql.connect(dbSettings);
		const result = await pool
			.request()
			.input("id_curso", sql.Int, id)
			.query("SELECT * FROM Preguntas WHERE Id_Curso=@id_curso");
		res.json(result.recordset);
	} catch (error: any) {
		console.log("error al obtener las recetas del curso: ", error.message);
		res.status(500).send("Error interno del servidor");
	}
});

ViteExpress.listen(app, PORT, () =>
	console.log(`Server is listening on port ${PORT}...`)
);
