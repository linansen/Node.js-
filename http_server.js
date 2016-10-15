const http=require('http');
const util=require('util');
const fs=require('fs');
const http_server=http.createServer();

/*http_server.on('request',(request,response)=>{
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write('hello..', 'utf-8');

    response.end();
});*/
//f a client connection emits an 'error' event, it will be forwarded here. 
//Listener of this event is responsible for closing/destroying the underlying socket. 
//For example, one may wish to more gracefully close the socket with an HTTP '400 Bad Request' response 
//instead of abruptly severing the connection.

http_server.on('clientError',(err,socket)=>{
    console.log(err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

http_server.on('close',()=>{
	console.info('the http server closed...');
});

http_server.on('connect',(request, socket, head)=>{
	//console.log(util.inspect(request.headers));
	//console.info(head);
	console.log('http request arrived! the connect event emit..');
	socket.write('http request arrived! the connect event emit..\n');
});

//Emitted each time there is a request. Note that there may be multiple requests per connection 
//(in the case of keep-alive connections). request is an instance of http.IncomingMessage 
//and response is an instance of http.ServerResponse.

http_server.on('request',(request,response)=>{
    console.log(request.headers);
    console.log(request.statusMessage);
    console.log(request.method);
    console.log(request.url);
    var rs=fs.createReadStream('./as.txt', {
	  flags: 'r',
	  encoding: null,
	  fd: null,
	  mode: 0o666,
	  autoClose: true
	});
    response.writeHead(200,{'Content-Type':'text/plain'});
    //response.write(util.inspect(request.headers));
    rs.pipe(response);
    //response.end();
});

http_server.listen(8000, ()=>{
	console.info('create http server..');
});


