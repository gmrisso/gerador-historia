import React, {Component} from 'react';


import "./styles.css";
import reload from './img/reload.png'; 


const MainSite = () => (
		<div>
			<h1>Gerador de histórias divertidas</h1>
			<div id="cards">
				<div id="place" className="card w3-animate-zoom">Lugar</div>
				<div id="persona" className="card w3-animate-zoom">Pessoa</div>
				<div id="action" className="card w3-animate-zoom">Ação</div>
				<div id="complement" className="card w3-animate-zoom">Componente</div>
				<button className="btRefresh"><img className="icon" src={reload} /></button>
			</div>
			<div id="editor">
				<textarea className="input" placeholder="Crie sua história utilizando os cartões acima" name="story" required />
				<br />
				<button className="add">Adicionar</button>
			</div>
			<div id="texts">
			</div>
		</div>
);

export default MainSite;