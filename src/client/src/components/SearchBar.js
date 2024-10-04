import {React, useState} from 'react'
import Select from 'react-select'
import './SearchBar.css'
import Button from '@mui/material/Button';
import { useNavigate  } from 'react-router-dom';



function SearchBar({onSubmit, updateSearchTerm, updateSearchType}) {

  const options = [
    { value: 'entity', label: 'Entity' },
    { value: 'document', label: 'Document' }
  ]
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('entity')
  
  // Event handler functions
  function updateSearchTerm(e){
    setSearchTerm(e.target.value)
  }

  function updateSearchType(e){
    setSearchType(e.value)
  }
  // When search is submitted, navigate to the appropriate page
  function onSubmit(){
    navigate(`/${searchType}/${searchTerm}`);
  }

    return (
      <div className='SearchBar'>
        <Select options={options} onChange={updateSearchType}/>
        <input onChange={updateSearchTerm}></input>
        <Button variant='contained' onClick={onSubmit}>Search</Button>
      </div>
    );
  }
  
  export default SearchBar;