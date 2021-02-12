import './App.css';
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';
import { useState, useEffect } from 'react';
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
	accessToken:
		'pk.eyJ1IjoiZGlsbG9uZW5nZSIsImEiOiJja2tlOWx4a2owYzkyMm5qbm16czJ1eHI2In0.mDb-yJ-onktGkAkarPSWVw'
});

const mapStyle = 'mapbox://styles/mapbox/dark-v10';


function App() {
	const [sources, setSources] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:8000/source`)
			.then(response => response.data)
			.then(data => data ? setSources(data) : setSources([]))
	}, []);

	function renderSourceLayers() {
		const sourceLayers = []

		if (sources.length > 0) {
			for (let i = 0; i < sources.length; i += 1) {
				if (i === 0) {
					sourceLayers.push(
						<Source key={`source_id`} id={`source_id`} tileJsonSource={sources[i]['data']['options']} />
					);
				}
				sourceLayers.push(
					<Layer
						key={`layer_${i}`}
						type={sources[i]['data']['layer_type']}
						id={`layer_${i}`}
						layout={sources[i]['data']['layout']}
						paint={sources[i]['data']['paint']}
						sourceLayer={sources[i]['data']['source_layer']}
						sourceId={`source_id`} />
				)
			}
		}

		console.log(sourceLayers)

		return sourceLayers
	}

	return (
		<div className="App">
			<Map
				style={mapStyle}
				containerStyle={{
					height: '100vh',
					width: '100vw'
				}}
			>
				{renderSourceLayers()}
			</Map>;
		</div>
	);
}

export default App;
