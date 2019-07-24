import React, { Component } from 'react';

class SecondsForm extends Component {
  handleSubmit = (e) => {
    this.props.setStartSeconds(e)
    this.props.toggleForm('seconds')
    e.preventDefault()
  }

  render () {
    const { seconds, setSeconds } = this.props

    return (
      <form onSubmit={ this.handleSubmit } >
        <input
          autoFocus
          onFocus={(e) => e.target.select()}
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
