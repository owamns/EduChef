import { useState } from "react";

import "./ListGroup.css";

interface ListGroupProps {
	items: string[];
	heading: string;
	onTestClick: any;
}

function ListGroup({ items, heading, onTestClick }: ListGroupProps) {
	const [selectedItem, setSelectedItem] = useState(null);
	

	const handleTestButtonClick = (event: any) => {
		// Lógica específica de ListGroup para el botón 'Test'
		console.log("Test button clicked in ListGroup!");
		// Llamar a la función de callback proporcionada desde las props
		if (onTestClick) {
			onTestClick(event);
		}
	};
	const onSelectedItem = (item: any) => {
		setSelectedItem(item === selectedItem ? null : item);
		console.log(item);
	};
	return (
		<>
			<h1>{heading}</h1>
			{items.length === 0 && <p>No item found</p>}
			<ul className="list-group">
				{items.map((item, index) => (
					<li
						key={item}
						className="list-group-item accordion"
						id="accordionExample"
						onClick={() => {
							onSelectedItem(item);
						}}
					>
						<div className="accordion-item">
							<h2 className="accordion-header">
								<button
									className="accordion-button collapsed"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target={`#collapse${index}`}
									aria-expanded="false"
									aria-controls={`collapse${index}`}
								>
									{index + 1}. {item}
								</button>
							</h2>
							<div
								id={`collapse${index}`}
								className={`accordion-collapse collapse ${
									selectedItem === item ? "show" : ""
								}`}
								data-bs-parent="#accordionExample"
							>
								<div className="accordion-body">
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
											onClick={handleTestButtonClick}
										/>
										<label
											className="form-check-label"
											htmlFor="flexCheckChecked"
										>
											Test
										</label>
									</div>
								</div>
							</div>
						</div>
						{/* {index + 1}. {item}
						<div
							className={`caja ${
								selectedItem === item ? "expandir" : ""
							}`}
						>
							<div>
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
						</div> */}
						{/* {selectedItem === item && (
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
						)} */}
					</li>
				))}
			</ul>
		</>
	);
}

export default ListGroup;
