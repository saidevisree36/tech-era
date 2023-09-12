import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItem extends Component {
  state = {listItems: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrls = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrls, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.course_details.id,
        name: fetchedData.course_details.name,
        imageUrl: fetchedData.course_details.image_url,
        description: fetchedData.course_details.description,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        listItems: updatedData,
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
    const {listItems} = this.state
    return (
      <>
        <div className="course-details">
          <img
            src={listItems.imageUrl}
            alt={listItems.name}
            className="logo-img"
          />
          <div className="name-description-container">
            <p className="paragraph">{listItems.name}</p>
            <p className="description">{listItems.description}</p>
          </div>
        </div>
      </>
    )
  }

  renderAllCourseItems = () => {
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
        <div>{this.renderAllCourseItems()}</div>
      </div>
    )
  }
}

export default CourseItem
