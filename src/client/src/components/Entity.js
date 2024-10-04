import {React, useState, useEffect} from 'react'
import './Entity.css'
import { useParams } from 'react-router-dom';
import RelatedDocuments from './RelatedDocuments';
import RelatedEntities from './RelatedEntities';

function Entity() {
    const {entityName} = useParams()
    const [documents, setDocuments] = useState(<div id='documents'></div>)
    const [relatedEntities, setRelatedEntities] = useState(<div id ='relatedEntities'></div>)

    
    // Request this entity's data from the API
    useEffect(() =>{
        fetch(`http://localhost:8000/entity?entity=${entityName}`, 
            {
              method:'GET'
            }
          ).then(response =>{
            if (response.ok) {
              response.json().then(jsonList =>{
                const documents = jsonList.map(x =>{
                  return {'docId': x.docId, 'image': x.image}
                })
                // When data is received, render data-specific elements
                setDocuments(<RelatedDocuments documents={documents}/>)
                setRelatedEntities(<RelatedEntities documents={jsonList}/>)
              })
            }
          })
    }, [entityName])

    return (
      <div>
        <h1>Entity: {entityName}</h1>
        {documents}
        {relatedEntities}
      </div>
    );
}

export default Entity;