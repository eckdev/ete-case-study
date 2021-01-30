import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar'

function HealthProgress() {
    const {myPokemon,enemyPokemon} = useSelector(state => state.pokemon)

    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <ProgressBar completed={myPokemon.hp ?? 0} name={myPokemon.name}></ProgressBar>

            <ProgressBar completed={enemyPokemon.hp ?? 0} name={enemyPokemon.name}></ProgressBar>
        </div>
    )
}

export default HealthProgress
