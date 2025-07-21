import express from 'express'


const app = express();

//Routes

app.get("/", (req,res,next)=> {
  res.json({message: "Welcome to e-book apis"});
})

export default app;