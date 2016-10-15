const net=require('net');
const port=4001;
var conn;
var retryInteval=3000;
var retryTimes=0;
var MAXRetries=10;
var quitFlag=false;
process.stdin.resume();
process.stdin.on('data',function(chunk){
   if(chunk.toString().trim().toLowerCase()==='quit'){
      quitFlag=true;
      console.info('client wanna to end...');
      conn.end();
      process.stdin.pause();
   }
   else{
   	 console.log('write chunk to socket..');
   	 conn.write(chunk,'utf-8');
   }
});
(function connect(){
   function reconnect(){
   	 if(MAXRetries>=retryTimes){
        retryTimes++;
        setTimeout(connect, retryInteval)
   	 }
   	 else{
   	 	throw new Error('Max retries have been exceeded, i give up...');
   	 }
   }
   conn=net.createConnection(port);
   conn.on('connect',()=>{
   	  retryTimes=0;
   	  console.log('connected to server...');
   });
   conn.on('error',(err)=>{
   	 console.log('Error in the connection...');
   });
   conn.on('close',()=>{
   	 if(!quitFlag){
   	 	console.log('connection got closed! will try to reconnect  the server...');
        reconnect();
   	 }
   });
})();
