const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/users');
const pokemons = require('./routes/pokemons');

mongoose.connect("mongodb+srv://cankayadarcin:14789632Me.@getirchallengedb.vtaqs.mongodb.net/EteDB?retryWrites=true&w=majority", { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/pokemons', pokemons);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});