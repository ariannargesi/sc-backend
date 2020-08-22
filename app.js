const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const { dbUrl } = require('./config')
const schema = require('./schema')


app.use(bodyParser.json())
app.use(cors())

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, result) => {
    if(err)
    console.log(err)
})
const db = mongoose.connection
db.on('err', () => {
    console.log('error in connection')
})
db.once('open', () => {
    console.log('database is ready')
})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
    console.log('app is running on port')
})

app.post('/new', (req, res)  => {
    const content = req.body.feedback
    if(content.length < 1000){
    const date = new Date()
    const feedback = new schema({content, date})
    feedback.save()
    .then(() => {
        res.send({ result: true, str: "feedback saved"})    
    })
    .catch( (err) => res.send({result: false, str: "error in saving feedback", err}) )
    }
    else {
        res.send({status: false, str: "str it's to long"})
    }
})

app.get('/', (req, res) => {
 res.send({status: true})   
})


const log = x => console.log(x)