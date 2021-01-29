import React from 'react'
import { useSelector } from 'react-redux';
import styles from '../../../styles/home.module.css';

function Logs() {
    const logs = useSelector(state => state.logs)
    return (
        <>
            {
                logs.length > 0 ?
                    <div className={styles.container} style={{marginTop:'20px' }}>
                        <div className={styles.cardBody}>
                            {logs.map((log) => {
                                return (

                                    <ul>
                                        <li>{log}</li>
                                    </ul>
                                )
                            })
                            }
                        </div>
                    </div> : null
            }
        </>

    )
}

export default Logs
