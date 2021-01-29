import React, { useState } from 'react'
import styles from '../../../styles/home.module.css';

import PokemonCard from './PokemonCard'
import CreatePokemonButton from './CreatePokemonButton'

function PokemonCardList({ pokemonData }) {
    const myPokemons = pokemonData.filter(x => !x.isEnemy);
    const enemiesData = pokemonData.filter(x => x.isEnemy);

    const [IsModalOpen, setIsModalOpen] = useState(false)
    return (
        < div className={styles.pokemonContainer}>
            {
                myPokemons.length > 0 ?
                    <div className={styles.container}>
                        <div className={styles.cardBody}>
                            {
                                myPokemons.map((poke, index) => {
                                    return <PokemonCard key={index} pokemon={poke} index={index} isEnemy={false} />
                                })
                            }
                            {
                                myPokemons.length < 3 ? <CreatePokemonButton isModalOpen={IsModalOpen} setIsModalOpen={setIsModalOpen} /> : ''
                            }
                        </div>
                    </div>
                    :
                    <span>No Record</span>
            }
            {
                enemiesData.length > 0 ?
                    <div className={styles.container} style={{marginTop:'20px'}}>
                        <div className={styles.cardBody}>
                        {
                            enemiesData.map((poke, index) => {
                                return <PokemonCard key={index} pokemon={poke} index={index} isEnemy={true} />
                            })
                        }
                    </div></div>
                    : null
            }
        </div>
    )
}

export default PokemonCardList
