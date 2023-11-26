/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Buscador from "./Buscador";

interface Props {
	altura?: string;
	alturaCursos?: string;
	header: string;
	items: any;
}
function DisplayCursos({ altura, alturaCursos, header, items }: Props) {
	const styles: { [key: string]: React.CSSProperties } = {
		displayCursosContainer: {
			maxHeight: altura,
		},
		childrenContainer: {
			maxHeight: alturaCursos,
		},
	};
	return (
		<div
			className="displayCursosContainer"
			style={styles.displayCursosContainer}
		>
			<header className="header">{header}</header>
			{/* <div className="search">
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
					name=""
					id="searchInput"
					placeholder="Busque por título"
				/>
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
			<div className="childrenContainer" style={styles.childrenContainer}>
				{children}
			</div> */}
			<Buscador tarjetas={items}></Buscador>
		</div>
	);
}

export default DisplayCursos;
