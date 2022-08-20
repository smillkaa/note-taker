const path = require('path')
const router = require('express').Router()


//connecting to front page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

//connecting to the notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
})
//for an unknown request, send 404 not found error
router.get('*', (req, res) => {
    res.send(404)
})

module.exports = router