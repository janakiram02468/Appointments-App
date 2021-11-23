// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], nameInput: '', dateInput: '', isStarred: false}

  onChangeTitleInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {nameInput, dateInput} = this.state
    const dateFormat = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const updateAppointment = {
      id: v4(),
      name: nameInput,
      date: dateFormat,
      isStar: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, updateAppointment],
      nameInput: '',
      dateInput: '',
    }))
  }

  onChangeStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachApp => {
        if (eachApp.id === id) {
          return {...eachApp, isStar: !eachApp.isStar}
        }
        return eachApp
      }),
    }))
  }

  onFilter = () => {
    this.setState(prevState => ({isStarred: !prevState.isStarred}))
  }

  isStarredorNOt = () => {
    const {appointmentList, isStarred} = this.state
    if (isStarred) {
      return appointmentList.filter(eachList => eachList.isStar === true)
    }
    return appointmentList
  }

  render() {
    const {nameInput, dateInput, isStarred} = this.state
    const filterClassName = isStarred ? 'filter-filled' : 'filter-empty'
    const appointListItems = this.isStarredorNOt()
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={nameInput}
                  onChange={this.onChangeTitleInput}
                  className="input"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  className="input"
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {appointListItems.map(eachList => (
                <AppointmentItem
                  key={eachList.id}
                  appointmentDetails={eachList}
                  onChangeStar={this.onChangeStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
