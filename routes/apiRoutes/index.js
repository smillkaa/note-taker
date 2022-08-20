const router = require('express').Router()
const fs = require('fs')
const { notes } = require('../../db/db.json')


router.get('/notes', (req, res) => {
  res.json(notes)
})

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
})

// router.get('/api/notes', (req, res) => {
//     // should read the db json file and return all saved notes as JSON.
// })

// router.post('/api/notes', (req, res) => {
//     // hould receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
// })

module.exports = router