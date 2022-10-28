import {Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import VideoDetailedView from './Components/VideoDetailedView/VideoDetailedView'
import Trending from './Components/Trending/Trending'
import Gaming from './Components/Gaming/Gaming'
import SavedVideos from './Components/SavedVideos/SavedVideos'

export default function App() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/trending" component={Trending} />
      <ProtectedRoute exact path="/gaming" component={Gaming} />
      <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
      <ProtectedRoute exact path="/videos/:id" component={VideoDetailedView} />
    </Switch>
  )
}
