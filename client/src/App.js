import { useState } from 'react'
import './styles/App.css';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('token') || false)
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              isLogin ? (
                <Redirect
                  to={{
                    pathname: "/home",
                    state: "true",
                  }}
                />
              ) : (
                  <Login {...props} setIsLogin={setIsLogin}/>
                )
            }
          />
          <Route path="/register" render={(props) =>
              isLogin ? (
                <Redirect
                  to={{
                    pathname: "/home",
                    state: "true",
                  }}
                />
              ) : (
                  <Register {...props} setIsLogin={setIsLogin} />
                )
            }></Route>
          <Route path="/home" render={(props) =>
              isLogin ? (
                <Home  />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: "true",
                  }}
                />
                )
            }></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
