const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
connectToMongo();


const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use('/api/auth',require('./routes/Auth.js'));
app.use('/api/note',require('./routes/note.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})