const router = require('express').Router();
// const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const fs = require('fs');
const uuid = require('../../helpers/uuid');

router.get('/notes', (req, res) => {
  let db = fs.readFileSync('./db/db.json');
  res.json(JSON.parse(db));
});

router.post('/notes', (req, res) => {
  let db = fs.readFileSync('./db/db.json');
  let parsedDb = JSON.parse(db);
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid()
  }
  parsedDb.push(newNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(parsedDb));
  
  res.json(parsedDb);

})

router.delete('/notes/:id', (req, res) => {
  let deleteID = req.params.id;
  let db = fs.readFileSync('./db/db.json');
  let parsedDb = JSON.parse(db);

  let deleteNote = (element) => element.id === deleteID;

  let deleteNoteIndex = parsedDb.findIndex(deleteNote);

  parsedDb.splice(deleteNoteIndex, 1);

  fs.writeFileSync('./db/db.json', JSON.stringify(parsedDb));

  res.json(parsedDb);

})

module.exports = router;

// for post:
//   first we read the file
//   then we parse (becomes an array)
//   then we push new object
//   then we json.stringify
//   then writefilesync(db.json)
//   res.json(before stringify)