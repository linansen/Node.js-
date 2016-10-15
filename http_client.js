const http=require('http');
var options={
	protocol:'http:',//Protocol to use. Defaults to 'http:'.
	host:'localhost',//A domain name or IP address of the server to issue the request to. Defaults to 'localhost'.
	hostname:'',//Alias for host. To support url.parse() hostname is preferred over host.
	//family: ,//IP address family to use when resolving host and hostname. 
	         //Valid values are 4 or 6. When unspecified, both IP v4 and v6 will be used.
	port:8000,//Port of remote server. Defaults to 80.
	method:'GET',//method: A string specifying the HTTP request method. Defaults to 'GET'.
	path:'/',//path: Request path. Defaults to '/'. Should include query string if any. E.G. '/index.html?page=12'. 
        headers:{'Content-Type':'text/plain','Content-Length':20},//headers: An object containing request headers
        //auth:,//auth: Basic authentication i.e. 'user:password' to compute an Authorization header.
        //agent:false,//Controls Agent behavior. When an Agent is used request will default to Connection: keep-alive. 
                      //Possible values:undefined (default): use http.globalAgent for this host and port.
                      //Agent object: explicitly use the passed in Agent.
                      //false: opts out of connection pooling with an Agent, defaults request to Connection: close
}

//http.request() returns an instance of the http.ClientRequest class. The ClientRequest instance is a writable stream. 
//If one needs to upload a file with a POST request, then write to the ClientRequest object.
// This object is created internally and returned from http.request(). 

/***
1: To get the response, add a listener for 'response' to the request object. 
   'response' will be emitted from the request object when the response headers have been received. 
   The 'response' event is executed with one argument which is an instance of http.IncomingMessage.
   During the 'response' event, one can add listeners to the response object; 
   particularly to listen for the 'data' event.
2: If no 'response' handler is added, then the response will be entirely discarded. However, 
   if you add a 'response' event handler, then you must consume the data from the response object, 
   either by calling response.read() whenever there is a 'readable' event, or by adding a 'data' handler, 
   or by calling the .resume() method. Until the data is consumed, the 'end' event will not fire.
   Also, until the data is read it will consume memory that can eventually lead to a 'process out of memory' error.
***/
/*
var request=http.request(options, (response)=>{
     console.info('the response statusCode : '+response.statusCode);
     console.info('the response statusMessage : '+response.statusMessage);
     console.log(' the response headers : '+JSON.stringify(response.headers));
     response.setEncoding('utf-8');
     response.on('data',(chunk)=>{
     	//console.info();
     	console.info('at '+new Date()+ ' the chunk : '+chunk.toString());
     	//console.info(new Date());
     });
     response.on('end',()=>{
     	console.log('no data from server....');
     })
});
//note: as for http.request,you must use end() manually to end the request !
request.end();
*/
var request=http.get(options,(response)=>{
    console.info('the response statusCode : '+response.statusCode);
    console.info('the response statusMessage : '+response.statusMessage);
    console.log(' the response headers : '+JSON.stringify(response.headers));
    response.setEncoding('utf-8');
    //console.log(response.resume());
    response.on('data',(chunk)=>{
     	//console.info();
     	console.info('at '+new Date()+ ' the chunk : '+chunk.toString());
     	//console.info(new Date());
     });
    response.on('end',()=>{
     	console.log('no data from server....');
     })

});


request.on('error',(error)=>{
   console.log('request the server failly! the code message :'+error.message);
});

/*request.on('',()=>{

});*/
