/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Buscador from "./Buscador.js";

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
			<Buscador tarjetas={items}></Buscador>
		</div>
	);
}

export default DisplayCursos;
