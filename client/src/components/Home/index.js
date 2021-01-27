import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon } from "../../actions/pokemon";

function Home() {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.pokemon);

    useEffect(async () => {
        async function fetchData() {
            const response = await dispatch(getAllPokemon());
        }
        fetchData();
    }, [])

    return (
        <div>
            {data ? (
                data.filter(x => x.isEnemy).map((pokemon) => {
                    return <div>{pokemon.name}</div>
                })
            ) : <span>No record</span>}
        </div>
    )
}

export default Home
