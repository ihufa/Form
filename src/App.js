import React, { useState } from 'react';
import './App.css';
import 'react-dropdown/style.css'
import InlineSVG from 'svg-inline-react';
import Select from 'react-select'

// SVGs
import { tick } from './tick'
import { cancel } from './cancel'
import { question } from './question'
import { stationOptions }from './dropdownOptions/stationOptions'
import { straekningOptions } from './dropdownOptions/straekningsOptions'
import { troljeOptions } from './dropdownOptions/troljeOptions'
const infrastrukturforvalterOptions = [{label: 'Aarhus letbane', value: 'Aarhus letbane'},{label: 'Banedanmark', value: 'Banedanmark'}]

function App() {

const [state, setState] = useState({
  dato: findToday('dd-mm-yyyy'),
  navn: undefined,
  medarbejdernummer: '',
  infrastrukturforvalter: undefined,
  modtagetvirksomhedsuddannelse: false,
  uddannelsegivetaf: undefined,
  SR1: false,
  SR2: false,
  maskinforer: false,
  rangerleder: false,
  lokomotivforer: false,
  station1: undefined,
  station2: undefined,
  station3: undefined,
  trolje1: undefined,
  trolje2: undefined,
  straekning1: undefined,
  straekning2: undefined,
  straekning3: undefined,
  straekning4: undefined,
  straekning5: undefined,
  timer: undefined,
  bemaerkninger: undefined
})
const [ showInfo, setShowInfo ] = useState(false)

const onSubmit = e => {
  if(validateDate(state.dato).bool && validateName(state.navn).bool && validateMedarbejderNummer(state.medarbejdernummer).bool && (
    state.SR1 | state.SR2 | state.maskinforer | state.rangerleder | state.lokomotivforer
  )) {
  window.open(`mailto:gitte.grys@outlook.dk?subject=RBK_formular123456&body=${stateObjToCsv(state)}`)
  alert('Åbner outlook for at sende formularen per mail')
  } else {
    alert('Manglende information registreret')
  }
}
const stateObjToCsv = (obj) => {
  let filteredState = {...obj}
  Object.keys(filteredState).forEach(key => {
    console.log(filteredState[key])
    console.log(typeof(filteredState[key]))
    if(typeof(filteredState[key]) === 'object') {
      filteredState[key] = filteredState[key].label
    }
  })

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
  if(state.SR1 === true) {
    document.getElementById('SR1').click()
  }
  if(state.SR2 === true) {
    document.getElementById('SR2').click()
  }
  if(state.maskinforer === true) {
    document.getElementById('maskinforer').click()
}
  if(state.rangerleder === true) {
    document.getElementById('rangerleder').click()
  }
  if(state.lokomotivforer === true) {
    document.getElementById('lokomotivforer').click()
  }
  setState({...state, 
    SR1: false,
    SR2: false,
    maskinforer: false,
    rangerleder: false,
    lokomotivforer: false,
    [e.target.name]:e.target.checked})
}
const onChangeModtagetUddannelse = e => {
  setState({...state, 
    [e.target.name]:e.target.checked})
}
const onChangeMedarbejderNummer = e => {
  console.log(e.target.value)
  if(e.target.value < 99999) {
    setState({...state, medarbejdernummer: e.target.value})
  } 
}
const onChangeinfrastrukturforvalter = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, infrastrukturforvalter:undefined})
    return
  }
  setState({...state, infrastrukturforvalter:e})
}
const onChangeStation1 = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, station1:undefined})
    return
  }
  setState({...state, station1:e})
}
const onChangeStation2 = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, station2:undefined})
    return
  }
  setState({...state, station2:e})
}
const onChangeStation3 = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, station3:undefined})
    return
  }
  setState({...state, station3:e})
}
const onChangeTrolje1 = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, trolje1:undefined})
    return
  }
  setState({...state, trolje1:e})
}
const onChangeTrolje2 = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, trolje2:undefined})
    return
  }
  setState({...state, trolje2:e})
}
const onChangeStraekning1 = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, straekning1:undefined})
    return
  }
  setState({...state, straekning1:e})
}
const onChangeStraekning2 = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, straekning2:undefined})
    return
  }
  setState({...state, straekning2:e})
}
const onChangeStraekning3 = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, straekning3:undefined})
    return
  }
  setState({...state, straekning3:e})
}
const onChangeStraekning4 = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, straekning4:undefined})
    return
  }
  setState({...state, straekning4:e})
}
const onChangeStraekning5 = e => {
  if(e.label.substr(0,4) === 'Vælg') {
    setState({...state, straekning5:undefined})
    return
  }
  setState({...state, straekning5:e})
}

const greenTick = <InlineSVG src={tick} />
const redX = <InlineSVG src={cancel} />
const questionMark = <InlineSVG className="questionmark" src={question} />

const validateName = name => {
if(!name) {
  return {
    jsx: null,
    bool: false
  }
}
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
  if(date) {
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
  if(!timer) {
    return {
      jsx: null,
      bool: false
    }
  }
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
function padStartPolyfill(date) {
  if(date < 10) {
    return '0'.concat(date)
  } else {
    return date
  }
}

function findToday(format) {
let today = new Date();
const dd = padStartPolyfill(today.getDate());
const mm = padStartPolyfill(today.getMonth() + 1) // January is 0!
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
  const dd = padStartPolyfill(today.getDate());
  const mm = padStartPolyfill(today.getMonth() + 1) // January is 0!
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
          <input type="number" className="input-medarbejdernummer" value={state.medarbejdernummer} placeholder="4-5 cifre" name="medarbejdernummer" onChange={onChangeMedarbejderNummer} >
          </input>
          {validateMedarbejderNummer(state.medarbejdernummer).jsx}
        </div>
          <div className='form'>
            <h4>Funktion på denne vagt</h4>
          <input name="SR1" id="SR1" type="checkbox" className="checkbox-custom" onChange={onChangeCheckBox} >
          </input>
          <span>SR1 (OR1)</span>
        </div>
        <div className='form'>
          <input name="SR2" id="SR2" type="checkbox" className="checkbox-custom" onChange={onChangeCheckBox} >
          </input>
          <span>SR2 (OR1)</span>
        </div>
        <div className='form'>
          <input name="maskinforer" id="maskinforer" type="checkbox" className="checkbox-custom" onChange={onChangeCheckBox} >
          </input>
          <span>Maskinfører (PPPBMF)</span>
        </div>
        <div className='form'>
          <input name="rangerleder" id="rangerleder" type="checkbox" className="checkbox-custom" onChange={onChangeCheckBox} >
          </input>
          <span>Rangerleder</span>
        </div>
        <div className='form'>
          <input name="lokomotivforer" id="lokomotivforer" type="checkbox" className="checkbox-custom" onChange={onChangeCheckBox} >
          </input>
          <span>Lokomotivfører</span>
        </div>
        {(state.SR1 || state.SR2) && <div className='form'>
          <span className="h4span">Infrastrukturforvalter?</span> <span onClick={toggleShowInfo} >{questionMark}</span>
          {showInfo && <p className="info">Hvis du arbejder på Århus letbane, vælg Århus Letbane, ellers vælg Banedanmark.</p>}
            <Select
              value={state.infrastrukturforvalter}
              onChange={onChangeinfrastrukturforvalter}
              options={infrastrukturforvalterOptions}
              placeholder='Vælg infrastrukturforvalter'
              className='dropdown'
            />
        </div>}
        {(state.SR1 || state.SR2 || state.rangerleder || state.lokomotivforer) && <>
        <div className='form'>
            <h4>Virksomhedsuddannelse</h4>
          <input name="modtagetvirksomhedsuddannelse" type="checkbox" id="modtagetvirksomhedsuddannelse" className="checkbox-custom" onChange={onChangeModtagetUddannelse} >
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
          {(state.rangerleder || state.lokomotivforer) && 
        <>
          <div className='form'>
          <h4>Stationer</h4>
          <Select
            value={state.station1}
            onChange={onChangeStation1}
            options={stationOptions}
            className='dropdown'
            placeholder='Vælg station'
          />
          </div>
        {state.station1 && 
        <div className='form'>
          <Select
            value={state.station2}
            onChange={onChangeStation2}
            options={stationOptions}
            className='dropdown'
            placeholder='Vælg station'

          />
          </div>}
        {state.station2 &&
        <div className='form'>
        <Select
          value={state.station3}
          onChange={onChangeStation3}
          options={stationOptions}
          className='dropdown'
          placeholder='Vælg station'
        />
        </div>}
        </>}
        {state.lokomotivforer && <>
        <div className='form'>
        <h4>Litra</h4>
          <Select
            value={state.strolje1}
            onChange={onChangeTrolje1}
            options={troljeOptions}
            className='dropdown'
            placeholder='Vælg trolje'
          />
          </div>
          {state.trolje1 && 
        <div className='form'>
          <Select
            value={state.strolje2}
            onChange={onChangeTrolje2}
            options={troljeOptions}
            className='dropdown'
            placeholder='Vælg trolje'
          />
          </div>}

          <div className='form'>
          <h4>Strækninger</h4>
          <Select
            value={state.straekning1}
            onChange={onChangeStraekning1}
            options={straekningOptions}
            className='dropdown'
            placeholder='Vælg strækning'
          />
          </div>
          {state.straekning1 &&
          <div className='form'>
          <Select
            value={state.straekning2}
            onChange={onChangeStraekning2}
            options={straekningOptions}
            className='dropdown'
            placeholder='Vælg strækning'
          />
          </div>}
          {state.straekning2 &&
          <div className='form'>
          <Select
            value={state.straekning3}
            onChange={onChangeStraekning3}
            options={straekningOptions}
            className='dropdown'
            placeholder='Vælg strækning'
          />
          </div>}
          {state.straekning3 &&
          <div className='form'>
          <Select
            value={state.straekning4}
            onChange={onChangeStraekning4}
            options={straekningOptions}
            className='dropdown'
            placeholder='Vælg strækning'
          />
          </div>}
          {state.straekning4 &&
          <div className='form'>
          <Select
            value={state.straekning5}
            onChange={onChangeStraekning5}
            options={straekningOptions}
            className='dropdown'
            placeholder='Vælg strækning'
          />
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
