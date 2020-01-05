import React, {useState, useEffect} from 'react';
import './App.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import InlineSVG from 'svg-inline-react';

// SVGs
import { tick } from './tick'
import { cancel } from './cancel'

function App() {
const stationOptions = ['vælg station', 'stationA', 'stationB', 'stationC']
const straekningOptions = ['Vælg strækning','station1','station2','station3']
const jernbaneVirksomhedOptions = ['Vælg jernbanevirksomhed', 'Banedanmark', 'A', 'B']
const troljeoptions = ['Vælg trolje','trolje1','trolje2','trolje3']

const [state, setState] = useState({
  dato: findToday(),
  navn: 'Vælg',
  medarbejdernummer: '',
  jernbanevirksomhed: 'Vælg',
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
  timer: 'Vælg',
  bemaerkninger: 'Vælg'
})

const onSubmit = e => {
  if(validateDate(state.dato).bool && validateName(state.navn).bool && validateMedarbejderNummer(state.medarbejdernummer).bool && validateTimer(state.timer).bool) {
  window.open(`mailto:gitte.grys@outlook.dk?subject=RBK_formular123456&body=${arrayToCSV(state)}`)
  alert('Åbner outlook for at sende formularen per mail')
  } else {
    alert('Manglende information registreret')
  }
}
const arrayToCSV = (obj) => {
  return JSON.stringify(obj)
}

const onChange = e => {
  setState({...state, [e.target.name]:e.target.value})
}

const onChangeCheckBox = e => {
  setState({...state, [e.target.name]:e.target.checked})
}

const onChangeJernbaneVirksomhed = e => {
  setState({...state, jernbanevirksomhed:e.value})
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

const validateName = name => {
  if( name.length < 5 ) {
    return {
      jsx: null,
      bool: false
    }
  }
  if( name.match(/\d/) ) {
  return {
    jsx: <>{redX}<p>Navn må ikke indeholde tal</p></>,
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
  if( date.match(/^\d{2}-\d{2}-\d{4}$/) ) {
    return {
      jsx: greenTick,
      bool: true
    }
  } else {
    return {
      jsx: <>{redX}<p>Forkert dato format, brug dd-mm-åååå</p></>,
      bool: false
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
  if( nummer.match(/^\d{4}$/) ) {
    return {
      jsx: greenTick,
      bool: true
    }
  } else {
    return {
      jsx: <>{redX}<p>Medarbejdernummer består af 4 cifre</p></>,
      bool: false
    }
  }
}

const validateTimer = timer => {
  if ( state.timer.match(/\d{1,}/) ) {
    return {
      jsx: greenTick,
      bool: true
    }
  } else {
    return {
      jsx: null,
      bool: false
    }
  }
}

function findToday() {
let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
return mm + '-' + dd + '-' + yyyy;
}

  return (
    <div className="App">
      <h2>Registrering af banekompetencer (RBK) </h2>
      <div className='form'>
          <b>Dato</b>
          <input maxlength="10" className="input-dato" placeholder="DD-MM-ÅÅÅÅ" value={state.dato} name="dato" onChange={onChange} >
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
          <input maxlength="4" className="input-medarbejdernummer" placeholder="F.eks. 1234" name="medarbejdernummer" onChange={onChange} >
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
        {(state.SR1 || state.SR2 || state.rangerleder) && <>
        <div className='form'>
          <h4>Jernbanevirksomhed?</h4>
          <Dropdown label="jernbanevirksomhed" options={stationOptions} onChange={onChangeJernbaneVirksomhed} value={state.jernbanevirksomhed} placeholder="Select an option" />
        </div>
        <div className='form'>
            <h4>Virksomhedsuddannelse</h4>
          <input name="modtagetvirksomhedsuddannelse" type="checkbox" onChange={onChangeCheckBox} >
          </input>
          <span>Modtaget</span>
          {state.modtagetvirksomhedsuddannelse &&
          <p>
          <span>Givet af         </span>
          <input className="input-givet-af" placeholder="Fulde navn" name="uddannelsegivetaf" onChange={onChange} >
          </input>
          </p>}
        </div>
          <div className='form'>
          <Dropdown options={stationOptions} onChange={onChangeStation1} value={state.station1} placeholder="Select an option" />
          </div>
          <div className='form'>
          <Dropdown options={stationOptions} disabled={state.station1 === 'Vælg station'} onChange={onChangeStation2} value={state.station2} placeholder="Select an option" />
          </div>
          <div className='form'>
          <Dropdown options={stationOptions} disabled={state.station2 === 'Vælg station'} onChange={onChangeStation3} value={state.station3} placeholder="Select an option" />
          </div>
        </>}
        {state.lokomotivforer && <>
          <div className='form'>
          <Dropdown options={troljeoptions} onChange={onChangeTrolje1} value={state.trolje1} placeholder="Select an option" />
          </div>
          <div className='form'>
          <Dropdown options={troljeoptions} disabled={state.trolje1 === 'Vælg trolje'} onChange={onChangeTrolje2} value={state.trolje2} placeholder="Select an option" />
          </div>
          <div className='form'>
          <Dropdown options={straekningOptions} onChange={onChangeStraekning1} value={state.straekning1} placeholder="Select an option" />
          </div>
          <div className='form'>
          <Dropdown options={straekningOptions} disabled={state.straekning1 === 'Vælg strækning'} onChange={onChangeStraekning2} value={state.straekning2} placeholder="Select an option" />
          </div>
          <div className='form'>
          <Dropdown options={straekningOptions} disabled={state.straekning2 === 'Vælg strækning'} onChange={onChangeStraekning3} value={state.straekning3} placeholder="Select an option" />
          </div>
          <div className='form'>
          <Dropdown options={straekningOptions} disabled={state.straekning3 === 'Vælg strækning'} onChange={onChangeStraekning4} value={state.straekning4} placeholder="Select an option" />
          </div>
          <div className='form'>
          <Dropdown options={straekningOptions} disabled={state.straekning4 === 'Vælg strækning'} onChange={onChangeStraekning5} value={state.straekning5} placeholder="Select an option" />
          </div></>}
          <div className='form'>
          <b>Antal kørte timer</b>
          <input className="input-timer" placeholder="F.eks. 5.5" name="timer" onChange={onChange} >
          </input>
          {validateTimer(state.timer).jsx}
        </div>
          <div className='form'>
          <b>Bemærkninger</b>
          <textarea className="input-bemarkninger" placeholder="Eventuelle bemærkninger" name="bemaerkninger" onChange={onChange} >
          </textarea>
        </div>
        <div className='App'>
          <button onClick={onSubmit}>
            <h4>Insend</h4>
          </button>
        </div>

    </div>
  )
}

export default App;
