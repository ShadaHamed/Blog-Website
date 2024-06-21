import Navbar from "./Components/Navbar";
import Home from "./Home";
import Create from "./Components/Create";
import Update from "./Components/Update";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlogDetails from "./Components/BlogDetails";
import NotFound from "./Components/NotFound";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login"
import Registeration from "./Components/Registeration";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Profile from "./Components/Profile";
import { AuthProvider } from "./AuthContext";

function App() {

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
            <Route path='/blogs/blog/:id'>
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
            <Route path='/blogs/author/:author'>
              <Dashboard />
            </Route>
            <Route path='/users/profile/:username'>
              <Profile />
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
