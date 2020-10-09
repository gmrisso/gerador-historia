import React, {Component} from 'react';
import openSocket from 'socket.io-client';

import "./styles.css";
import reload from './img/reload.png'; 

const socket = openSocket('http://localhost:3001');

export default class Main extends Component{
		
	state = {
		id:"",
		classroom: "",
		listStories:[]
		}; 
		
	componentDidMount(){
		
		let classroom = Math.random().toString(36).substr(2,6);
		
		classroom = classroom.toUpperCase();
		
		this.setState({classroom});
		
		socket.emit('create-room',classroom);

		socket.on('send-story', (component) => {
					
		let LStory = this.state.listStories;
		
		let found = false;
		
		if(component[6] === "Enviado"){
			component[6] = "Entregue";
			socket.emit('received-story',component) ;
		}
		
		for(let index in LStory){
			
			if(LStory[index][1] === component[1] ){
				
				LStory[index] = component;
				found = true;
			}
		}
		
		if (found == false){
			
			LStory.push(component);
		}		
		
		this.setState({listStories:LStory});
		
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
		
		LStory.push([classroom,id,keyCards,title,story,author,"Entregue"]);
		
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
	
	render(){
		
		return(
			<div>
			<h1 className="h1">HISTÓRIAS ALEATÓRIAS</h1>
			
			<div id="room">	
				<label className="labelRoom"><b>Sala:</b></label>
				<input className="inputRoom" type="text" name="classRoom" value={this.state.classroom} disabled />				
			</div>
			
			<div id="texts">
			</div>
		</div>		
		)
	}
		
}