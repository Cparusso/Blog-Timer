import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    seconds: 5, // Currently when the timer goes into overtime it waits until 2 seconds to update the time in the title
    // seconds: 0,
    minutes: 0,
    // minutes: 5,
    timerRunning: false,
    overtime: false,
  }

  updateTitle = () => {
    const { seconds, minutes, overtime } = this.state
    document.title = `${overtime ? `Overtime` : `Time` }: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  toggleTimer = () => {
    const { timerRunning, overtime } = this.state

    if (!overtime) {
      if (!timerRunning) {
        this.setState((prevState) => ({
          timerRunning: !prevState.timerRunning
        }))

        this.myInterval = setInterval(() => {
          const { seconds, minutes } = this.state

          if (seconds > 0) {
            this.setState((prevState) => ({
              seconds: prevState.seconds - 1
            }), this.updateTitle)
          }
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(this.myInterval)
              this.setState((prevState) => ({
                overtime: !prevState.overtime
              }))
              this.countUp()
            } else {
              this.setState((prevState) => ({
                minutes: prevState.minutes - 1,
                seconds: 59
              }), this.updateTitle)
            }
          }
        }, 1000)
      } else {
        clearInterval(this.myInterval)

        this.setState((prevState) => ({
          timerRunning: !prevState.timerRunning
        }))
      }
    } else {
      clearInterval(this.myInterval)
      this.setState((prevState) => ({
        timerRunning: false,
        seconds: 0,
        minutes: 5,
        overtime: false,
      }))
    }
  }

  countUp = () => {
    clearInterval(this.myInterval)

    this.myInterval = setInterval(() => {
      const { seconds } = this.state

      if (seconds < 60) {
        this.setState((prevState) => ({
          seconds: prevState.seconds + 1
        }), this.updateTitle)
      }
      if (seconds === 59) {
        this.setState((prevState) => ({
          minutes: prevState.minutes + 1,
          seconds: 0
        }), this.updateTitle)}
      }, 1000)

    this.setState((prevState) => ({
      seconds: prevState.seconds + 1
    }))
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
            {overtime ? 'Overtime' : 'Time Remaining'}: <span className={ timerRunning ? "on" : "off" }> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
          </p>
          <button id="timer-button" onClick={() => this.toggleTimer()}>
            { timerRunning ? "Stop Timer" : "Start Timer" }
          </button>
        </div>
      </div>
    )
  }
}

export default App;

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
