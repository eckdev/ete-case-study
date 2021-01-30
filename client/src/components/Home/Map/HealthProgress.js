import { useSelector } from 'react-redux';

function HealthProgress() {
    const {myPokemon,enemyPokemon} = useSelector(state => state.pokemon)
    
    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <progress value={myPokemon.hp ?? 0} max={100} style={{width:'250px'}}>{myPokemon.name}</progress>

            <progress value={enemyPokemon.hp ?? 0} max={100} style={{width:'250px'}}>{enemyPokemon.name}</progress>
        </div>
    )
}

export default HealthProgress
