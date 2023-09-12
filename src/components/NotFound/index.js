import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
    <div className="nav-container">
      <Link to="/">
        <nav className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </nav>
      </Link>
    </div>
    <div className="failureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not-found"
        className="failure-view"
      />
      <p className="error-msg">Oops! Something Went Wrong</p>
      <p className="paragraph">
        We cannot see to find the page you are looking for.
      </p>
      <button type="button" className="btn">
        Retry
      </button>
    </div>
  </>
)
export default NotFound
