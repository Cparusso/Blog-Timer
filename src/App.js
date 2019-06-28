import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    seconds: 0,
    minutes: 5,
    timerRunning: false,
  }

  updateTitle = () => {
    const { seconds, minutes } = this.state

    document.title = `Time: ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  toggleTimer = () => {
    const { timerRunning } = this.state

    if (!timerRunning) {
      this.setState((prevState) => ({
        timerRunning: !prevState.timerRunning
      }))

      this.myInterval = setInterval(() => {
        const { seconds, minutes } = this.state

        if (seconds > 0) {
          this.setState(({ seconds }) => ({
            seconds: seconds - 1
          }), this.updateTitle)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.myInterval)
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

      this.setState((prevState) => ({
        timerRunning: !prevState.timerRunning
      }))
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  render() {
    const { minutes, seconds, timerRunning } = this.state
    return (
      <div>
        <div className="header">
          <p id="title"><span id="emphasize">//</span> Blog Timer</p>
          <p id="time-remaining">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
          <button onClick={() => this.toggleTimer()}>
            { timerRunning ? "Stop Timer" : "Start Timer" }
          </button>
        </div>
      </div>
    )
  }
}

export default App;

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
