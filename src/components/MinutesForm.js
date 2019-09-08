import React, { Component } from 'react';

class MinutesForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.setStartMinutes(event)
    this.props.toggleForm('minutes')
  }

  componentWillUnmount() {
    this.props.toggleForm("seconds")
  }

  render () {
    const { minutes, setMinutes, toggleForm } = this.props

    return (
      <form onSubmit={ this.handleSubmit } >
        <input
          autoFocus
          onFocus={(event) => event.target.select()}
          onBlur={(event) => this.handleSubmit(event)}
          maxLength="2"
          align="center"
          type="number"
          name="minutes"
          value={ minutes < 10
                  ? `0${minutes}`
                  : minutes.toString()
                }
          onChange={ setMinutes }
          className='time-input minutes-input'
        />
      </form>
    )
  }
}

export default MinutesForm
