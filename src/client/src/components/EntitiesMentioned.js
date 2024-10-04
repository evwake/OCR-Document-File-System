import {React} from 'react'
import './EntitiesMentioned.css'

function EntitiesMentioned({entities}) {
  // Create a table row for each entity, and include a link to that entity's page
  let entityRows = entities.map(e =>{
      return <tr>
        <td>
          <a href={`../entity/${e}`}>{e}</a>
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
          </tr>
          <tbody>
            {entityRows}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EntitiesMentioned;