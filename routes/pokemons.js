const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');
const validatePokemonInput = require('../validation/pokemon');

router.post('/addPokemon', async (req, res) => {
  const { errors, isValid } = validatePokemonInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { name,attack,defence,isEnemy } = req.body;
  const pokemon = new Pokemon({ name,attack,defence, isEnemy, isAlive:true,hp:100 });
  await pokemon.save();

  res.send(pokemon);
})

router.get('/', async (req, res) => {
  const { isEnemy } = req.body;
  console.log(req.body)
  if (isEnemy) {
    await Pokemon.find({ isEnemy: isEnemy === true }, function (err, pokemons) {
      if (err) {
        res.send(err);
      }
      console.log(pokemons);
      res.json(pokemons);

    });
  }
  else {
    const pokes = await Pokemon.find();

    res.send(pokes)
  }

});

router.put('/update/:id', async (req, res) => {
  const { hp } = req.body;
  const update ={
    hp: hp
  }
  let doc = await Pokemon.findByIdAndUpdate(req.params.id, update, {
    new: true
  });
  res.send(doc);
});

router.put('/updateCoordinates/:id', async (req, res) => {
  const { coordinates } = req.body;
  const update ={
    coordinates: coordinates
  }
  let doc = await Pokemon.findByIdAndUpdate(req.params.id, update, {
    new: true
  });
  res.send(doc);
});

module.exports = router;
