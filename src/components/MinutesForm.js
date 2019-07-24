import React, { Component } from 'react';

class MinutesForm extends Component {
  handleSubmit = (e) => {
    this.props.setStartMinutes(e)
    this.props.toggleForm('minutes')
    e.preventDefault()
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
          onBlur={() => toggleForm("minutes")}
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
