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

function PokemonCard({ pokemon,index,isEnemy }) {
    return (
        <>
        <div className={styles.list}>
            <img src={isEnemy ? pokemonImageList[index+3] : pokemonImageList[index]} alt={pokemon.name} width={50} height={50} draggable={pokemon.hp <= 0 ? false : true} />
            <div className={styles.textContainer}>
            <progress value={pokemon.hp} max={100}>100</progress>
                <span className={styles.pokeName} style={{textDecoration: pokemon.hp <= 0 ? 'line-through' : 'none'}}>{pokemon.name}</span>
                <span style={{marginRight:'10px'}}>Attack {pokemon.attack}</span>
                <span>Defence {pokemon.defence}</span>
            </div>
        </div>
        <hr />
        </>
    )


}

export default PokemonCard
