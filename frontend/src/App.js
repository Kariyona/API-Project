import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ManageSpot from './components/Spots/ManageSpot';

import SpotIndex from './components/Spots/index';
import SpotDetails from "./components/Spots/SpotDetails";
import UpdateSpot from './components/Spots/UpdateSpot';
import CreateSpot from "./components/Spots/CreateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/spots/current" component={ManageSpot}/>
          <Route exact path="/" component={SpotIndex} />
          <Route path="/spots/new" component={CreateSpot} />
          <Route path="/spots/:spotId/edit" component={UpdateSpot}/>
          <Route exact path="/spots/:spotId" component={SpotDetails} />
        </Switch>
      )}
    </>
  );
}

export default App;
