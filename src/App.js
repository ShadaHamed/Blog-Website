import Navbar from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import Update from "./Update";
import Authors from "./Authors";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import { useState } from "react";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login"
import Registeration from "./Components/Registeration";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Profile from "./Components/Profile";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthProvider } from "./AuthContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null)
  const [token, setToken] = useState();
  const history = useHistory();

   // if(!token) {
  //   return (
  //     <Router>
  //       <Login />
  //     </Router>
    
  // )}

  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Navbar/>
        <div class="content">
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/about'>
              <About />
            </Route>
            <Route path='/contact'>
              <Contact />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/create'>
              <Create />
            </Route>
            <Route path='/authors'>
              <Authors />
            </Route>
            <Route path='/blogs/:id'>
              <BlogDetails />
            </Route>
            <Route path='/update/:id'>
              <Update />
            </Route>
            <Route path='/login'>
              <Login/>
            </Route>
            <Route path='/registeration'>
              <Registeration />
            </Route>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
      </div>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
