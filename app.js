const app = require('express')()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

const { dbUrl } = require('./config')
// const schema = require('./schema')


app.use(bodyParser.urlencoded({ extended: false }))


// mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err, result) => {
//     if(err)
//     console.log(err)
// })
// const db = mongoose.connection
// db.on('err', () => {
//     console.log('error in connection')
// })
// db.once('open', () => {
//     console.log('database is ready')
// })
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
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
