import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BaseLayout from './components/layout/BaseLayout';
import Hooks from './components/Hooks';
import Classes from './components/Classes';
import reducer from './reducers/reducerTemplate';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const saveToLocalStorage = (reduxGlobalState) => {
  // serialize = converting JS object to a string
  try{

    const serializeState = JSON.stringify(reduxGlobalState);
    localStorage.setItem('state', serializeState);
  }
  catch(e){
    console.log(e);
  }


}
const loadFromLocalStorage = (reduxGlobalState) => {
  
  const serializeState = localStorage.getItem('state');

  if(serializeState === null){
    return undefined;
  }
  else{
    return JSON.parse(serializeState);
    // returns a JS object representing local storage
  }

}

const persistedState = loadFromLocalStorage();

// for initializing redux store
let store = createStore(reducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// we load data above ^ and save data below 
store.subscribe(() => {
  saveToLocalStorage(store.getState());
})

// Provider hooks react to redux. 
// Must pass redux instance to prodiver via 'store' prop
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/hooks" component={Hooks}/>
            <Route path="/classes" component={Classes}/>
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
