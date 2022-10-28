import {Nav, Image, Button} from 'react-bootstrap'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {CgProfile} from 'react-icons/cg'
import {RiLogoutBoxRLine, RiMoonLine} from 'react-icons/ri'
import {AiOutlineMenuFold} from 'react-icons/ai'
import {FiSun} from 'react-icons/fi'
import './Navbar.css'
import {useSelector, useDispatch} from 'react-redux'
import {homeActions} from '../../Store/HomeSlice'
import {authActions} from '../../Store/LoginSlice'

function NavBar(props) {
  const {history} = props
  const home = useSelector(state => state.home)
  const dispatch = useDispatch()
  const image = home.isDark
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
  const themeColor = home.isDark ? '#444444' : '#e2e2e2'
  const fontColor = home.isDark ? 'white' : 'black'
  const theme = () =>
    home.isDark ? (
      <RiMoonLine
        style={{
          fontSize: '22px',
          color: `${fontColor}`,
        }}
      />
    ) : (
      <FiSun
        style={{
          fontSize: '22px',
          color: `${fontColor}`,
        }}
      />
    )

  const logoutFromApp = () => {
    Cookies.remove('jwtToken')
    dispatch(authActions.logoutFrom())
    history.replace('/')
  }
  return (
    <Nav
      className="d d-flex flex-row align-items-center justify-content-between"
      style={{
        height: '10vh',
        paddingLeft: '22px',
        paddingRight: '22px',
        backgroundColor: `${themeColor}`,
      }}
    >
      <Nav.Item>
        <Link to="/">
          <Image style={{height: '29px'}} alt="NavLogo" src={image} />
        </Link>
      </Nav.Item>
      <li className="NavRight  d-md-flex d-none align-items-center">
        <Nav.Item style={{paddingRight: '0px'}}>
          <Button
            onClick={() => dispatch(homeActions.changeTheme())}
            style={{
              backgroundColor: 'transparent',
              borderWidth: '0px',
            }}
          >
            {theme()}
          </Button>
        </Nav.Item>
        <Nav.Item style={{paddingRight: '20px'}}>
          <Button
            style={{
              backgroundColor: 'transparent',
              borderWidth: '0px',
            }}
          >
            <CgProfile
              style={{
                fontSize: '25px',
                color: `${fontColor}`,
              }}
            />
          </Button>
        </Nav.Item>

        <Nav.Item>
          <Button
            className="bg-danger"
            onClick={logoutFromApp}
            style={{borderWidth: '0px'}}
          >
            Logout
          </Button>
        </Nav.Item>
      </li>
      {/* Small devices options */}
      <li className="d-md-none d-flex align-items-center">
        <Nav.Item>
          <Button
            onClick={() => dispatch(homeActions.changeTheme())}
            style={{
              backgroundColor: 'transparent',
              borderWidth: '0px',
            }}
          >
            {theme()}
          </Button>
        </Nav.Item>{' '}
        <Nav.Item>
          <Button
            style={{
              backgroundColor: 'transparent',
              borderWidth: '0px',
            }}
            onClick={() => {
              dispatch(homeActions.menuView())
            }}
          >
            <AiOutlineMenuFold
              style={{
                fontSize: '26px',
                color: `${fontColor}`,
              }}
            />
          </Button>
        </Nav.Item>
        <Nav.Item>
          <Button
            onClick={logoutFromApp}
            style={{
              backgroundColor: 'transparent',
              borderWidth: '0px',
            }}
          >
            <RiLogoutBoxRLine
              style={{
                fontSize: '23px',
                color: `${fontColor}`,
              }}
            />
          </Button>
        </Nav.Item>
      </li>
    </Nav>
  )
}

export default withRouter(NavBar)
