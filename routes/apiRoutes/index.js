const router = require('express').Router()
const fs = require('fs')

router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', (error, data) => {
    if (error) {
        res.status(500).json('Internal server error')
    }
    res.json(JSON.parse(data))
  })
})


// router.post('/api/notes', (req, res) => {
//     // hould receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
// })

module.exports = router