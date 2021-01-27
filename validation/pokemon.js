const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePokemonInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.attack = !isEmpty(data.attack) ? data.attack : 0;
    data.defence = !isEmpty(data.defence) ? data.defence : 0;

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (data.attack === 0) {
        errors.name = 'Attack field must be bigger than 0';
    }

    if (data.defence === 0) {
        errors.name = 'Defence field must be bigger than 0';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}