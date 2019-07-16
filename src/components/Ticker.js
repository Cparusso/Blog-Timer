import React, { Component } from 'react';
import MinutesForm from './MinutesForm.js';
import SecondsForm from './SecondsForm.js';

class Ticker extends Component {
  state={
    minutesClicked: false,
    secondsClicked: false,
  }

  toggleForm = (selection) => {
    if (selection === 'minutes') {
      this.setState(({ minutesClicked }) => ({
        minutesClicked: !minutesClicked
      }))
    } else {
      this.setState(({ secondsClicked }) => ({
        secondsClicked: !secondsClicked
      }))
    }
  }

  render () {
    const { minutesClicked,
            secondsClicked
          } = this.state

    const { minutes,
            seconds,
            timerRunning,
            overtime,
            setMinutes,
            setSeconds
          } = this.props

    return (
      <span

        className={`${timerRunning ? `on` : `off`} clock`}
        id={`${overtime ? `ot` : ``}`}>
          {minutesClicked
            ? <MinutesForm
                toggleForm={ this.toggleForm }
                minutes={ minutes }
                setMinutes={ setMinutes }
              />
            : <span className="minutes-input" onClick={ () => this.toggleForm('minutes') }>
              {minutes}
            </span>
          }
          :
          {secondsClicked
            ? <SecondsForm
                toggleForm={ this.toggleForm }
                seconds={ seconds }
                setSeconds={ setSeconds }
              />
          : <span onClick={ () => this.toggleForm('seconds') }>
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
