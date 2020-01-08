import React, { useState } from 'react';
import './App.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import InlineSVG from 'svg-inline-react';

// SVGs
import { tick } from './tick'
import { cancel } from './cancel'
import { question } from './question'

function App() {
const stationOptions = ['vælg station', 'stationA', 'stationB', 'stationC']
const straekningOptions = ['Vælg strækning','station1','station2','station3']
const infrastrukturforvalterOptions = ['Vælg infrastrukturforvalter', 'Banedanmark', 'Aarhus letbane']
const troljeoptions = ['Vælg trolje','trolje1','trolje2','trolje3']

const [state, setState] = useState({
  dato: findToday('dd-mm-yyyy'),
  navn: 'Vælg',
  medarbejdernummer: '',
  infrastrukturforvalter: 'Vælg infrastrukturforvalter',
  modtagetvirksomhedsuddannelse: false,
  uddannelsegivetaf: 'Vælg',
  SR1: false,
  SR2: false,
  maskinforer: false,
  rangerleder: false,
  lokomotivforer: false,
  station1: 'Vælg station',
  station2: 'Vælg station',
  station3: 'Vælg station',
  trolje1: 'Vælg trolje',
  trolje2: 'Vælg trolje',
  straekning1: 'Vælg strækning',
  straekning2: 'Vælg strækning',
  straekning3: 'Vælg strækning',
  straekning4: 'Vælg strækning',
  straekning5: 'Vælg strækning',
  timer: '',
  bemaerkninger: 'Vælg'
})
const [ showInfo, setShowInfo ] = useState(false)

const onSubmit = e => {
  if(validateDate(state.dato).bool && validateName(state.navn).bool && validateMedarbejderNummer(state.medarbejdernummer).bool && validateTimer(state.timer).bool) {
  window.open(`mailto:gitte.grys@outlook.dk?subject=RBK_formular123456&body=${arrayToCSV(state)}`)
  alert('Åbner outlook for at sende formularen per mail')
  } else {
    alert('Manglende information registreret')
  }
}
const arrayToCSV = (obj) => {
  let filteredState = {...obj}
  const keys = Object.keys(filteredState)
  for(let i = 0; i<keys.length; i++) {
    if(filteredState[keys[i]] === 'Vælg' || filteredState[keys[i]] === 'Vælg infrastrukturforvalter' || filteredState[keys[i]] === 'Vælg station' || filteredState[keys[i]] === 'Vælg trolje' || filteredState[keys[i]] === 'Vælg strækning') {
      filteredState[keys[i]] = undefined
    }
  }
  console.log(filteredState)
  let string = JSON.stringify(filteredState, null, 1)
  return string

}
const toggleShowInfo = e => {
  e.preventDefault()
  setShowInfo(!showInfo)
}

const onChange = e => {
  setState({...state, [e.target.name]:e.target.value})
}

const onChangeCheckBox = e => {
  setState({...state, [e.target.name]:e.target.checked})
}

const onChangeinfrastrukturforvalter = e => {
  setState({...state, infrastrukturforvalter:e.value})
}
const onChangeStation1 = e => {
  setState({...state, station1:e.value})
}
const onChangeStation2 = e => {
  setState({...state, station2:e.value})
}
const onChangeStation3 = e => {
  setState({...state, station3:e.value})
}
const onChangeTrolje1 = e => {
  setState({...state, trolje1:e.value})
}
const onChangeTrolje2 = e => {
  setState({...state, trolje2:e.value})
}
const onChangeStraekning1 = e => {
  setState({...state, straekning1:e.value})
}
const onChangeStraekning2 = e => {
  setState({...state, straekning2:e.value})
}
const onChangeStraekning3 = e => {
  setState({...state, straekning3:e.value})
}
const onChangeStraekning4 = e => {
  setState({...state, straekning4:e.value})
}
const onChangeStraekning5 = e => {
  setState({...state, straekning5:e.value})
}

const greenTick = <InlineSVG src={tick} />
const redX = <InlineSVG src={cancel} />
const questionMark = <InlineSVG className="questionmark" src={question} />

const validateName = name => {
  if( name.length < 5 && !name.match(/\d/) ) {
    return {
      jsx: null,
      bool: false
    }
  }
  if( name.match(/\d/) ) {
  return {
    jsx: <>{redX}<p className="error-message" >Navn må ikke indeholde tal</p></>,
    bool: false
  }
  } else {
    return {
      jsx: greenTick,
      bool: true
    }
  }
}

const validateDate = date => {
  if( date.length < 10 ) {
    return {
      jsx: null,
      bool: false
    }
  }
  if( !date.match(/^\d{2}-\d{2}-\d{4}$/) )  {
    return {
      jsx: <>{redX}<p className="error-message" >Forkert dato format, brug dd-mm-åååå</p></>,
      bool: false
    }
  }
  if( compareDates(date, findTomorrow('yyyy-mm-dd'))) {
    return {
      jsx: <>{redX}<p className="error-message" >Dato må ikke være i fremtiden</p></>,
      bool: false
    }
  } else {
      return {
        jsx: greenTick,
        bool: true
      }
  }
}

const validateMedarbejderNummer = nummer => {
  if( nummer.length < 4 ) {
    return {
      jsx: null,
      bool: false
    }
  }
  if( nummer.match(/^\d{4,5}$/) ) {
    return {
      jsx: greenTick,
      bool: true
    }
  } else {
    return {
      jsx: <>{redX}<p className="error-message" >Medarbejdernummer påkrævet</p></>,
      bool: false
    }
  }
}

const validateTimer = timer => {
  if (state.timer.length < 1) {
    return {
    jsx: null,
    bool: false
  }
}
  if(timer.match(/,/))
  setState({...state, timer: state.timer.replace(',','.')})
  if (state.timer.length > 0 && !(state.timer > 24) && !(state.timer < 0) ) {
    return {
      jsx: greenTick,
      bool: true
    }
  } else {
    return {
      jsx: <>{redX}<p className="error-message" >Maks 24 timer</p></>,
      bool: false
    }
  }
}

function findToday(format) {
let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
  if(format === 'dd-mm-yyyy') {
  return dd + '-' + mm + '-' + yyyy;
  }
  if(format === 'yyyy-mm-dd') {
  return yyyy + '-' + mm + '-' + dd;
  }
}
function findTomorrow(format) {
  let today = new Date(Date.now()+86400000);
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
    if(format === 'dd-mm-yyyy') {
    return dd + '-' + mm + '-' + yyyy;
    }
    if(format === 'yyyy-mm-dd') {
    return yyyy + '-' + mm + '-' + dd;
    }
  }
  function compareDates(dateFirstDate, yearFirstDate) {
    //convert dateFirstDate from dd-mm-yyyy to yyyy-mm-dd
    let datesArray = dateFirstDate.split('-')
    let yearFirstArray = []
    yearFirstArray[0] = datesArray[2]
    yearFirstArray[1] = datesArray[1]
    yearFirstArray[2] = datesArray[0]
    let convertedDate = yearFirstArray.join('-')
    console.log(convertedDate, yearFirstDate)
    return convertedDate > yearFirstDate
  }

  return (
    <div className="App">
      <h2>Registrering af Banekompetencer (RBK) </h2>
      <div className='form'>
          <b>Dato</b>
          <input maxLength="10" className="input-dato" placeholder="DD-MM-ÅÅÅÅ" value={state.dato} name="dato" onChange={onChange} >
          </input>
          {validateDate(state.dato).jsx}
        </div>
        <div className='form'>
          <b>Navn</b>
          <input className="input-navn" placeholder="Fulde navn" name="navn" onChange={onChange} >
          </input>
          {validateName(state.navn).jsx}
        </div>
        <div className='form'>
          <b>Medarbejdernummer</b>
          <input type="number" maxLength="4" className="input-medarbejdernummer" placeholder="4-5 cifre" name="medarbejdernummer" onChange={onChange} >
          </input>
          {validateMedarbejderNummer(state.medarbejdernummer).jsx}
        </div>
          <div className='form'>
            <h4>Funktion på denne vagt</h4>
          <input name="SR1" type="checkbox" onChange={onChangeCheckBox} >
          </input>
          <span>SR1 (OR1)</span>
        </div>
        <div className='form'>
          <input name="SR2" type="checkbox" onChange={onChangeCheckBox} >
          </input>
          <span>SR2 (OR1)</span>
        </div>
        <div className='form'>
          <input name="maskinforer" type="checkbox" onChange={onChangeCheckBox} >
          </input>
          <span>Maskinfører (PPPBMF)</span>
        </div>
        <div className='form'>
          <input name="rangerleder" type="checkbox" onChange={onChangeCheckBox} >
          </input>
          <span>Rangerleder</span>
        </div>
        <div className='form'>
          <input name="lokomotivforer" type="checkbox" onChange={onChangeCheckBox} >
          </input>
          <span>Lokomotivfører</span>
        </div>
        {(state.SR1 || state.SR2) && <div className='form'>
          <span className="h4span">Infrastrukturforvalter?</span> <span onClick={toggleShowInfo} >{questionMark}</span>
          {showInfo && <p className="info">Hvis du arbejder på Århus letbane, vælg Århus Letbane, ellers vælg Banedanmark.</p>}
          <Dropdown label="infrastrukturforvalter" options={infrastrukturforvalterOptions} onChange={onChangeinfrastrukturforvalter} value={state.infrastrukturforvalter} placeholder="Select an option" />
        </div>}
        {(state.SR1 || state.SR2 || state.rangerleder || state.lokomotivforer) && <>
        <div className='form'>
            <h4>Virksomhedsuddannelse</h4>
          <input name="modtagetvirksomhedsuddannelse" type="checkbox" onChange={onChangeCheckBox} >
          </input>
          <span className="margin">Modtaget</span>
          {state.modtagetvirksomhedsuddannelse &&
          <div className="form" >
          <p className="margin" >Givet af</p>
          <input className="input-givet-af" placeholder="Fulde navn" name="uddannelsegivetaf" onChange={onChange} >
          </input>
          {validateName(state.uddannelsegivetaf).jsx}
          </div>}
        </div>
          </>}
          {(state.rangerleder || state.lokomotivforer) && <>
          <div className='form'>
          <h4>Stationer</h4>
          <Dropdown options={stationOptions} onChange={onChangeStation1} value={state.station1} placeholder="Select an option" />
          </div>
          {state.station1 !== 'Vælg station' &&
          <div className='form'>
          <Dropdown options={stationOptions} onChange={onChangeStation2} value={state.station2} placeholder="Select an option" />
          </div>}
          {state.station2 !== 'Vælg station' &&
          <div className='form'>
          <Dropdown options={stationOptions} onChange={onChangeStation3} value={state.station3} placeholder="Select an option" />
          </div>}
        </>}
        {state.lokomotivforer && <>
          <div className='form'>
          <h4>Litra</h4>
          <Dropdown options={troljeoptions} onChange={onChangeTrolje1} value={state.trolje1} placeholder="Select an option" />
          </div>
          {state.trolje1 !== 'Vælg trolje' &&
          <div className='form'>
          <Dropdown options={troljeoptions} onChange={onChangeTrolje2} value={state.trolje2} placeholder="Select an option" />
          </div>}
          <div className='form'>
          <h4>Strækninger</h4>
          <Dropdown options={straekningOptions} onChange={onChangeStraekning1} value={state.straekning1} placeholder="Select an option" />
          </div>
          {state.straekning1 !== 'Vælg strækning' &&
          <div className='form'>
          <Dropdown options={straekningOptions} onChange={onChangeStraekning2} value={state.straekning2} placeholder="Select an option" />
          </div>}
          {state.straekning2 !== 'Vælg strækning' &&
          <div className='form'>
          <Dropdown options={straekningOptions} onChange={onChangeStraekning3} value={state.straekning3} placeholder="Select an option" />
          </div>}
          {state.straekning3 !== 'Vælg strækning' &&
          <div className='form'>
          <Dropdown options={straekningOptions} onChange={onChangeStraekning4} value={state.straekning4} placeholder="Select an option" />
          </div>}
          {state.straekning4 !== 'Vælg strækning' &&
          <div className='form'>
          <Dropdown options={straekningOptions} onChange={onChangeStraekning5} value={state.straekning5} placeholder="Select an option" />
        </div>}
        </>}
          {state.lokomotivforer && <div className='form'>
          <b>Antal kørte timer</b>
          <input type="number" min="1" max="24" className="input-timer" placeholder="" name="timer" onChange={onChange} >
          </input>
          {validateTimer(state.timer).jsx}
        </div>}
          <div className='form'>
          <b>Bemærkninger</b>
          <textarea className="input-bemarkninger" placeholder="Eventuelle bemærkninger" name="bemaerkninger" onChange={onChange} >
          </textarea>
        </div>
        <div className='Form'>
          <button onClick={onSubmit}>
            <h4>Insend</h4>
          </button>
        </div>

    </div>
  )
}

export default App;
