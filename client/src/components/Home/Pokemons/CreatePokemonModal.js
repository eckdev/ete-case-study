import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { insertPokemon } from '../../../actions/pokemon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '../../../styles/home.module.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '25%'
    }
};

function CreatePokemonModal({ isModalOpen, setIsModalOpen }) {
    const [name, setname] = useState("");
    const [attack, setattack] = useState(0);
    const [defence, setdefence] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const errors = {};

    const dispatch = useDispatch();


    const validation = () => {
        if (!name) {
            errors.name = "Name can't be empty";
        }

        if (attack === 0 || attack > 10) {
            errors.attack = "Attack must be between 0 and 10."
        }

        if (defence === 0 || defence > 10) {
            errors.defence = "Defence must be between 0 and 10."
        }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        validation();
        if (Object.keys(errors).length === 0) {
            await dispatch(insertPokemon({
                name: name,
                attack: attack,
                defence: defence,
                isEnemy: false
            })).then(() => {
                setname("");
                setattack(0);
                setdefence(0);
                setIsModalOpen(false);
                toast.success('Your pokemon created successfully!', {
                    position: 'top-center'
                });
            })
        }
        else {
            setErrorMessage(errors);
        }
    }
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={customStyles}
            ariaHideApp={false}
        >
            <h2 style={{textAlign:'center'}}>Create your pokemon</h2>

            <form onSubmit={onFormSubmit}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Enter your pokemon Name"
                        onChange={e => setname(e.target.value)}
                        className={styles.eckInput}
                    />
                    {errorMessage.name && <span className={styles.error}>{errorMessage.name}</span>}
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        placeholder="Enter your pokemon attack value"
                        onChange={e => setattack(e.target.value)}
                        min={1}
                        max={10}
                        className={styles.eckInput}
                    />
                    {errorMessage.attack && <span className={styles.error}>{errorMessage.attack}</span>}
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        placeholder="Enter your pokemon defence value"
                        onChange={e => setdefence(e.target.value)}
                        min={1}
                        max={10}
                        className={styles.eckInput}
                    />
                    {errorMessage.attack && <span className={styles.error}>{errorMessage.attack}</span>}
                </div>

                <div className={styles.modalFooter}>
                    <button onClick={() => setIsModalOpen(false)} style={{ textDecoration: 'underline' }}>cancel</button>
                    <button type="submit" className={styles.submitButton}> Submit</button>
                </div>

            </form>
        </Modal>
    )
}

export default CreatePokemonModal
