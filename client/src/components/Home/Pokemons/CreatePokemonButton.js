import React from 'react'
import CreatePokemonModal from './CreatePokemonModal';

import styles from '../../../styles/home.module.css'

function CreatePokemonButton({setIsModalOpen,isModalOpen}) {
    return (
        <>
           {
                isModalOpen ? <CreatePokemonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> :        
                 <button onClick={() => setIsModalOpen(true)} className={styles.createPokemonButton} style={{marginLeft:'20px'}}>Create Your Pokemon</button>
            }
        </>

    )
}

export default CreatePokemonButton

