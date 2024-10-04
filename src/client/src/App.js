import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SearchBar from './components/SearchBar';
import Entity from './components/Entity';
import Document from './components/Document'

function App() {
  
  
  //App Routing
  return (
    <div className='App'>
    <BrowserRouter>
      <SearchBar/>
      <Routes>
        <Route path='/'/>
        <Route path='/entity/:entityName' Component={Entity}/>
        <Route path='/document/:documentId' Component={Document}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
