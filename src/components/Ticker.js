import React, { Component } from 'react';
import MinutesForm from './MinutesForm.js';
import SecondsForm from './SecondsForm.js';

class Ticker extends Component {

  render () {
    const { minutes,
            seconds,
            timerRunning,
            overtime,
            setMinutes,
            setSeconds,
            setStartMinutes,
            setStartSeconds,
            minutesClicked,
            secondsClicked,
            toggleForm,
          } = this.props

    return (
      <span
        className={`${timerRunning ? `on` : `off`} clock`}
        id={`${overtime ? `ot` : ``}`}>
          {minutesClicked
            ? <MinutesForm
                toggleForm={ toggleForm }
                minutes={ minutes }
                setMinutes={ setMinutes }
                setStartMinutes={ setStartMinutes }
              />
            : <span className="minutes-input" onClick={ () => toggleForm('minutes') }>
              {minutes}
            </span>
          }
          :
          {secondsClicked
            ? <SecondsForm
                toggleForm={ toggleForm }
                seconds={ seconds }
                setSeconds={ setSeconds }
                setStartSeconds={ setStartSeconds }
              />
          : <span onClick={ () => toggleForm('seconds') }>
              {seconds < 10
                ? `0${seconds}`
                : seconds
              }
            </span>
          }
      </span>
    )
  }
}

export default Ticker
