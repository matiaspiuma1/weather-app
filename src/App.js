import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { VscLocation } from 'react-icons/vsc';

const App = () => {
	const [data, setData] = useState({});
	const [location, setLocation] = useState('');

	const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=es&appid=1a81231bedca3b0759dfc77a499be833`;

	const searchLocation = (e) => {
		if (e.key === 'Enter') {
			axios
				.get(URL)
				.then((res) => {
					setData(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
			setLocation('');
		}
	};

	return (
		<div className='app'>
			<div className='busqueda'>
				<input
					value={location}
					placeholder='Buscar localidad'
					type='text'
					onChange={(e) => setLocation(e.target.value)}
					onKeyDown={searchLocation}
					className='input'
				/>
			</div>
			<div className='container'>
				<div className='top'>
					<div className='localidad-container'>
						{data.name ? (
							<div className='localidad'>
								<VscLocation />
								{data.name}
							</div>
						) : null}
					</div>
					<div className='temperatura'>{data.main ? <h1>{Number(`${data.main.temp}`).toFixed(0)}°C</h1> : null}</div>
					<div className='descripcion'>
						{data.weather ? <p>{`${data.weather[0].description}`.toUpperCase()}</p> : null}
					</div>
				</div>
				{data.weather ? (
					<div className='bottom'>
						<div className='humedad'>
							{data.weather ? (
								<div>
									<p>Humedad</p>
									{data.main.humidity}%
								</div>
							) : null}
						</div>
						<div className='sensacion-termica'>
							{data.main ? (
								<div>
									<p>Sensación Térmica</p>
									{Number(`${data.main.feels_like}`).toFixed(0)}°C
								</div>
							) : null}
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default App;
