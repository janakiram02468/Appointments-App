// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onChangeStar} = props
  const {id, name, date, isStar} = appointmentDetails

  const starImgUrl = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onChangeStar(id)
  }

  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="title">{name}</p>
        <button
          type="button"
          testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starImgUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}
export default AppointmentItem
