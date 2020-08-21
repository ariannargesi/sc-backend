const app = require('express')()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

const { dbUrl, port } = require('./config')
const schema = require('./schema')


app.use(bodyParser.urlencoded({ extended: false , useUnifiedTopology: true}))


mongoose.connect(dbUrl, {useNewUrlParser: true})
const db = mongoose.connection
db.on('err', () => {
    console.log('error in connection')
})
db.once('open', () => {
    console.log('database is ready')
})

app.listen(port, () => {
    console.log('app is running on port')
})

app.post('/new', (req, res)  => {
    const content = req.body.feedback 
    const date = new Date().getDate
    const feedback = new schema({content, date})
    feedback.save().then(() => {
        res.send({ result: true})
    })  
})

app.get('/', (req, res) => {
    res.send({status: 'running'})
})