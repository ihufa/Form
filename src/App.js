import React, { useState } from "react"
import "./App.css"
import "react-dropdown/style.css"
import InlineSVG from "svg-inline-react"
import Select from "react-select"

// SVGs
import { tick } from "./tick"
import { cancel } from "./cancel"
import { question } from "./question"
import { stationOptions } from "./dropdownOptions/stationOptions"
import { straekningOptions } from "./dropdownOptions/straekningsOptions"
import { troljeOptions } from "./dropdownOptions/troljeOptions"
const infrastrukturforvalterOptions = [
  { label: "Aarhus letbane", value: "Aarhus letbane" },
  { label: "Banedanmark", value: "Banedanmark" },
]

function App() {
  const [state, setState] = useState({
    timer: undefined,
    bemaerkninger: undefined,
    dato: findToday("yyyy-mm-dd"),
    faldendeKm1: false,
    faldendeKm2: false,
    faldendeKm3: false,
    faldendeKm4: false,
    faldendeKm5: false,
    infrastrukturforvalter: undefined,
    lokomotivforer: false,
    medarbejdernummer: "",
    navn: undefined,
    uddannelsegivetaf: undefined,
    rangerleder: false,
    SR1: false,
    SR2: false,
    maskinforer: false,
    stigendeKm1: false,
    stigendeKm2: false,
    stigendeKm3: false,
    stigendeKm4: false,
    stigendeKm5: false,
    modtagetvirksomhedsuddannelse: false,
    station1: undefined,
    station2: undefined,
    station3: undefined,
    straekning1: undefined,
    straekning2: undefined,
    straekning3: undefined,
    straekning4: undefined,
    straekning5: undefined,
    trolje1: undefined,
    trolje2: undefined,
  })
  const [showInfo, setShowInfo] = useState(false)

  const line1 =
    "Antal kørte timer%09Bemærkninger%09Dato%09Faldende KM%09Faldende KM_2%09Faldende KM_3%09Faldende KM_4%09Faldende KM_5%09Inf_Forvalt%09Lokomotivfører%09Medarbejdernummer%09Navn%09Navn_Virksomhedsudd%09Rangerleder%09SR1%09SR2%09Sporkyndigsporteknik%09Stigende KM%09Stigende KM_2%09Stigende KM_3%09Stigende KM_4%09Stigende KM_5%09Virksomhedsudd%09Vælg en station 1%09Vælg en station 2%09Vælg en station 3%09Vælg en strækning 1%09Vælg en strækning 2%09Vælg en strækning 3%09Vælg en strækning 4%09Vælg en strækning 5%09Vælg en trolje 1%09Vælg en trolje 2"
  const createDataLine2String = () => {
    let data = ""
    const lengthOfStateObj = Object.keys(state).length - 1
    console.log(Object.keys(state))
    for (let i = 0; i < lengthOfStateObj; i++) {
      let value = state[Object.keys(state)[i]]
      console.log(value)
      if (i === 0) {
        if (value) {
          //first value has no tab in front, and first value is 'timer'
          data = data.concat(value)
        } else {
          data = data.concat("Off")
        }
      } else if (!value) {
        data = data.concat("%09Off")
      } else if (value === true) {
        data = data.concat("%09On")
      } else if (typeof value === "object") {
        data = data.concat(`%09${value.value}`)
      } else {
        data = data.concat(`%09${value}`)
      }
    }
    return data
  }

  const onSubmit = (e) => {
    if (
      // validateDate(state.dato).bool &&
      // validateName(state.navn).bool &&
      // validateMedarbejderNummer(state.medarbejdernummer).bool &&
      // state.SR1 |
      //   state.SR2 |
      //   state.maskinforer |
      //   state.rangerleder |
      //   state.lokomotivforer
      true
    ) {
      const finalString = line1.concat("%0D%0A").concat(createDataLine2String())
      console.log(finalString)
      window.open(
        `mailto:gitte.grys@outlook.dk?subject=RBK_formular123456&body=${finalString}`
      )
    } else {
      alert("Manglende information registreret")
    }
  }

  const toggleShowInfo = (e) => {
    e.preventDefault()
    setShowInfo(!showInfo)
  }

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onChangeCheckBox = (e) => {
    if (state.SR1 === true) {
      document.getElementById("SR1").click()
    }
    if (state.SR2 === true) {
      document.getElementById("SR2").click()
    }
    if (state.maskinforer === true) {
      document.getElementById("maskinforer").click()
    }
    if (state.rangerleder === true) {
      document.getElementById("rangerleder").click()
    }
    if (state.lokomotivforer === true) {
      document.getElementById("lokomotivforer").click()
    }
    setState({
      ...state,
      SR1: false,
      SR2: false,
      maskinforer: false,
      rangerleder: false,
      lokomotivforer: false,
      [e.target.name]: e.target.checked,
    })
  }
  const onChangeModtagetUddannelse = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }
  const onChangeMedarbejderNummer = (e) => {
    console.log(e.target.value)
    if (e.target.value < 99999) {
      setState({ ...state, medarbejdernummer: e.target.value })
    }
  }
  const onChangeinfrastrukturforvalter = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, infrastrukturforvalter: undefined })
      return
    }
    setState({ ...state, infrastrukturforvalter: e })
  }
  const onChangeStation1 = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, station1: undefined })
      return
    }
    setState({ ...state, station1: e })
  }
  const onChangeStation2 = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, station2: undefined })
      return
    }
    setState({ ...state, station2: e })
  }
  const onChangeStation3 = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, station3: undefined })
      return
    }
    setState({ ...state, station3: e })
  }
  const onChangeTrolje1 = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, trolje1: undefined })
      return
    }
    setState({ ...state, trolje1: e })
  }
  const onChangeTrolje2 = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, trolje2: undefined })
      return
    }
    setState({ ...state, trolje2: e })
  }
  const onChangeStraekning1 = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, straekning1: undefined })
      return
    }
    setState({ ...state, straekning1: e })
  }
  const onChangeStraekning2 = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, straekning2: undefined })
      return
    }
    setState({ ...state, straekning2: e })
  }
  const onChangeStraekning3 = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, straekning3: undefined })
      return
    }
    setState({ ...state, straekning3: e })
  }
  const onChangeStraekning4 = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, straekning4: undefined })
      return
    }
    setState({ ...state, straekning4: e })
  }
  const onChangeStraekning5 = (e) => {
    if (e.label.substr(0, 4) === "Vælg") {
      setState({ ...state, straekning5: undefined })
      return
    }
    setState({ ...state, straekning5: e })
  }

  const setStigendeKm = (number, value) => {
    setState({
      ...state,
      [`faldendeKm${number}`]: !value,
      [`stigendeKm${number}`]: value,
    })
  }

  const greenTick = <InlineSVG src={tick} />
  const redX = <InlineSVG src={cancel} />
  const questionMark = <InlineSVG className="questionmark" src={question} />

  const validateName = (name) => {
    if (!name) {
      return {
        jsx: null,
        bool: false,
      }
    }
    if (name.length < 5 && !name.match(/\d/)) {
      return {
        jsx: null,
        bool: false,
      }
    }
    if (name.match(/\d/)) {
      return {
        jsx: (
          <>
            {redX}
            <p className="error-message">Navn må ikke indeholde tal</p>
          </>
        ),
        bool: false,
      }
    } else {
      return {
        jsx: greenTick,
        bool: true,
      }
    }
  }

  const validateDate = (date) => {
    if (date) {
      if (date.length < 10) {
        return {
          jsx: null,
          bool: false,
        }
      }
      if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return {
          jsx: (
            <>
              {redX}
              <p className="error-message">
                Forkert dato format, brug dd-mm-åååå
              </p>
            </>
          ),
          bool: false,
        }
      }
      if (date > findTomorrow("yyyy-mm-dd")) {
        return {
          jsx: (
            <>
              {redX}
              <p className="error-message">Dato må ikke være i fremtiden</p>
            </>
          ),
          bool: false,
        }
      } else {
        return {
          jsx: greenTick,
          bool: true,
        }
      }
    }
  }

  const validateMedarbejderNummer = (nummer) => {
    if (nummer.length < 4) {
      return {
        jsx: null,
        bool: false,
      }
    }
    if (nummer.match(/^\d{4,5}$/)) {
      return {
        jsx: greenTick,
        bool: true,
      }
    } else {
      return {
        jsx: (
          <>
            {redX}
            <p className="error-message">Medarbejdernummer påkrævet</p>
          </>
        ),
        bool: false,
      }
    }
  }

  const validateTimer = (timer) => {
    if (!timer) {
      return {
        jsx: null,
        bool: false,
      }
    }
    if (state.timer.length < 1) {
      return {
        jsx: null,
        bool: false,
      }
    }
    if (timer.match(/,/))
      setState({ ...state, timer: state.timer.replace(",", ".") })
    if (state.timer.length > 0 && !(state.timer > 24) && !(state.timer < 0)) {
      return {
        jsx: greenTick,
        bool: true,
      }
    } else {
      return {
        jsx: (
          <>
            {redX}
            <p className="error-message">Maks 24 timer</p>
          </>
        ),
        bool: false,
      }
    }
  }
  function padStartPolyfill(date) {
    if (date < 10) {
      return "0".concat(date)
    } else {
      return date
    }
  }

  function findToday(format) {
    let today = new Date()
    const dd = padStartPolyfill(today.getDate())
    const mm = padStartPolyfill(today.getMonth() + 1) // January is 0!
    const yyyy = today.getFullYear()
    if (format === "dd-mm-yyyy") {
      return dd + "-" + mm + "-" + yyyy
    }
    if (format === "yyyy-mm-dd") {
      return yyyy + "-" + mm + "-" + dd
    }
  }
  function findTomorrow(format) {
    let today = new Date(Date.now() + 86400000)
    const dd = padStartPolyfill(today.getDate())
    const mm = padStartPolyfill(today.getMonth() + 1) // January is 0!
    const yyyy = today.getFullYear()
    if (format === "dd-mm-yyyy") {
      return dd + "-" + mm + "-" + yyyy
    }
    if (format === "yyyy-mm-dd") {
      return yyyy + "-" + mm + "-" + dd
    }
  }

  return (
    <div className="App">
      <h2>Registrering af Banekompetencer (RBK) </h2>
      <div className="form">
        <b>Dato</b>
        <input
          maxLength="10"
          className="input-dato"
          placeholder="DD-MM-ÅÅÅÅ"
          value={state.dato}
          name="dato"
          onChange={onChange}></input>
        {validateDate(state.dato).jsx}
      </div>
      <div className="form">
        <b>Navn</b>
        <input
          className="input-navn"
          placeholder="Fulde navn"
          name="navn"
          onChange={onChange}></input>
        {validateName(state.navn).jsx}
      </div>
      <div className="form">
        <b>Medarbejdernummer</b>
        <input
          type="number"
          className="input-medarbejdernummer"
          value={state.medarbejdernummer}
          placeholder="4-5 cifre"
          name="medarbejdernummer"
          onChange={onChangeMedarbejderNummer}></input>
        {validateMedarbejderNummer(state.medarbejdernummer).jsx}
      </div>
      <div className="form">
        <h4>Funktion på denne vagt</h4>
        <input
          name="SR1"
          id="SR1"
          type="checkbox"
          className="checkbox-custom"
          onChange={onChangeCheckBox}></input>
        <span>SR1 (OR1)</span>
      </div>
      <div className="form">
        <input
          name="SR2"
          id="SR2"
          type="checkbox"
          className="checkbox-custom"
          onChange={onChangeCheckBox}></input>
        <span>SR2 (OR1)</span>
      </div>
      <div className="form">
        <input
          name="maskinforer"
          id="maskinforer"
          type="checkbox"
          className="checkbox-custom"
          onChange={onChangeCheckBox}></input>
        <span>Maskinfører (PPPBMF)</span>
      </div>
      <div className="form">
        <input
          name="rangerleder"
          id="rangerleder"
          type="checkbox"
          className="checkbox-custom"
          onChange={onChangeCheckBox}></input>
        <span>Rangerleder</span>
      </div>
      <div className="form">
        <input
          name="lokomotivforer"
          id="lokomotivforer"
          type="checkbox"
          className="checkbox-custom"
          onChange={onChangeCheckBox}></input>
        <span>Lokomotivfører</span>
      </div>
      {(state.SR1 || state.SR2) && (
        <div className="form">
          <span className="h4span">Infrastrukturforvalter?</span>{" "}
          <span onClick={toggleShowInfo}>{questionMark}</span>
          {showInfo && (
            <p className="info">
              Hvis du arbejder på Århus letbane, vælg Århus Letbane, ellers vælg
              Banedanmark.
            </p>
          )}
          <Select
            value={state.infrastrukturforvalter}
            onChange={onChangeinfrastrukturforvalter}
            options={infrastrukturforvalterOptions}
            placeholder="Vælg infrastrukturforvalter"
            className="dropdown"
          />
        </div>
      )}
      {(state.SR1 ||
        state.SR2 ||
        state.rangerleder ||
        state.lokomotivforer) && (
        <>
          <div className="form">
            <h4>Virksomhedsuddannelse</h4>
            <input
              name="modtagetvirksomhedsuddannelse"
              type="checkbox"
              id="modtagetvirksomhedsuddannelse"
              className="checkbox-custom"
              onChange={onChangeModtagetUddannelse}></input>
            <span className="margin">Modtaget</span>
            {state.modtagetvirksomhedsuddannelse && (
              <div className="form">
                <p className="margin">Givet af</p>
                <input
                  className="input-givet-af"
                  placeholder="Fulde navn"
                  name="uddannelsegivetaf"
                  onChange={onChange}></input>
                {validateName(state.uddannelsegivetaf).jsx}
              </div>
            )}
          </div>
        </>
      )}
      {(state.rangerleder || state.lokomotivforer) && (
        <>
          <div className="form">
            <h4>Stationer</h4>
            <Select
              value={state.station1}
              onChange={onChangeStation1}
              options={stationOptions}
              className="dropdown"
              placeholder="Vælg station"
            />
          </div>
          {state.station1 && (
            <div className="form">
              <Select
                value={state.station2}
                onChange={onChangeStation2}
                options={stationOptions}
                className="dropdown"
                placeholder="Vælg station"
              />
            </div>
          )}
          {state.station2 && (
            <div className="form">
              <Select
                value={state.station3}
                onChange={onChangeStation3}
                options={stationOptions}
                className="dropdown"
                placeholder="Vælg station"
              />
            </div>
          )}
        </>
      )}
      {state.lokomotivforer && (
        <>
          <div className="form">
            <h4>Litra</h4>
            <Select
              value={state.strolje1}
              onChange={onChangeTrolje1}
              options={troljeOptions}
              className="dropdown"
              placeholder="Vælg trolje"
            />
          </div>
          {state.trolje1 && (
            <div className="form">
              <Select
                value={state.strolje2}
                onChange={onChangeTrolje2}
                options={troljeOptions}
                className="dropdown"
                placeholder="Vælg trolje"
              />
            </div>
          )}

          <div className="form">
            <h4>Strækninger</h4>
            <Select
              value={state.straekning1}
              onChange={onChangeStraekning1}
              options={straekningOptions}
              className="dropdown"
              placeholder="Vælg strækning"
            />
            <div className="kms">
              <span>Faldende KM</span>
              <input
                type="checkbox"
                checked={state.faldendeKm1}
                onClick={() => setStigendeKm(1, false)}
                className="checkbox-custom"></input>
              <div className="rightfloating">
                <span>Stigende KM</span>
                <input
                  type="checkbox"
                  checked={state.stigendeKm1}
                  onClick={() => setStigendeKm(1, true)}
                  className="checkbox-custom"></input>
              </div>
            </div>
          </div>
          {state.straekning1 && (
            <div className="form">
              <Select
                value={state.straekning2}
                onChange={onChangeStraekning2}
                options={straekningOptions}
                className="dropdown"
                placeholder="Vælg strækning"
              />
              <div className="kms">
                <span>Faldende KM</span>
                <input
                  type="checkbox"
                  checked={state.faldendeKm2}
                  onClick={() => setStigendeKm(2, false)}
                  className="checkbox-custom"></input>
                <div className="rightfloating">
                  <span>Stigende KM</span>
                  <input
                    type="checkbox"
                    checked={state.stigendeKm2}
                    onClick={() => setStigendeKm(2, true)}
                    className="checkbox-custom"></input>
                </div>
              </div>
            </div>
          )}
          {state.straekning2 && (
            <div className="form">
              <Select
                value={state.straekning3}
                onChange={onChangeStraekning3}
                options={straekningOptions}
                className="dropdown"
                placeholder="Vælg strækning"
              />
              <div className="kms">
                <span>Faldende KM</span>
                <input
                  type="checkbox"
                  checked={state.faldendeKm3}
                  onClick={() => setStigendeKm(3, false)}
                  className="checkbox-custom"></input>
                <div className="rightfloating">
                  <span>Stigende KM</span>
                  <input
                    type="checkbox"
                    checked={state.stigendeKm3}
                    onClick={() => setStigendeKm(3, true)}
                    className="checkbox-custom"></input>
                </div>
              </div>
            </div>
          )}
          {state.straekning3 && (
            <div className="form">
              <Select
                value={state.straekning4}
                onChange={onChangeStraekning4}
                options={straekningOptions}
                className="dropdown"
                placeholder="Vælg strækning"
              />
              <div className="kms">
                <span>Faldende KM</span>
                <input
                  type="checkbox"
                  checked={state.faldendeKm4}
                  onClick={() => setStigendeKm(4, false)}
                  className="checkbox-custom"></input>
                <div className="rightfloating">
                  <span>Stigende KM</span>
                  <input
                    type="checkbox"
                    checked={state.stigendeKm4}
                    onClick={() => setStigendeKm(4, true)}
                    className="checkbox-custom"></input>
                </div>
              </div>
            </div>
          )}
          {state.straekning4 && (
            <div className="form">
              <Select
                value={state.straekning5}
                onChange={onChangeStraekning5}
                options={straekningOptions}
                className="dropdown"
                placeholder="Vælg strækning"
              />
              <div className="kms">
                <span>Faldende KM</span>
                <input
                  type="checkbox"
                  checked={state.faldendeKm5}
                  onClick={() => setStigendeKm(5, false)}
                  className="checkbox-custom"></input>
                <div className="rightfloating">
                  <span>Stigende KM</span>
                  <input
                    type="checkbox"
                    checked={state.stigendeKm5}
                    onClick={() => setStigendeKm(5, true)}
                    className="checkbox-custom"></input>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {state.lokomotivforer && (
        <div className="form">
          <b>Antal kørte timer</b>
          <input
            type="number"
            min="1"
            max="24"
            className="input-timer"
            placeholder=""
            name="timer"
            onChange={onChange}></input>
          {validateTimer(state.timer).jsx}
        </div>
      )}
      <div className="form">
        <b>Bemærkninger</b>
        <textarea
          className="input-bemarkninger"
          placeholder="Eventuelle bemærkninger"
          name="bemaerkninger"
          onChange={onChange}></textarea>
      </div>
      <div className="Form">
        <button onClick={onSubmit}>
          <h4>Insend</h4>
        </button>
      </div>
    </div>
  )
}

export default App
