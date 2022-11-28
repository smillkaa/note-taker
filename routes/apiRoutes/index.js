const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const { notes } = require('../../db/db.json')



// function to filter results based on user query
function filterByQuery(query, notesArray) {
  let filteredResults = notesArray;
  if (query.title) {
    filteredResults = filteredResults.filter(note => note.title === query.title)
  }
  if (query.text) {
    filteredResults = filteredResults.filter(note => note.text === query.text)
  }
  return filteredResults
}

// reading json file
router.get('/notes', (req, res) => {
  // fs.readFile('./db/db.json', (error, data) => {
  //   if (error) {
  //       res.status(500).json('Internal server error')
  //   }
  //   res.json(JSON.parse(data))
  // })
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results)
});


// function to find note by its id
function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

// function to write data to the notes json file 
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note)
  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  )
  return note
}

// get single note by id
router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
  
});


// ability for the user to post notes from the front end and write it to our notes json file
router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString()

  // add note to json file and notes array
  const note = createNewNote(req.body, notes)
  res.json(note);
});

module.exports = router