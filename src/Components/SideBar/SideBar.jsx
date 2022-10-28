import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {SiYoutubegaming} from 'react-icons/si'
import {HiOutlineHome, HiOutlineSaveAs} from 'react-icons/hi'
import {AiFillFire} from 'react-icons/ai'
import {Button, ButtonGroup, Image} from 'react-bootstrap'
import '../Home/Home.css'

const tabIds = {
  home: 'home',
  gaming: 'gaming',
  saved: 'saved',
  trending: 'trending',
}
function SideBar(props) {
  const {history, tabName} = props
  const [tabItem, setTabItem] = useState('')
  const home = useSelector(state => state.home)
  const bgColor = home.isDark ? '#444444' : '#e2e2e2'
  const fontColor = home.isDark ? 'white' : 'black'
  useEffect(() => {
    setTabItem(tabName)
  }, [tabName])

  return (
    <div
      className="d-none d-md-flex flex-md-column justify-content-between"
      style={{
        minHeight: '100%',
        color: `${fontColor}`,
        backgroundColor: `${bgColor}`,
        fontFamily: 'Roboto',
      }}
    >
      <ButtonGroup className="d-flex flex-column">
        {' '}
        <Button
          onClick={() => {
            setTabItem('home')
            history.push('/')
          }}
          className="d-flex mt-4 justify-content-start  m-1"
          style={{
            borderRadius: '0px',
            borderWidth: '0px',
            backgroundColor: `${
              tabItem === 'home' ? '#e47068' : 'transparent'
            }`,
            color: `${fontColor}`,
          }}
        >
          <HiOutlineHome className="m-1" /> Home
        </Button>
        <Button
          onClick={() => {
            setTabItem(tabIds.trending)
            history.push('/trending')
          }}
          className="d-flex mt-1 justify-content-start  m-1 "
          style={{
            backgroundColor: `${
              tabItem === 'trending' ? '#e47068' : 'transparent'
            }`,
            borderRadius: '0px',
            borderWidth: '0px',
            color: `${fontColor}`,
          }}
        >
          <AiFillFire className="m-1" /> Trending
        </Button>
        <Button
          onClick={() => {
            setTabItem(tabIds.gaming)
            history.push('/gaming')
          }}
          className="d-flex mt-1 justify-content-start m-1 "
          style={{
            backgroundColor: `${
              tabItem === 'gaming' ? '#e47068' : 'transparent'
            }`,
            borderRadius: '0px',
            borderWidth: '0px',
            color: `${fontColor}`,
          }}
        >
          <SiYoutubegaming className="m-1" /> Gaming
        </Button>{' '}
        <Button
          onClick={() => {
            setTabItem(tabIds.saved)
            history.push('/saved-videos')
          }}
          className="d-flex mt-1 justify-content-start m-1 "
          style={{
            borderRadius: '0px',
            backgroundColor: `${
              tabItem === 'saved' ? '#e47068' : 'transparent'
            }`,
            borderWidth: '0px',
            color: `${fontColor}`,
          }}
        >
          <HiOutlineSaveAs className="m-1" /> Saved videos
        </Button>{' '}
      </ButtonGroup>
      <div className="p-3 text-center">
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
  )
}

export default withRouter(SideBar)
