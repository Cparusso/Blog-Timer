import React, { Component } from 'react';

class SecondsForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.setStartSeconds(event)
    this.props.toggleForm('seconds')
    console.log("submit");
    
  }

  render () {
    const { seconds, setSeconds, toggleForm } = this.props

    return (
      <form onSubmit={ this.handleSubmit } >
        <input
          autoFocus
          onFocus={(event) => event.target.select()}
          onBlur={(event) => this.handleSubmit(event)}
          maxLength="2"
          type="number"
          name="seconds"
          value={seconds < 10
                  ? `0${seconds}`
                  : seconds.toString()
                }
          onChange={ setSeconds }
          className='time-input seconds-input'
        />
      </form>
    )
  }
}

export default SecondsForm
