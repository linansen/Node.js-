/***
  Request - Simplified HTTP client
***/
var request=require('request');
const buffer=require('buffer');
var inspect=require('util').inspect;
const fs=require('fs');
const fs_options={flags: 'r',encoding: null,fd: null,mode: 0o666,autoClose: true};
var options={
	url:'http://localhost:8000/',
	method:'PUT',
	headers:{'Content-Type':'application/json'}
}

/*request(options,(error,response,body)=>{
    if(!error&&response.statusCode===200){
       console.info(body);
    }
});*/

//fs.createReadStream('file.json', fs_options).pipe(request.put('http://localhost:8000/obj.json'));

var formData={
   //my_field:'my_name',//pass a simple key-value pair
   //my_buffer:new Buffer([1,2,3]),//Pass data via Buffers
   my_file:fs.createReadStream('file.json', fs_options),//pass data via stream
   /*attachments: [
    fs.createReadStream('./linansen.jpg'),
    fs.createReadStream('./both.jpg')
  ],*/
};

request.post({url:'http://localhost:8000/upload',formData:formData},
	(err,response,body)=>{
   /*if(!err&&response.statusCode==200){
   	  console.log(body);
   }*/
   if(err) throw err;
   console.log(inspect({
   	err:err,
   	res:{
       statusCode:response.statusCode
   	},
   	body:body.toString()
   }));
});

