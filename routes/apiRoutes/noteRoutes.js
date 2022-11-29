const router = require('express').Router();
const { notes } = require('../../db/db.json');
const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes');
const fs = require('fs')
const path = require('path');
const { arrayBuffer } = require('stream/consumers');

// ability for the user to post notes from the front end and write it to our notes json file
router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
  
   // if any data in req.body is incorrect, send 400 error back
   if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted');
   } else {
    // add note to json file and notes array
    const note = createNewNote(req.body, notes);
    res.json(note);
   }
});

// router.get('/test', (req,res) => {
//     let result = deleteNote()
//     res.send('hi')
//     console.log(result)

// })

// reading json file
router.get('/notes', (req, res) => {

  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});


// get single note by id
router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// delete a single note
// function deleteNote(id, notesArray) {

    

//     if(data.id === query.params.id) {
//     allData.splice(i,1)
//     }
//     createNewNote(body, notesArray)
// }
// delete single note
router.delete('/notes/:id', (req, res) => {
    // read all current data
   const data = fs.readFileSync(path.join(__dirname, '../../db/db.json'), () => {});
   // parse data
   let notesArray = JSON.parse(data);

   for (let i = 0; i < notesArray.length; i++) {
        // if the request id matches to the id in the array, delete that note
        if (req.params.id === notesArray[i].id) {
            notesArray.splice(i,1)
        }
    }

    console.log(notesArray)
    fs.writeFile('../../db/db.json', JSON.stringify(notesArray), (error) => {
        if (error) {
          res.status(500).json('500')
        }
        res.json(req.body)
      })
});





module.exports = router;