import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import styles from '../../styles/auth.module.css';
import { registerUser } from "../../actions/auth";

function Register(props) {
    const { setIsLogin } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState({});
    const [isLoading, setisLoading] = useState(false);

    let {registerErrorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const errors = {};

    useEffect(() => {
            setErrorMessage(registerErrorMessage);
    }, [registerErrorMessage]);
    

    const validation = function () {
        if (!name) {
            errors.name = "Full Name can't be empty";
        }

        const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email) {
            errors.email = "Email can't be empty";
        }
        else if (!emailRegExp.test(email)) {
            errors.email = "Please enter a valid email";
        }

        if (!password) {
            errors.password = "Password can't be empty";
        }
        else if (password.length < 5) {
            errors.password = "Password must have at least 5 characters"
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Password can't be empty";
        }
        else if (confirmPassword !== password) {
            errors.confirmPassword = "Confirm Password does not match with Password";
        }
    }

    const submitRegisterForm = function (e) {
        e.preventDefault();
        validation();
        if (Object.keys(errors).length === 0) {
            let user = {
                name: name,
                email: email,
                password:password,
                password_confirm:password
            }
            dispatch(registerUser(user))
            .then(() => {
                setName("");
                setEmail("");
                setPassword("");
                setisLoading(false);
                setIsLogin(true);
                debugger;
                props.history.push("/home");
            })
            .catch(() => {
                setisLoading(false);
                if (registerErrorMessage) {
                    setErrorMessage(registerErrorMessage);
                }
            });
        }
        else {
            setisLoading(false);
            setFormError(errors);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.head}>
                    <h3 className={styles.title}>Sign Up</h3>
                </div>
                {
                    errorMessage ?
                        <div className={styles.alert} role="alert">
                            <div className={styles.alertText}>{registerErrorMessage}</div>
                            <div className={styles.alertClose} onClick={() => setErrorMessage("")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" /></svg>
                            </div>
                        </div> : ""
                }
                <form onSubmit={submitRegisterForm} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            onChange={e => setName(e.target.value)}
                            className={styles.eckInput}
                        />
                        {formError.name && <span className={styles.error}>{formError.email}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            onChange={e => setEmail(e.target.value)}
                            className={styles.eckInput}
                        />
                        {formError.email && <span className={styles.error}>{formError.email}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            onChange={e => setPassword(e.target.value)}
                            className={styles.eckInput}
                        />
                        {formError.password && <span className={styles.error}>{formError.password}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Enter your confirm password"
                            onChange={e => setConfirmPassword(e.target.value)}
                            className={styles.eckInput}
                        />
                        {formError.confirmPassword && <span className={styles.error}>{formError.confirmPassword}</span>}
                    </div>
                    <div className={styles.loginActions}>
                        <button type="submit" className={styles.loginButton}>Register
                            {isLoading &&
                                <svg className={styles.loading} viewBox="0 0 50 50">
                                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                </svg>
                            }</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
