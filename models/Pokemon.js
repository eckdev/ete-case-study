const mongoose = require('mongoose');
const { Schema } = mongoose;
const pokemonSchemas = new Schema({
  name: {
    type: String
  },
  attack: {
    type: Number
  },
  defence: {
    type: Number
  },
  isEnemy: {
    type: Boolean,
    default:false
  },
  hp:{
    type: Number,
    default: 100
  },
  isAlive:{
      type: Boolean,
      default:true
  }
});

const Pokemon = mongoose.model('pokemons', pokemonSchemas);

module.exports= Pokemon;