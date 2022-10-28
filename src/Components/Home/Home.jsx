import {Col, Card, Button, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import SideBar from '../SideBar/SideBar'
import {getAllVideos} from '../../Store/HomeSlice'
import './Home.css'

export default function Home() {
  const home = useSelector(state => state.home)

  const cookie = Cookies.get('jwtToken')
  const [Banner, setBanner] = useState(true)
  const [SearchText, setSearchText] = useState('')
  const [InputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllVideos({cookie, InputValue}))
  }, [dispatch, cookie, InputValue])
  const videos = useSelector(state => state.home.videosInfo)
  const LoadingView = () => (
    <div className="align-self-center pt-5">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )
  const noSearchResult = () => (
    <div className="align-self-center ">
      <Image
        className="m-3"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        style={{height: '180px'}}
      />
      <h6 className="m-2">No Videos Found with Keyword</h6>
    </div>
  )
  const renderVideosList = () => (
    <>
      {!videos.videosData.length > 0 ? (
        noSearchResult()
      ) : (
        <ul
          className="d-flex flex-md-row flex-wrap flex-column  mt-1 mr-3"
          style={{listStyleType: 'none'}}
        >
          {videos.videosData.map(each => (
            <li key={each.id} md={2} xl={1}>
              <Link to={`/videos/${each.id}`} className="link text-dark">
                <Card
                  className="m-1 m-md-2 ytCard"
                  style={{
                    borderRadius: '5px',
                    borderWidth: '0.5px',
                  }}
                >
                  <Card.Img
                    src={each.thumbNail}
                    style={{
                      borderBottomLeftRadius: '0px',
                      borderBottomRightRadius: '0px',
                    }}
                  />
                  <Card.Body className="d-flex p-1">
                    <Image
                      className="m-1"
                      src={each.channelProfile}
                      style={{borderRadius: '20px', height: '29px'}}
                    />
                    <div className="p-1">
                      <p style={{fontSize: '10px', fontWeight: 'bold'}}>
                        {each.title}
                      </p>
                      <p style={{fontSize: '10px'}}>
                        {each.channelName} | {each.viewsCount} - {} views
                      </p>
                    </div>
                  </Card.Body>{' '}
                </Card>
              </Link>{' '}
            </li>
          ))}
        </ul>
      )}
    </>
  )

  const homePageView = () => (
    <>
      <div
        className="p-3"
        style={{
          minHeight: '90vh',
          fontFamily: 'Roboto',
          backgroundColor: `${home.isDark ? 'black' : 'white'}`,
        }}
      >
        {Banner && (
          <Card
            className="d-flex p-1"
            style={{
              backgroundColor: 'lightBlue',
              backgroundSize: 'cover',
              borderRadius: '5px',
              borderWidth: '1px',
            }}
          >
            <Card.Body className="d-flex justify-content-between">
              <div className="d-flex flex-column align-items-start ">
                <Image
                  style={{height: '50px', margin: '5px'}}
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                />
                <h6 className="pt-2 p-1 pb-2">
                  Buy NXT Watch Premium to Enjoy and Avoid Ads
                </h6>
                <Button className="m-1 text-black bg-transparent">
                  Get it Now
                </Button>
              </div>
              <Button
                onClick={() => setBanner(prev => !prev)}
                className="mt-2 align-self-start text-black bg-transparent"
              >
                x
              </Button>
            </Card.Body>
          </Card>
        )}
        {/* Input */}
        <div className="mt-3 d-flex InputField">
          <input
            type="search"
            style={{width: '80%'}}
            value={SearchText}
            onAbort={() => setInputValue('')}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Enter Keyword"
          />
          <Button
            onClick={() => setInputValue(SearchText)}
            className="d-flex align-items-center bg-danger"
            style={{
              height: '32px',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderWidth: '0px',
            }}
          >
            Search
          </Button>
        </div>
        {/*  */}
        <div style={{minHeight: '65.2vh'}} className="mt-2 d-flex  flex-column">
          {videos.isLoading ? LoadingView() : renderVideosList()}
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className="d-flex" style={{minHeight: '90vh'}}>
        <Col md={2} xl={3} style={{minHeight: '90vh'}}>
          <SideBar tabName="home" />
        </Col>
        <Col md={10} xs={12} xl={8}>
          {/* {homePageView()} */}
          {homePageView()}
        </Col>
      </div>
    </>
  )
}
