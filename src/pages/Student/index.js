import React, {Component} from 'react';
import openSocket from 'socket.io-client';

import "./styles.css";
import reload from './img/reload.png'; 

const socket = openSocket('http://localhost:3001');

export default class Main extends Component{
		
	state = {
		id:"",
		classroom: "",
		place:"",
		persona:"",
		action:"",
		complement:"",
		listIdeas:[],
		listStories:[]
		}; 
		
	componentDidMount(){
		
		this.loadCards();
		
		let x = document.getElementById("cards-box");
		
		x.style.display = "none";
		
		x = document.getElementById("editor");
		x.style.display = "none";
		
		x = document.getElementById("texts");
		x.style.display = "none";

		socket.on('received-story', (component) => {
			
			let LStory = this.state.listStories;
			
			for(let story in LStory){
				
				if(LStory[story][1] === component[1]){
					LStory[story][6] = component[6];
				}
			}
			
			let containerTexts = document.getElementById("texts");
			
			containerTexts.innerHTML = "";
			
			let texto;
			
			for(let story in LStory){
				
				let textBox = document.createElement("div");	
				textBox.setAttribute("class","text-box");
				textBox.setAttribute("id",LStory[story][1]);			
				
				let divKeywords = document.createElement("div");	
				divKeywords.setAttribute("id","text-keywords");		
				texto = document.createTextNode(LStory[story][2]);
				divKeywords.appendChild(texto);
					
				let divTitle= document.createElement("div");	
				divTitle.setAttribute("id","text-title");
				texto = document.createTextNode(LStory[story][3]);
				divTitle.appendChild(texto);
				
				let divText= document.createElement("div");	
				divText.setAttribute("id","delivered-text");
				texto = document.createTextNode(LStory[story][4]);
				divText.appendChild(texto);
				
				let divAuthor= document.createElement("div");	
				divAuthor.setAttribute("id","text-author");
				texto = document.createTextNode(LStory[story][5]);
				divAuthor.appendChild(texto);
				
				let divStatus = document.createElement("div");	
				divStatus.setAttribute("id","status");		
				texto = document.createTextNode(LStory[story][6]);
				
				if(LStory[story][6] === "Enviado"){
					divStatus.style.color = "red";
				}
				else if(LStory[story][6] === "Entregue"){
					divStatus.style.color = "green";
				}
				
				divStatus.appendChild(texto);
				
				textBox.appendChild(divStatus);
				textBox.appendChild(divKeywords);
				textBox.appendChild(divTitle);
				textBox.appendChild(divText);
				textBox.appendChild(divAuthor);
				
				containerTexts.appendChild(textBox);
				
			}
		});
	}
	
	componentWillUnmount(){
		
		socket.close();
	}
	
	loadCards = async () =>{
		const place = ["Igreja","Castelo","Escola","Floresta","Praia","Lamaçal","Deserto"];
		const persona = ["Indio","Bombeiro","Professor","Princesa","Príncipe","Camponesa","Bispo"];
		const action = ["caçar","Festejar","Estudar","Rezar","Escrever","Comer","Dormir"];
		const complement = ["sem camisa","com frio","com sede","lata de coca","martelo","boné"];
		
		let list = {place,persona,action,complement};
		
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
		
		let id = document.getElementsByName("id")[0].value;
		let title = document.getElementsByName("title")[0].value;
		let story = document.getElementsByName("story")[0].value;
		let author = document.getElementsByName("author")[0].value;
				
		if(title.trim() === "" || story.trim() === "")
		return;
		
		let keyCards = this.state.place + " | " + this.state.persona + " | " + this.state.action + " | " + this.state.complement;
		
		let LStory = this.state.listStories;
		let classroom = this.state.classroom;
		
		LStory.push([classroom,id,keyCards,title,story,author,"Enviado"]);
		
		socket.emit('send-story', [classroom,id,keyCards,title,story,author,"Enviado"]) ;
		
		this.setState({listStories:LStory});
		
		let containerTexts = document.getElementById("texts");
			
		containerTexts.innerHTML = "";
		
		let texto;
		
		for(story in LStory){
			
			let textBox = document.createElement("div");	
			textBox.setAttribute("class","text-box");
			textBox.setAttribute("id",LStory[story][1]);			
			
			let divKeywords = document.createElement("div");	
			divKeywords.setAttribute("id","text-keywords");		
			texto = document.createTextNode(LStory[story][2]);
			divKeywords.appendChild(texto);
				
			let divTitle= document.createElement("div");	
			divTitle.setAttribute("id","text-title");
			texto = document.createTextNode(LStory[story][3]);
			divTitle.appendChild(texto);
			
			let divText= document.createElement("div");	
			divText.setAttribute("id","delivered-text");
			texto = document.createTextNode(LStory[story][4]);
			divText.appendChild(texto);
			
			let divAuthor= document.createElement("div");	
			divAuthor.setAttribute("id","text-author");
			texto = document.createTextNode(LStory[story][5]);
			divAuthor.appendChild(texto);
			
			let divStatus = document.createElement("div");	
			divStatus.setAttribute("id","status");		
			texto = document.createTextNode(LStory[story][6]);
			
			if(LStory[story][6] === "Enviado"){
				divStatus.style.color = "red";
			}
			else if(LStory[story][6] === "Entregue"){
				divStatus.style.color = "green";
			}
			
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
	
	id = Math.random().toString(36).substr(2,5);
	
	this.setState({id});
			
	socket.emit('connect-student',[id,this.state.classroom]);
	
	}
	
	login = () =>{
		
		let classRoom = document.getElementsByName("classRoom")[0].value;
		
		this.setState({classroom:classRoom});
		
		let author = document.getElementsByName("username")[0].value;
		
		if(author.length > 0 && author.trim() !== ""){
			
			document.getElementsByName("author")[0].value = author;
			
			let x = document.getElementById("login");
			x.style.display = "none";
			
			x = document.getElementById("cards-box");
			x.style.display = "flex";
			
			x = document.getElementById("editor");
			x.style.display = "block";
			
			x = document.getElementById("texts");
			x.style.display = "block";
			
			let id = document.getElementsByName("id")[0].value;
			
			socket.emit('connect-student',[id,classRoom]);
			
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
						
			socket.emit('connect-student',[id,this.state.classroom]);
		}
		
	}
	
	keyPressed = () =>{
		
		let sizeText = document.getElementsByName("title")[0].value.length + document.getElementsByName("story")[0].value.length;
		
		if(sizeText % 5 > 0)
		return;
	
		//comunicar texto
		let id = document.getElementsByName("id")[0].value;
		let title = document.getElementsByName("title")[0].value;
		let story = document.getElementsByName("story")[0].value;
		let author = document.getElementsByName("author")[0].value;
		let keyCards = this.state.place + " | " + this.state.persona + " | " + this.state.action + " | " + this.state.complement;
		let classroom = this.state.classroom;
		
		socket.emit('send-story', [classroom,id,keyCards,title,story,author,"Escrevendo"]) ;	
		
	}
	
	render(){
		
		return(
			<div>
			<h1>Gerador de histórias divertidas</h1>
			
			<div id="login">	
				<label className="label"><b>Sala:</b></label><input className="inputRoom" type="text" placeholder="Digite o código da sala de aula" name="classRoom" required />
				<br/>
				<label className="label"><b>Autor:</b></label>
				<input className="inputAuthor" type="text" placeholder="Digite seu nome" name="username" required />
				<br/>				
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
				<label className="label"><b>Sala:</b></label><input className="inputRoom" type="text" name="classRoom" value={this.state.classroom} disabled />
				<input type="hidden"  name="id" value={this.state.id} />
				<input className="inputTitle" onKeyPress={this.keyPressed} type="text" placeholder="Titulo da história" name="title" required />
				<textarea className="input" onKeyPress={this.keyPressed} placeholder="Crie sua história utilizando os cartões acima" name="story" required />
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