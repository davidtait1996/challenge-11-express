const router = require('express').Router();
// const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const fs = require('fs');

router.get('/notes', (req, res) => {
  let db = fs.readFileSync('./db/db.json');
  res.json(JSON.parse(db));
});

router.post('/notes', (req, res) => {
  let db = fs.readFileSync('./db/db.json');
  let parsedDb = JSON.parse(db);
  let newNote = {
    title: req.body.title,
    text: req.body.text
  }
  parsedDb.push(newNote);

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