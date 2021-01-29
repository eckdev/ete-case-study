import React from 'react'
import CreatePokemonModal from './CreatePokemonModal';

function CreatePokemonButton({setIsModalOpen,isModalOpen}) {
    return (
        <>
           {
                isModalOpen ? <CreatePokemonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> :        
                 <button onClick={() => setIsModalOpen(true)}>Create Your Pokemon</button>
            }
        </>

    )
}

export default CreatePokemonButton

