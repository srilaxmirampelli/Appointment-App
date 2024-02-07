// Write your code here
import './index.css'

import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStarredButton = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: dateInput,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="input-content">
            <form onSubmit={this.onAddAppointment}>
              <label htmlFor="title" className="label-text">
                TITLE
              </label>
              <input
                type="text"
                placeholder="Title"
                id="title"
                className="input-bar"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <br />
              <label htmlFor="date" className="label-text">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="input-bar"
                value={dateInput}
                onChange={this.onChangeDateInput}
              />
              <br />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="hr-line" />
          <div className="appointment-item-content">
            <h1 className="appointment-item-heading">Appointments</h1>
            <button
              type="button"
              className={filterClassName}
              onClick={this.onClickStarredButton}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
