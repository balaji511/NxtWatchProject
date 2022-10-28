import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import {HiOutlineHome, HiOutlineSaveAs} from 'react-icons/hi'
import {AiFillFire} from 'react-icons/ai'
import {Redirect, Link, Route} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Button, Image} from 'react-bootstrap'
import NavBar from '../Navbar/NavBar'
import {homeActions} from '../../Store/HomeSlice'

const menuItems = [
  {
    itemName: 'Home',
    path: '/',
    icon: <HiOutlineHome className="m-1" style={{fontSize: '20px'}} />,
  },
  {
    itemName: 'Trending',
    path: '/trending',
    icon: <AiFillFire className="m-1" style={{fontSize: '20px'}} />,
  },
  {
    itemName: 'Gaming',
    path: '/gaming',
    icon: <SiYoutubegaming className="m-1" style={{fontSize: '20px'}} />,
  },
  {
    itemName: 'Saved Videos',
    path: '/saved-videos',
    icon: <HiOutlineSaveAs className="m-1" style={{fontSize: '20px'}} />,
  },
]

export default function ProtectedRoute(props) {
  const home = useSelector(state => state.home)
  const dispatch = useDispatch()

  const menuPageView = () => (
    <>
      <div
        className="d-flex flex-row justify-content-end d-md-none"
        style={{
          height: '91vh',
          fontFamily: 'Roboto',
          backgroundColor: `${home.isDark ? 'black' : 'white'}`,
        }}
      >
        <div
          className="d-flex flex-column justify-content-between"
          style={{
            width: '60vw',
            borderTopLeftRadius: '25px',
            borderBottomLeftRadius: '25px',
            padding: '15px',
            color: 'white',
            backgroundColor: '#e33d3d',
            transition: '850ms',
          }}
        >
          <div>
            <div className="d-flex flex-row justify-content-between">
              <h1 className="text-white" style={{fontWeight: 'bold'}}>
                Menu
              </h1>
              <Button
                style={{borderWidth: '0px'}}
                className="bg-warning"
                onClick={() => {
                  dispatch(homeActions.menuView())
                }}
              >
                Close
              </Button>
            </div>
            <ul style={{listStyleType: 'none', paddingTop: '25px'}}>
              {menuItems.map(each => (
                <li
                  key={each.path}
                  onClick={() => {
                    dispatch(homeActions.menuView())
                  }}
                  className="pt-2 pb-1 text-white d-flex align-items-center justify-content-start"
                  style={{fontWeight: '500', width: '35vw'}}
                >
                  <Link
                    to={each.path}
                    className="text-white"
                    style={{textDecoration: 'none'}}
                  >
                    {each.icon}
                    {each.itemName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center pb-5">
            <h6>Contact us</h6>
            <div>
              <Image
                style={{height: '22px', margin: '5px'}}
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook"
              />{' '}
              <Image
                style={{height: '22px', margin: '5px'}}
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter"
              />{' '}
              <Image
                style={{height: '22px', margin: '5px'}}
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked-in"
              />
            </div>
            <h6 style={{fontSize: '12px'}}>
              Now see your Channels and Recommendations
            </h6>
          </div>
        </div>
      </div>
    </>
  )
  if (Cookies.get('jwtToken') === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <NavBar />
      {!home.menuView ? <Route {...props} /> : menuPageView()}
    </>
  )
}
