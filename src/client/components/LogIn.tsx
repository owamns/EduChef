import "./LogInStyles.css";
import { Link } from "react-router-dom";
const LogIn = () => {
	return (
		<main className="MainContainer">
			<div className="LogInContainer">
				<h1 className="mb-4">Bienvenido</h1>
				<div className="Credenciales">
					<div className="mb-3">
						<form>
							<label htmlFor="EmailLabel" className="form-label">
								Ingresa tu correo
							</label>
							<input
								type="email"
								name=""
								id="EmailLabel"
								className="form-control"
								aria-describedby="emailHelp"
							/>
							<div id="emailHelp" className="form-text">
								Nunca compartiremos tu información con nadie.
							</div>
						</form>
					</div>
					<div className="mb-4">
						<form>
							<label
								htmlFor="PasswordLabel"
								className="form-label"
							>
								Ingresa tu contraseña
							</label>
							<input
								type="password"
								name=""
								id="PasswordLabel"
								className="form-control"
							/>
						</form>
					</div>
				</div>
				<div className="Botones">
					<Link to={"/home"}>
						<button className="btn btn-primary">
							Iniciar Sesion
						</button>
					</Link>

					<div>
						<span>¿No tienes cuenta?</span>
						<button className="btn btn-secondary">
							Crear Cuenta
						</button>
					</div>
					<button className="btn btn-link">
						Ingresa como invitado
					</button>
				</div>
			</div>
		</main>
	);
};

export default LogIn;
