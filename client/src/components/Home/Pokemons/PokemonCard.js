import React from 'react'
import styles from '../../../styles/home.module.css';

const pokemonImageList = [
    "http://img.pokemondb.net/artwork/bulbasaur.jpg",
    "http://img.pokemondb.net/artwork/ivysaur.jpg",
    "http://img.pokemondb.net/artwork/venusaur.jpg",
    "http://img.pokemondb.net/artwork/charmander.jpg",
    "http://img.pokemondb.net/artwork/charmeleon.jpg",
    "http://img.pokemondb.net/artwork/charizard.jpg"
]

function PokemonCard({ pokemon,index }) {
    console.log(index)
    return (
        <>
        <div className={styles.list}>
            <img src={pokemonImageList[index]} alt={pokemon.name} width={25} height={25} />
            <div className={styles.textContainer}>
                <span className={styles.pokeName}>{pokemon.name}</span>
                <span>Attack {pokemon.attack}</span>
                <span>Defence {pokemon.defence}</span>
            </div>
        </div>
        <hr />
        </>
    )


}

export default PokemonCard
