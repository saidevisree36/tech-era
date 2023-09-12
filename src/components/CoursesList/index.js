import {Link} from 'react-router-dom'
import './index.css'

const CoursesList = props => {
  const {details} = props
  const {id, name, logoUrl} = details

  return (
    <li className="list-items">
      <Link to={`/courses/${id}`} className="nav-link">
        <img src={logoUrl} alt={name} className="logo" />
        <p className="link-paragraph">{name}</p>
      </Link>
    </li>
  )
}
export default CoursesList
