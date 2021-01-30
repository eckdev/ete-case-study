import React from 'react'
import { useDispatch } from 'react-redux';
import {logout} from '../../../actions/auth';
import styles from '../../../styles/home.module.css'

function Navbar() {
    const dispatch = useDispatch()
    return (
        <div>
          <ul className={styles.nav}>
            <li><span onClick={() => window.location.href ='/home'}>Home</span></li>
            <li><span  onClick={() => dispatch(logout())}>Logout</span></li>
          </ul>
        </div>
    );
}

export default Navbar
