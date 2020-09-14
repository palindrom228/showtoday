const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const { patch } = require('./Routes/auth.routes')

const app = express()

app.use(express.json({ extended: true}))
app.use('/api/auth', require('./Routes/auth.routes'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) =>{
        res.sendFile(path.reslove(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),  {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (e){
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

