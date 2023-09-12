import {Switch, Route} from 'react-router-dom'

import CourseItem from './components/CourseItem'

import HomeRoute from './components/HomeRoute'

import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/courses/:id" component={CourseItem} />
    <Route component={NotFound} />
  </Switch>
)

export default App
