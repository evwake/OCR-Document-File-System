import {React} from 'react'
import './RelatedDocuments.css'

function RelatedDocuments({documents}) {
    const docDivs = []
    for(let i = 0; i < documents.length; i++){
        let current_document = documents[i]
        // Create divs to display the document images, and create links to each document's page
        docDivs.push(
        <div className='doc'>
            <img src={`data:image/jpeg;base64,${documents[i].image.$binary.base64}`} width="50%"/>
            <a href = {`../document/${current_document.docId}`}>{current_document.docId}</a>
        </div>);
    }
    return (
      <div>
        <h2>Related Documents</h2>
        <div className = 'docContainer' style={{ gridTemplateColumns: `repeat(${Math.min(4, documents.length)}, 1fr)` }}>
          {docDivs}
        </div>
      </div>
    );
}

export default RelatedDocuments;