const express = require('express')
const http = require('http')
const { disconnect } = require('process')
const { Socket } = require('socket.io')
const Server = require('socket.io').Server
const app = express()
const server = http.createServer(app)
const { json } = require('express')
const{Pool} =require('pg')

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
const pool = new Pool({
  user: 'postgres',
  password: '23Raul',
  host: 'localhost',
  port: 3000,
  database: 'FullStack'
});

const io = new Server (server,{
    cors:{
        origin:"*"
    }
})
io.on("connection",(socket)=>{
    console.log("connected")
    socket.on("chat",chat=>{
        io.emit('chat',chat)
    })

    socket.on('disconnect',()=>{
        console.log('discconected')
    })
})


app.post('/saved/:user/:message', async (req, res) => {
   
  
    try {
  
      const user = req.params.user;
      const message = req.params.message;
  
      
      const result = await pool.query('INSERT INTO user_(use, message) VALUES($1, $2);', [user, message]);
  
     
      console.log(result);
  
      res.send('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
app.get('/info',async(req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM user_;');
        res.json(result.rows);
    }catch(error){
console.error('Error inserting data:', error);
      res.status(500).send('Internal Server Error');
    }

});
app.get('/checker/:user',async(req,res)=>{
  const user = req.params.user;
  try{
  const result = await pool.query('SELECT COUNT(*) FROM "user" WHERE username = $1;', [user]);
  if (result.rows[0].count > 0) {
    res.status(200).json({ exists: true });
  } else {
    res.status(200).json({ exists: false });
  }
} catch (error) {
  console.error('Error checking username:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

app.get('/checker_UP/:user/:password',async(req,res)=>{
  const user = req.params.user;
  const password = req.params.password;
  try{
  const result = await pool.query('SELECT COUNT(*) FROM "user" WHERE username = $1 AND password = $2;', [user,password]);
  
  if (result.rows[0].count > 0) {
    res.status(200).json({ statuse: true });
   
  } else {
    res.status(200).json({ statuse: false });
   
  }
} catch (error) {
  console.error('Error checking username:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

app.post('/register/:user/:password',async(req,res)=>{
  const user = req.params.user
  const password = req.params.password
  try{
    const result = await pool.query('INSERT INTO "user"(username, password) VALUES($1, $2);', [user, password]);
    res.send('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Internal Server Error');
  }
});



server.listen(5001,()=>console.log('lising on port 5000'))