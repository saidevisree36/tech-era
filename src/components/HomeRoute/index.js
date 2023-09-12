import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import CoursesList from '../CoursesList'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        coursesList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.getCourses()
  }

  renderFailureView = () => (
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
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failure-view"
        />
        <p className="error-msg">Oops! Something Went Wrong</p>
        <p className="paragraph">
          We cannot see to find the page you are looking for.
        </p>
        <button type="button" onClick={this.onRetry()} className="btn">
          Retry
        </button>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <>
        <h1 className="course-heading">Courses</h1>
        <ul className="courses-list">
          {coursesList.map(eachCourse => (
            <CoursesList key={eachCourse.id} details={eachCourse} />
          ))}
        </ul>
      </>
    )
  }

  renderAllCourses = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="background-container">
        <Link to="/">
          <nav className="nav-bar">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </nav>
        </Link>
        <div>{this.renderAllCourses()}</div>
      </div>
    )
  }
}

export default HomeRoute
