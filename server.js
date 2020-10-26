const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 3001;

const cors = require("cors");
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

var school = [];

let maxConcurrentConnections = 30;

io.on('connection', function(socket){
  /*const admin = socket.handshake.query.admin

  TODO
  if (io.engine.clientsCount > maxConcurrentConnections && !admin) {
    socket.emit('show-max-concurrent-connections-message')
    socket.conn.close()
    return
  } else {
    socket.emit('hide-max-concurrent-connections-message')
  }*/
    
  socket.on('disconnect', () => {
		
	for(let index in school){
		
		if(school[index].socketId === socket.id ){
			console.log('> remove room ' + socket.id);
			school.splice(index,1);
		}
	}
     
  })
  
  socket.on('create-room', (id) => {
	  
    console.log('> create room ' + id);
	
	let room = createRoom();
	
	room.setId(id,socket.id);
	
	school.push(room);
	    
  })
  
  socket.on('connect-student', (component) => {
	 	
	let student = [component[0],socket.id];
		
	for(let index in school){
		
		if(school[index].id === component[1] ){
			school[index].student.push(student);
			//console.log('> connect student ' + school[index].student);
		}
	}	
    
  })
  
  socket.on('send-story', (component) => {
	  	
	for(let index in school){
		
		if(school[index].id === component[0] ){
			//console.log('> send-story ' + school[index].socketId);
			
			io.to(school[index].socketId).emit('send-story', component);
		}
	}	    
  })

  socket.on('received-story', (component) => {
	  	
	for(let index in school){
		
		if(school[index].id === component[0] ){
			
			for(let index2 in school[index].student){
				//console.log('> received-story ');
				io.to(school[index].student[index2][1]).emit('received-story', component);
			}			
			
		}
	}	    
  })  

});


function createRoom() {
	
  console.log('> Starting new Room' )
  
  const room = {
	socketId: "", //socketid da sala
	id: "", //id da sala
	student:[], //alunos da sala
	setId,
	setStudent
  }
  
  function setId(id,socketId) {
    room.id = id;
	room.socketId = socketId;
  }
  
  function setStudent(component) {
    room.student.push(component);
  }

  return room;
}

server.listen(port, () => console.log(`Listening on port ${port}`));
