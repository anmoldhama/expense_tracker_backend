import http from 'http';
import app from './app';

const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`server listen on port: ${port}`)
});