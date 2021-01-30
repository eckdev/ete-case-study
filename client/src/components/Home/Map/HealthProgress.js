import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar'

function HealthProgress() {
    const {myPokemon,enemyPokemon} = useSelector(state => state.pokemon)
debugger;
    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <ProgressBar completed={myPokemon?.hp} name={myPokemon?.name}></ProgressBar>

            <ProgressBar completed={enemyPokemon?.hp} name={enemyPokemon?.name}></ProgressBar>
        </div>
    )
}

export default HealthProgress
