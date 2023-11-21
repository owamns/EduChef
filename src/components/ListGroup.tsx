interface ListGroupProps {
	items: string[];
	heading: string;
	onSelectedItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectedItem }: ListGroupProps) {
	return (
		<>
			<h1>{heading}</h1>
			{items.length === 0 && <p>No item found</p>}
			<ul className="list-group">
				{items.map((item, index) => (
					<li
						key={item}
						className={
							index === 3
								? "list-group-item active"
								: "list-group-item"
						}
						onClick={() => {
							onSelectedItem(item);
						}}
					>
						{item}
					</li>
				))}
			</ul>
		</>
	);
}

export default ListGroup;
