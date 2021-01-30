import { useState,useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/auth.module.css';
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/auth";

function Login(props) {
    const { setIsLogin } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState({});
    const [isLoading, setisLoading] = useState(false);

    const dispatch = useDispatch();
    const { loginErrorMessage } = useSelector(state => state.auth);
    const [errorMessage, setErrorMessage] = useState("");
    const errors = {};

    useEffect(() => {
        setErrorMessage(loginErrorMessage);
    }, [loginErrorMessage])

    const validation = function () {
        if (!email) {
            errors.email = "Email can't be empty";
        }

        if (!password) {
            errors.password = "Password can't be empty";
        }
    }

    const loginFormSubmit =function (e) {
        e.preventDefault();
        validation();

        if (Object.keys(errors).length === 0) {
            setLoginError({});
            setisLoading(true);
            let user = {
                email: email,
                password: password
            }
            dispatch(loginUser(user))
                .then(() => {
                    setEmail("");
                    setPassword("");
                    setIsLogin(true);
                    setisLoading(false);
                    props.history.push("/home");
                })
                .catch((err) => {
                    debugger;
                    setisLoading(false);
                    if (loginErrorMessage) {
                        setErrorMessage(loginErrorMessage);
                    }
                    
                });
        }        
        else {
            setisLoading(false);
            setLoginError(errors);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.head}>
                    <h3 className={styles.title}>Sign In</h3>
                </div>
                {
                    errorMessage ?
                        <div className={styles.alert} role="alert">
                            <div className={styles.alertText}>{loginErrorMessage}</div>
                            <div className={styles.alertClose} onClick={() => setErrorMessage("")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" /></svg>
                            </div>
                        </div> : ""
                }
                <form onSubmit={loginFormSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            onChange={e => setEmail(e.target.value)}
                            className={styles.eckInput}
                        />
                        {loginError.email && <span className={styles.error}>{loginError.email}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            onChange={e => setPassword(e.target.value)}
                            className={styles.eckInput}
                        />
                        {loginError.password && <span className={styles.error}>{loginError.password}</span>}
                    </div>
                    <div className={styles.loginExtra}>
                        <span className={styles.forgotPassword}>Forgot Password ?</span>
                    </div>
                    <div className={styles.loginActions}>
                        <button type="submit" className={styles.loginButton}> Log in {isLoading &&
                            <svg className={styles.loading} viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>
                        }</button>
                    </div>
                    <div className={styles.account}>
                        <span className={styles.accountMsg}>Don't have an account ?</span>
                        <Link to="/register">Sign Up!</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
