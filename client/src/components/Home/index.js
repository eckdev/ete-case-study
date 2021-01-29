import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon } from "../../actions/pokemon";

import PokemonCardList from './Pokemons/PokemonCardList';
import Map from './Map';
import Logs from './Map/Logs'

function Home() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.pokemon);
    useEffect(async () => {
        await dispatch(getAllPokemon());
    }, []);

    return (
        <>
            {
                data ? (
                    <>
                        <div style={{ display: 'flex', width:'100%' }}>
                            <PokemonCardList pokemonData={data} />
                            <Map pokemonData={data} />
                        </div>
                        <Logs />
                    </>
                )
                    :
                    (
                        <span>Loading ...</span>
                    )
            }

        </>
    )
}

export default Home
