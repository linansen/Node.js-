const net=require('net');
//if allowHalfOpen is true, then the socket won't automatically send a FIN packet 
//when the other end of the socket sends a FIN packet. The socket becomes non-readable, 
//but still writable. You should call the end() method explicitly. See 'end' event for more information.
//If pauseOnConnect is true, then the socket associated with each incoming connection will be paused, 
//and no data will be read from its handle. This allows connections to be passed between processes 
//without any data being read by the original process. To begin reading data from a paused socket, call resume().
const fs=require('fs');
const timeout=600000;//set timeout is 1 minute
var socketArr=[];
var options={allowHalfOpen: false,pauseOnConnect: false};
var tcp_server=net.createServer(options, (socket)=>{
    console.info('client connected!');
    socket.write('hello! welocome to tcp_server! now u can use our service..please type your command...\n');
    socket.setTimeout(timeout);
    socket.setEncoding('utf-8');
    socketArr.push(socket);
    socket.on('data',(chunk)=>{//obtain data from socket
        //write chunk to file 
        console.info('chunk has arrived!');
        var fs_options={
                         flags: 'a',
                         defaultEncoding: 'utf8',
                         fd: null,
                         mode: 0o666,
                         autoClose: true}
        var rs=fs.createWriteStream('./tmp.txt', fs_options);
        /*if(chunk.toString().trim().toLowerCase()==='quit'){
             console.warn('the server receive commond "quit",and server close this connection...');
             console.info(socket.localAddress);
             console.info(socket.bytesRead);
             console.info(socket.localPort);
             socket.end();
        }
        else*/{
              //index 
              socketArr.forEach((otherSocket,index)=>{
                if(socket!==otherSocket){
                    console.log('socketArr['+index+']:'+' '+otherSocket.remoteAddress);
                    otherSocket.write(chunk);
                    otherSocket.setNoDelay(false);
                    //socket.pipe(process.stdout);
                }
              });
        }
    });
    //
  socket.on('end',()=>{
       console.warn('By default (allowHalfOpen == false) the socket will destroy its '+
        'file descriptor once it has written out its pending write queue. However, by '+
        'setting allowHalfOpen == true the socket will not automatically end() its side '+
        'allowing the user to write arbitrary amounts of data, with the caveat that the '+
        'user is required to end() their side now.');
        console.warn('the server receive commond "quit",and server close this connection...');
        console.info(socket.localAddress);
        console.info(socket.bytesRead);
        console.info(socket.localPort);
        socketArr.splice(socketArr.indexOf(socket),1);
        socket.end();

  });
  //Emitted after resolving the hostname but before connecting. Not applicable to UNIX sockets.
  socket.on('lookup',(err,addr,family,host)=>{
      console.warn(err);
      console.warn(addr);
      console.warn(family);
  });

  //Emitted if the socket times out from inactivity. This is only to notify that the 
  //socket has been idle. The user must manually close the connection.
  socket.on('timeout',()=>{
     console.log('idle timeout....');
     var rmIdx=socketArr.indexOf(socket);
     socketArr.splice(rmIdx,1);
     socket.end();
  });

    
}).listen(4001);

//tcp server livestyle 
/*tcp_server.on('connection',(socket)=>{

});*/
//Note that if connections exist, this event is not emitted until all connections are ended.
tcp_server.on('close',()=>{
    console.warn('all connections had closed!');
});

tcp_server.on('error',(err)=>{
    console.warn(err);
    //console.log('error code:'+err.CODE);
});


tcp_server.on('listening',()=>{
    console.log('the server is listening on port '+4001);
});
