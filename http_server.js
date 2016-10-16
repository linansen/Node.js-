const http=require('http');
const util=require('util');
const fs=require('fs');
const fs_options={flags: 'r',encoding: null,fd: null,mode: 0o666,autoClose: true};
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
    /*console.log(request.headers);
    console.log(request.statusMessage);*/
    console.log(request.method);
    //
    function defaultHandler(){
        response.writeHead(200,{'Content-Type':'text/plain'});
        response.end(JSON.stringify({
            url:request.url,
            method:request.method,
            headers:request.headers
        }));
    }
    switch(request.url){

        case '/doodle':
        if(request.method==='GET'){
             response.writeHead(200,{'Content-Type':'image/png'});
             fs.createReadStream('./doodle.png', fs_options).pipe(response);
        }
        break;

        case '/get':
        if(request.method==='GET'){
             response.writeHead(200,{'Content-Type':'text/plain'}); 
             fs.createReadStream('./as.txt', fs_options).pipe(response);
        }
        break;

        case '/upload':
        if(request.method==='POST'){
          request.on('data',(chunk)=>{
            if(!util.isNull(chunk['my_file'])){
                response.writeHead(200,{'Content-Type':'application/json'})
                response.write(chunk);
                console.log(chunk.toString());
            }
            response.end('chunk end...');
          });
        }
        break;

        case '/obj.json':
        if(request.method==='PUT'){
           console.log(request.url);
           response.writeHead(200,{'Content-Type':'application/json'});
           request.on('data',(chunk)=>{
                   console.log(chunk.toString());
                   response.write(chunk);
             });
        }
        break;

        default:
           defaultHander();
        break;
    }
    /*if('/doodle'===request.url&&request.method==='GET'){
    	  response.writeHead(200,{'Content-Type':'image/png'});
          fs.createReadStream('./doodle.png', fs_options).pipe(response);
    }
    else if('/get'===request.url&&request.method==='GET'){
      response.writeHead(200,{'Content-Type':'text/plain'});	
      fs.createReadStream('./as.txt', fs_options).pipe(response);
    }
    else if('/obj.json'===request.url&&request.method==='PUT'){
    	console.log(request.url);
    	response.writeHead(200,{'Content-Type':'application/json'});
    	request.on('data',(chunk)=>{
    	  console.log(chunk);
          response.write(chunk);
    	});
    }
    else{
    	response.writeHead(200,{'Content-Type':'text/plain'});
    	response.end('your request source no exists!');
    }*/
});

http_server.listen(8000, ()=>{
	console.info('create http server..');
});


