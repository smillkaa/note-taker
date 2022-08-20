const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const path = require('path')
const { db } = require('./db/db')



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//data
app.post('/notes', (req, res) => {
    res.send(db)
})


//pages
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})
