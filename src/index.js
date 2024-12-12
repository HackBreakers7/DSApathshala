import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Register from 'views/auth/Register';
import VerifyOTP from 'views/auth/VerifyOTP';
import Login from 'views/auth/Login';
import LinearBinarySearch from "components/practicals/LinearBinarySearch";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Editor from "views/Editor.js"

ReactDOM.render(

    <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/linear" component={LinearBinarySearch}/>
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />
      <Route path="/editor" exact component={Editor} />
      <Route path="/register" component={Register} />
      <Route path="/verifyotp" element={<VerifyOTP />} />
      <Route path="/Login" component={Login} />

      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>, 
  document.getElementById("root")
  
);
