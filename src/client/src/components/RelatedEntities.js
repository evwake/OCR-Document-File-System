import {React} from 'react'
import './RelatedEntities.css'

function RelatedEntities({documents}) {
  // Create an inverted index to obtain a list of every entity that shares a document with the current entity, and determine which documents are shared by these entities
  let invertedIndex = {}
  for(let i = 0; i < documents.length; i++){
      let currentDocument = documents[i]
      let otherEntities = currentDocument.other_entities
      for(let j = 0; j < otherEntities.length; j++){
          if(typeof(invertedIndex[otherEntities[j]]) == 'undefined'){
              invertedIndex[otherEntities[j]] = [<a href={`../document/${currentDocument.docId}`}>{currentDocument.docId} </a>]
          }
          else{
              invertedIndex[otherEntities[j]].push(<a href={`../document/${currentDocument.docId}`}>{currentDocument.docId} </a>)
          }
      }
  }
  let listOfEntities = Object.keys(invertedIndex)
  // Create a table row for each entity, and include a link to that entity's page
  let entities_to_documents = listOfEntities.map(e =>{
      return <tr>
        <td>
          <a href={`../entity/${e}`}>{e}</a>
        </td>
        <td>
          {invertedIndex[e]}
        </td>
      </tr>
  })
  
  return (
    <div>
      <h2>Related Entities</h2>
      <div className = 'entityContainer'>
        <table>
          <tr className='header-row'>
            <th>
              Entity Name
            </th>
            <th>
              Shared Documents
            </th>
          </tr>
          <tbody>
            {entities_to_documents}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RelatedEntities;