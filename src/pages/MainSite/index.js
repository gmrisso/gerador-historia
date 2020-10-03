import React, {Component} from 'react';

import "./styles.css";
import reload from './img/reload.png'; 

export default class Main extends Component{
	
	state = {		
		place:"",
		persona:"",
		action:"",
		complement:"",
		list:[]
		};
	
	componentDidMount(){

		this.loadCards();		
	}
	
	loadCards = async () =>{
		const place = ["Igreja","Castelo","Escola","Floresta","Praia","Lamaçal","Deserto"];
		const persona = ["Indio","Bombeiro","Professor","Princesa","Príncipe","Camponesa","Bispo"];
		const action = ["caçar","Festejar","Estudar","Rezar","Escrever","Comer","Dormir"];
		const complement = ["sem camisa","com frio","com sede","lata de coca","martelo","boné"];
		
		var list = {place,persona,action,complement};
		
		let plc = place[Math.floor(Math.random() * place.length)];
		let prs = persona[Math.floor(Math.random() * persona.length)];
		let act = action[Math.floor(Math.random() * action.length)];
		let cmp = complement[Math.floor(Math.random() * complement.length)];
								
		this.setState({place:plc.toUpperCase(),
					persona:prs.toUpperCase(),
					action:act.toUpperCase(),
					complement:cmp.toUpperCase(),
					list:list});
		
		
			
	}
	
	addText = () =>{
		
	var textBox = document.createElement("div");	
	textBox.setAttribute("id","text-box");
	
	var divKeywords = document.createElement("div");	
	divKeywords.setAttribute("id","text-keywords");
	
	var texto = document.createTextNode(this.state.place + " | " + this.state.persona + " | " + this.state.action + " | " + this.state.complement);

    divKeywords.appendChild(texto);
		
	var divTitle= document.createElement("div");	
	divTitle.setAttribute("id","text-title");
	
	var inputTitle = document.getElementsByName("title");
	var texto = document.createTextNode(inputTitle[0].value);
	divTitle.appendChild(texto);
	
	var divText= document.createElement("div");	
	divText.setAttribute("id","delivered-text");
	
	var inputStory = document.getElementsByName("story");
	var texto = document.createTextNode(inputStory[0].value);
	divText.appendChild(texto);
	
	var divAuthor= document.createElement("div");	
	divAuthor.setAttribute("id","text-author");
	
	var inputAuthor = document.getElementsByName("author");
	var texto = document.createTextNode(inputAuthor[0].value);
	divAuthor.appendChild(texto);
	
	textBox.appendChild(divKeywords);
	textBox.appendChild(divTitle);
	textBox.appendChild(divText);
	textBox.appendChild(divAuthor);
	
	var containerElement = document.getElementById("texts");
	containerElement.appendChild(textBox);
	
	document.getElementsByName("title")[0].value = "";
	document.getElementsByName("story")[0].value = "";
	
	}
	
	refresh = () =>{
		
		if(this.state.list.place){
			
			let plc = this.state.list.place[Math.floor(Math.random() * this.state.list.place.length)];
			let prs = this.state.list.persona[Math.floor(Math.random() * this.state.list.persona.length)];
			let act = this.state.list.action[Math.floor(Math.random() * this.state.list.action.length)];
			let cmp = this.state.list.complement[Math.floor(Math.random() * this.state.list.complement.length)];
									
			this.setState({place:plc.toUpperCase(),
						persona:prs.toUpperCase(),
						action:act.toUpperCase(),
						complement:cmp.toUpperCase()});
		}
		
	}
	
	render(){
		
		return(
			<div>
			<h1>Gerador de histórias divertidas</h1>
			<div id="cards-box">
				<div id="cards">
					<div id="place" className="card w3-animate-zoom"><div className="title">Local</div><div className="content">{this.state.place}</div></div>
					<div id="persona" className="card w3-animate-zoom"><div className="title">Personagem</div><div className="content">{this.state.persona}</div></div>
					<div id="action" className="card w3-animate-zoom"><div className="title">Ação</div><div className="content">{this.state.action}</div></div>
					<div id="complement" className="card w3-animate-zoom"><div className="title">Complemento</div><div className="content">{this.state.complement}</div></div>
				</div>
				<button className="btRefresh" onClick={this.refresh}><img className="icon" src={reload} alt="Atualizar cartões" /></button>
			</div>
			<div id="editor">
				<input className="inputTitle" type="text" placeholder="Titulo da história" name="title" required />
				<textarea className="input" placeholder="Crie sua história utilizando os cartões acima" name="story" required />
				<br />
				<button className="add" onClick={this.addText}>Entregar</button>
				<input className="inputAuthor" type="text" placeholder="Autor" name="author" required />
			</div>
			<div id="texts">
			</div>
		</div>		
		)
	}
		
}