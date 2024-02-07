// Write your code here
import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starImgSrc = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const onClickStarredIcon = () => {
    const {toggleIsStarred} = props
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <li>
        <p className="title">{title}</p>
        <p className="date">{formattedDate}</p>
      </li>
      <li className="star-btn-container">
        <button
          data-testid="star"
          type="button"
          className="star-btn"
          onClick={onClickStarredIcon}
        >
          <img src={starImgSrc} alt="star" />
        </button>
      </li>
    </li>
  )
}

export default AppointmentItem
