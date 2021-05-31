import React from "react";
import Home from "../screens/home/Home";
import Details from "../screens/details/Details";
import {BrowserRouter as Router, Route} from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";

const Controller = () =>{
   const baseUrl = "/api/v1/";
   
   //Controller to manage routings in the app
   return(
       <Router>
           <div className="mainpage">
             <Route 
                exact 
                path="/" 
                render={props => <Home {...props} baseUrl={baseUrl}/>}
             />
             <Route
                 exact
                 path="/movie/id/:id"
                 render={props => <Details {...props} baseUrl={baseUrl}/>}
             />
             <Route
                 exact
                 path="/bookshow/id/:id"
                 render={ props => <BookShow {...props} baseUrl={baseUrl}/>}
             />
             <Route
                 exact
                 path="/confirm/id"
                 render={props => <Confirmation {...props} baseUrl={baseUrl}/>}
              />
           </div>
       </Router>
   );
};

export default Controller;