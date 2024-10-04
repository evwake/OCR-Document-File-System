import {React, useState, useEffect} from 'react'
import './Entity.css'
import { json, useParams } from 'react-router-dom';
import EntitiesMentioned from './EntitiesMentioned';

function Document() {
    const {documentId} = useParams()
    const [documentImage, setDocumentImage] = useState('')
    const [entitiesMentioned, setEntitiesMentioned] = useState('')
    // Request this document's data from the API
    useEffect(() =>{
        fetch(`http://localhost:8000/document?documentId=${documentId}`, 
            {
              method:'GET'
            }
          ).then(response =>{
            if (response.ok) {
              response.json().then(jsonList =>{
                // When data is received, render data-specific elements
                setDocumentImage(<img src={`data:image/jpeg;base64,${jsonList.data.$binary.base64}`}/>)
                setEntitiesMentioned(<EntitiesMentioned entities={jsonList.entities}/>)
              })
            }
          })
    }, [documentId])
    return (
      <div>
        <h1>Document: {documentId}</h1>
        {documentImage}
        {entitiesMentioned}
      </div>
    );
}

export default Document;