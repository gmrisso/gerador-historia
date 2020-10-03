import React, {Component} from 'react';

import "./styles.css";
import reload from './img/reload.png'; 

export default class Main extends Component{
	
	state = {
		id:"",
		place:"",
		persona:"",
		action:"",
		complement:"",
		listIdeas:[],
		listStories:[]
		}; 
	
	const io = require('socket.io')();
	
	componentDidMount(){

		this.loadCards();
		
		var x = document.getElementById("cards-box");
		
		x.style.display = "none";
		
		x = document.getElementById("editor");
		x.style.display = "none";
		
		x = document.getElementById("texts");
		x.style.display = "none";		
	}
	
	loadCards = async () =>{
		const place = ["Igreja","Castelo","Escola","Floresta","Praia","Lamaçal","Deserto"];
		const persona = ["Indio","Bombeiro","Professor","Princesa","Príncipe","Camponesa","Bispo"];
		const action = ["caçar","Festejar","Estudar","Rezar","Escrever","Comer","Dormir"];
		const complement = ["sem camisa","com frio","com sede","lata de coca","martelo","boné"];
		
		var list = {place,persona,action,complement};
		
		let id = Math.random().toString(36).substr(2,5);
		let plc = place[Math.floor(Math.random() * place.length)];
		let prs = persona[Math.floor(Math.random() * persona.length)];
		let act = action[Math.floor(Math.random() * action.length)];
		let cmp = complement[Math.floor(Math.random() * complement.length)];
								
		this.setState({id,
					place:plc.toUpperCase(),
					persona:prs.toUpperCase(),
					action:act.toUpperCase(),
					complement:cmp.toUpperCase(),
					listIdeas:list});			
	}
	
	addText = () =>{
		
		var id = document.getElementsByName("id")[0].value;
		var title = document.getElementsByName("title")[0].value;
		var story = document.getElementsByName("story")[0].value;
		var author = document.getElementsByName("author")[0].value;
		
		if(title.trim() === "" || story.trim() === "")
		return;
		
		var keyCards = this.state.place + " | " + this.state.persona + " | " + this.state.action + " | " + this.state.complement;
		
		var LStory = this.state.listStories;
		
		LStory.push([id,keyCards,title,story,author,"Entregue"]);
		
		this.setState({listStories:LStory});
		
		var containerTexts = document.getElementById("texts");
		
		/*console.log(containerTexts);*/
		
		containerTexts.innerHTML = "";
		
		var texto;
		
		for(story in LStory){
			
			var textBox = document.createElement("div");	
			textBox.setAttribute("class","text-box");
			textBox.setAttribute("id",LStory[story][0]);			
			
			var divKeywords = document.createElement("div");	
			divKeywords.setAttribute("id","text-keywords");		
			texto = document.createTextNode(LStory[story][1]);
			divKeywords.appendChild(texto);
				
			var divTitle= document.createElement("div");	
			divTitle.setAttribute("id","text-title");
			texto = document.createTextNode(LStory[story][2]);
			divTitle.appendChild(texto);
			
			var divText= document.createElement("div");	
			divText.setAttribute("id","delivered-text");
			texto = document.createTextNode(LStory[story][3]);
			divText.appendChild(texto);
			
			var divAuthor= document.createElement("div");	
			divAuthor.setAttribute("id","text-author");
			texto = document.createTextNode(LStory[story][4]);
			divAuthor.appendChild(texto);
			
			var divStatus = document.createElement("div");	
			divStatus.setAttribute("id","status");		
			texto = document.createTextNode(LStory[story][5]);
			divStatus.style.color = "green";
			divStatus.appendChild(texto);
			
			textBox.appendChild(divStatus);
			textBox.appendChild(divKeywords);
			textBox.appendChild(divTitle);
			textBox.appendChild(divText);
			textBox.appendChild(divAuthor);
			
			containerTexts.appendChild(textBox);
			
		}
	
	document.getElementsByName("title")[0].value = "";
	document.getElementsByName("story")[0].value = "";
	
	}
	
	login = () =>{
		
		var author = document.getElementsByName("username")[0].value;
		
		if(author.length > 0 && author.trim() !== ""){
			
			document.getElementsByName("author")[0].value = author;
			
			var x = document.getElementById("login");
			x.style.display = "none";
			
			x = document.getElementById("cards-box");
			x.style.display = "flex";
			
			x = document.getElementById("editor");
			x.style.display = "block";
			
			x = document.getElementById("texts");
			x.style.display = "block";
			
		}		
	}
	
	refresh = () =>{
		
		if(this.state.listIdeas.place){
			let id = Math.random().toString(36).substr(2,5);
			let plc = this.state.listIdeas.place[Math.floor(Math.random() * this.state.listIdeas.place.length)];
			let prs = this.state.listIdeas.persona[Math.floor(Math.random() * this.state.listIdeas.persona.length)];
			let act = this.state.listIdeas.action[Math.floor(Math.random() * this.state.listIdeas.action.length)];
			let cmp = this.state.listIdeas.complement[Math.floor(Math.random() * this.state.listIdeas.complement.length)];
									
			this.setState({id,
						place:plc.toUpperCase(),
						persona:prs.toUpperCase(),
						action:act.toUpperCase(),
						complement:cmp.toUpperCase()});
		}
		
	}
	
	render(){
		
		return(
			<div>
			<h1>Gerador de histórias divertidas</h1>
			
			<div id="login">		
				<label className="label"><b>Autor:</b></label>
				<input className="inputAuthor" type="text" placeholder="Digite seu nome" name="username" required />								
				<button onClick={this.login} className="btLogin">Entrar</button>	
			</div>
			
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
				<input type="hidden" name="id" value={this.state.id} />
				<input className="inputTitle" type="text" placeholder="Titulo da história" name="title" required />
				<textarea className="input" placeholder="Crie sua história utilizando os cartões acima" name="story" required />
				<br />
				<button className="add" onClick={this.addText}>Entregar</button>
				<input className="inputAuthor" type="text" name="author" disabled />
			</div>
			<div id="texts">
			</div>
		</div>		
		)
	}
		
}