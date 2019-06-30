import React, { Component } from 'react';
import warningSound from './sounds/to-the-point.mp3';
import timesUpSound from './sounds/applauses.mp3';
import './App.css';

class App extends Component {
  // I need to declare the timesUpSound globally to allow myself to pause and reset the sound in multiple functions
  timesUp = new Audio(timesUpSound);

  state = {
    seconds: 0, // real
    minutes: 5, // real
    // seconds: 2, // test
    // minutes: 0, // test
    timerRunning: false,
    overtime: false,
  }

  updateTitle = () => {
    const { seconds, minutes, overtime } = this.state

    document.title = `${overtime ? `Overtime` : `Time` }: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  toggleTimer = () => {
    const { timerRunning, overtime } = this.state
    this.updateTitle()

    if (!overtime) {
      if (!timerRunning) {
        this.setState(({ timerRunning }) => ({
          timerRunning: !timerRunning
        }))

        this.myInterval = setInterval(() => {
          const { seconds, minutes } = this.state

          if (seconds > 0) {
            this.setState(({ seconds }) => ({
              seconds: seconds - 1
            }), this.updateTitle)
          }
          if (seconds === 0) {
            if (minutes === 1) {
              this.playWarningSound()
            }
            if (minutes === 0) {
              clearInterval(this.myInterval)
              this.setState(({ overtime }) => ({
                overtime: !overtime
              }))
              this.playTimesUpSound()
              this.countUp()
            } else {
              this.setState(({ minutes }) => ({
                minutes: minutes - 1,
                seconds: 59
              }), this.updateTitle)
            }
          }
        }, 1000)
      } else {
        clearInterval(this.myInterval)

        this.setState(({ timerRunning }) => ({
          timerRunning: !timerRunning
        }))
      }
    } else {
      this.resetTimer()
    }
  }

  countUp = () => {
    clearInterval(this.myInterval)

    this.myInterval = setInterval(() => {
      const { seconds } = this.state

      if (seconds < 60) {
        this.setState(({ seconds }) => ({
          seconds: seconds + 1
        }), this.updateTitle)
      }
      if (seconds === 59) {
        this.setState(({ minutes }) => ({
          minutes: minutes + 1,
          seconds: 0
        }), this.updateTitle)}
      }, 1000)

    this.setState(({ seconds }) => ({
      seconds: seconds + 1
    }), this.updateTitle)
  }

  resetTimer = () => {
    clearInterval(this.myInterval)
    this.stopTimesUpSound()
    this.setState({
      timerRunning: false,
      seconds: 0,
      minutes: 5,
      overtime: false,
    }, this.updateTitle)
  }

  playWarningSound = () => {
    // I can declare the warning sound locally because the sound is short
    // so I never have to stop it from playing and because I want the
    // sound check button to be able to be pressed without having to wait
    // for the sound to finish playing
    // (theres about 8 seconds of silence in the audio file at the end)
    const oneMinWarning = new Audio(warningSound);
    oneMinWarning.play()
  }

  playTimesUpSound = () => {
    this.timesUp.play()
  }

  stopTimesUpSound = () => {
    this.timesUp.pause()
    this.timesUp.currentTime = 0
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  render() {
    const { minutes, seconds, timerRunning, overtime } = this.state

    return (
      <div>
        <div className="header">
          <p id="title"><span id="emphasize">{`//`}</span> Blog Timer</p>
          <p id="time-remaining">
            {overtime ? 'Overtime' : 'Time Remaining'}:
            <span className={`${timerRunning ? `on` : `off`} clock`} id={`${overtime ? `ot` : ``}`}>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>
          <div id="buttons">
            <button id="timer-button" onClick={() => this.toggleTimer()}>
              { timerRunning ? "Stop Timer" : "Start Timer" }
            </button>
            <button id="timer-button" onClick={() => this.resetTimer()}>
              Reset Timer
            </button>
            <button id="timer-button" onClick={() => this.playWarningSound()}>
              Sound Check
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

// Hooks?
// import React, { useState, useEffect } from 'react';
// import './App.css';
//
// function App() {
//   console.log("App function called")
//   let [minutes, setMinutes] = useState(5);
//   let [seconds, setSeconds] = useState(0);
//
//   useEffect(() => {
//     // Update the document title using the browser API
//     document.title = `Time: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
//   });
//
//   const startTimer = () => {
//     let myInterval = setInterval(() => {
//     console.log(seconds)
//     if (seconds > 0) {
//       console.log("VICTORY")
//       setSeconds(seconds - 1)
//     }
//     if (seconds === 0) {
//       console.log("seconds === 0")
//       if (minutes === 0) {
//         console.log("minutes === 0")
//         clearInterval(this.myInterval)
//       } else {
//         console.log("minutes !== 0")
//         setMinutes(minutes - 1)
//         setSeconds(59)
//       }
//     }
//   }, 1000)}
//
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           <h1>Time Remaining</h1>
//           <p>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
//           <button onClick={() => startTimer()}>
//           Start Timer
//           </button>
//         </p>
//       </header>
//     </div>
//   );
// }
//
// export default App;
