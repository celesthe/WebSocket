const express = require('express')
var cors = require('cors');
const { Socket } = require('socket.io');
const { socketController } = require('../sockets/controller');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {}
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
       // this.usuariosPath = '/api/usuarios';
        
        //this.authPath = '/api/auth';
    
        //MIDDLEWARE
        this.middlewares();

        //RUTAS DE MI APP
        this.routes();

        //sockets
        this.sockets();

    }

      middlewares(){
        
        this.app.use(express.static('public'));
        //lectura y parseo del body
             //cors
        this.app.use(cors());

    
    }


routes(){
 //  this.app.use(this.paths.auth, require('../routes/auth'));
}

sockets(){
    this.io.on('connection', socketController);
}

listen(){
    this.server.listen(this.port,() =>{
        console.log('servicor corriendo en el puerto ', this.port );
    });
}
}


module.exports = Server;