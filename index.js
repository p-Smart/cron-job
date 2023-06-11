require('dotenv').config()
const express = require('express')
const app = express()
const KeepAppAlive = require('./routes/KeepAppAlive')


app.use(express.urlencoded({ extended: true }))


app.get('/', KeepAppAlive)


let count = 0
app.get('/test', async (_, res) => {
  try{
    res.json({
      success: true,
    })

    setInterval( () => {
      console.log(count++)
    }, 10000 )
  }
  catch(err){
    res.status(500).json({
      error: {
        message: err.message
      }
    })
  }
})






















app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {
        message: `You're lost, man!`
      }
    });
    next()
})



app.listen(process.env.PORT || 3000, () => console.log(`Server running...`))

