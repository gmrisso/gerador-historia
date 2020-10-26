import React, {Component} from 'react';
import openSocket from 'socket.io-client';

import "./styles.css";
import reload from './img/reload.png'; 

const socket = openSocket(process.env.REACT_APP_API_URL);

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
		const place = ["Circo","Cinema","Prisão","Cemitério","Deserto","Estádio de futebol","Praia","Ilha deserta",
			"Casa mal-assombrada","Rua escura","Sorveteria","Piscina inflável","Escola","Avião","Montanha",
			"Praça","Castelo","Lua","Um reino encantado"];
		const persona = ["Um palhaço","Um ladrão","Uma bailarina","Dois caçadores","Um rei","Um estudante",
			"Três crianças","Um fantasma","Pescador","Uma família","Um jogador de futebol","Um marinheiro",
			"Um piloto de avião","Um detetive","Dois pescadores","Um professor","Um agente secreto",
			"Um astronauta","Um cavaleiro","Uma fada","Uma bruxa"];
		const action = ["Escutar Barulho estranho","Passear de bicicleta","Encontrar um livro","Estar com dor de barriga",
			"Estar com medo","Estar procurando algo","Dar risada","Correr atrás de alguém",
			"Ganhar um prêmio","Receber aplausos","Colocar uma fantasia","Correr muito rápido",
			"Chamar alguém","Perder-se","Dormir","Escutar a campainha","Ver um fantasma",
			"Quebrar uma maldição"];
		const complement = ["Não há ninguém por perto","Uma voz assustadora","Um leão está por perto",
			"Sem os sapatos","Lembrar de algo importante","Perder a chave","Uma invenção que vai revolucionar o mundo",
			"Um barco","Muito frio","Uma bola de futebol","Muito calor","Uma música tocando muito alto",
			"Uma estrela cadente","Uma garrafa de água","Um arco-íris","Uma mala cheia de dinheiro",
			"Um som de apito","Um foguete","Um alienígena","Um cavalo","Uma varinha mágica","Um espelho mágico"];

		
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

			if(document.getElementsByName("title")[0].value !== "" 
			|| document.getElementsByName("story")[0].value !== ""){
				alert("Os cartões só podem ser atualizados se o título e o texto estão vazios.");
				return;
			}
			
			//let id = Math.random().toString(36).substr(2,5);
			let id = this.state.id;
			let plc = this.state.listIdeas.place[Math.floor(Math.random() * this.state.listIdeas.place.length)];
			let prs = this.state.listIdeas.persona[Math.floor(Math.random() * this.state.listIdeas.persona.length)];
			let act = this.state.listIdeas.action[Math.floor(Math.random() * this.state.listIdeas.action.length)];
			let cmp = this.state.listIdeas.complement[Math.floor(Math.random() * this.state.listIdeas.complement.length)];
									
			this.setState({ id,
						place:plc.toUpperCase(),
						persona:prs.toUpperCase(),
						action:act.toUpperCase(),
						complement:cmp.toUpperCase()});
						
			socket.emit('connect-student',[id,this.state.classroom]);
						
			let x = document.getElementById("place");
			x.classList.remove("w3-animate-zoom");
			void x.offsetWidth;
			x.classList.add("w3-animate-zoom");

			x = document.getElementById("persona");
			x.classList.remove("w3-animate-zoom");
			void x.offsetWidth;
			x.classList.add("w3-animate-zoom");

			x = document.getElementById("action");
			x.classList.remove("w3-animate-zoom");
			void x.offsetWidth;
			x.classList.add("w3-animate-zoom");

			x = document.getElementById("complement");
			x.classList.remove("w3-animate-zoom");
			void x.offsetWidth;
			x.classList.add("w3-animate-zoom");
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

		console.log("emitindo historia");
		
		socket.emit('send-story', [classroom,id,keyCards,title,story,author,"Escrevendo"]) ;	
		
	}
	
	render(){
		
		return(
			<div>
			<h1 className="h1s">HISTÓRIAS ALEATÓRIAS</h1>
			
			<div id="login">
				<label className="labelLogin"><b>&nbsp;&nbsp;Sala:</b></label><input className="inputLogin" type="text" placeholder="Digite o código da sala de aula" name="classRoom" required />
				<br/>
				<label className="labelLogin"><b>Autor:</b></label>
				<input className="inputLogin" type="text" placeholder="Digite seu nome" name="username" required />
				<br/>				
				<button onClick={this.login} className="btLogin">Entrar</button>	
			</div>
			
			<div id="cards-box">
				<div id="cards">
					<div>
						<div className="title">Local</div>
						<div class="card">
							<div id="place" class="child place w3-animate-zoom">
								<div className="content">{this.state.place}</div>
							</div>
							<div class="child place"></div>
							<div class="child place"></div>
						</div>
					</div>
					
					<div>
						<div className="title">Personagem</div>
						<div class="card">
							<div id="persona" class="child persona w3-animate-zoom ">
								<div className="content">{this.state.persona}</div>
							</div>
							<div class="child persona"></div>
							<div class="child persona"></div>
						</div>
					</div>
					
					<div>
						<div className="title">Ação</div>
						<div class="card">
							<div id="action" class="child action w3-animate-zoom">
								<div className="content">{this.state.action}</div>
							</div>
							<div class="child action"></div>
							<div class="child action"></div>
						</div>
					</div>
					
					<div>
						<div className="title">Complemento</div>
						<div class="card">
							<div id="complement" class="child complement w3-animate-zoom">
								<div className="content">{this.state.complement}</div>
							</div>
							<div class="child complement"></div>
							<div class="child complement"></div>
						</div>
					</div>						
				</div>
				<button className="btRefresh" onClick={this.refresh} title="Atualizar cartões"><img alt="Atualizar cartões" className="icon" src={reload} /></button>
			</div>
			<div id="editor">
				<label className="label"><b>Sala:</b></label><input className="inputRoom" type="text" name="classRoom" value={this.state.classroom} disabled />
				<input type="hidden"  name="id" value={this.state.id} />
				<input className="inputTitle" onChangeText={this.keyPressed} type="text" placeholder="Titulo da história" name="title" required />
				<textarea className="input" onChangeText={this.keyPressed} placeholder="Crie sua história utilizando os cartões acima" name="story" required />
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