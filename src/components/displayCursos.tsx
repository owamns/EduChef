import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}
function DisplayCursos({ children }: Props) {
	return (
		<div className="displayCursosContainer">
			<header>
				<h3>
					Modulos
				</h3>
				<hr className="Linea"/>
			</header>
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
				<input type="search" name="" id="searchInput" />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="26"
					height="26"
					fill="currentColor"
					className="bi bi-list"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
					/>
				</svg>
			</div>
			<div className="childrenContainer">{children}</div>
		</div>
	);
}

export default DisplayCursos;
