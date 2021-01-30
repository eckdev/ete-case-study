import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon } from "../../actions/pokemon";
import {ToastContainer} from 'react-toastify' 
import styles from '../../styles/home.module.css'

import PokemonCardList from './Pokemons/PokemonCardList';
import Map from './Map';
import Logs from './Logs'
import Navbar from './Navbar'


function Home(props) {
    const dispatch = useDispatch();
    const {pokemons } = useSelector(state => state.pokemon);
    useEffect(async () => {
        await dispatch(getAllPokemon());
    }, []);
    const [isBattleArenaActive, setIsBattleArenaActive] = useState(false)

    return (
        <>
            {
                pokemons.length > 0 ? (
                    <>
                        <Navbar history={props.history} />
                        <div className={styles.contentWrapper}>
                            {!isBattleArenaActive ? <PokemonCardList pokemonData={pokemons} /> : null }
                            <Map pokemonData={pokemons} setIsBattleArenaActive={setIsBattleArenaActive} isBattleArenaActive={isBattleArenaActive} />
                        </div>
                        <Logs />
                        <ToastContainer />
                    </>
                )
                    :
                    (
                        <span style={{textAlign:'center',padding:20}}>Loading ...</span>
                    )
            }

        </>
    )
}

export default Home
