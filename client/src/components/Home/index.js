import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon } from "../../actions/pokemon";

import PokemonCardList from './Pokemons/PokemonCardList';

function Home() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.pokemon);
    useEffect(async () => {
        await dispatch(getAllPokemon());
    }, [])

    return (
        <>
            {
                data ? (
                    <>
                        <PokemonCardList pokemonData={data} />
                        {/* <Map /> */}
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
