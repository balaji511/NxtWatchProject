import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Col, Card} from 'react-bootstrap'
import {getGamingVideos} from '../../Store/GamingSlice'
import SideBar from '../SideBar/SideBar'
import './Gaming.css'

export default function Gaming() {
  const home = useSelector(state => state.home)
  const {isDark} = home
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getGamingVideos())
  }, [dispatch])

  const backGroundTrending = isDark ? '#8c8c8c' : '#f2f2f2'
  const backGround = isDark ? 'black' : 'white'
  const fontColor = isDark ? 'white' : 'black'

  const gaming = useSelector(state => state.gaming)
  const {isLoading, gamingData} = gaming

  const LoadingView = () => (
    <div className="align-self-center" style={{paddingTop: '250px'}}>
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )
  const gamingPageView = () => (
    <ul
      style={{width: '95%'}}
      className="d-flex flex-wrap align-items-center justify-content-center"
    >
      {gamingData.map(each => (
        <li
          key={each.id}
          className="text-black"
          style={{listStyleType: 'none'}}
        >
          <Card className="ytCardGaming m-2">
            <Link to={`/videos/${each.id}`} className="link text-dark">
              <Card.Img src={each.thumbNail} />
              <Card.Body>
                <p>{each.title}</p>
                <p>{each.viewsCount} Watching Worldwide</p>
              </Card.Body>
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  )
  const renderGamingView = () => (
    <>
      {' '}
      <Card
        className="d-flex flex-row align-items-center p-2"
        style={{
          borderRadius: '0px',
          borderWidth: '0px',
          backgroundColor: backGroundTrending,
        }}
      >
        <SiYoutubegaming
          className=" p-1 m-1 text-danger"
          style={{
            borderRadius: '20px',
            backgroundColor: 'lightblue',
            fontSize: '30px',
          }}
        />
        <h3 className="pt-2">Gaming</h3>
      </Card>{' '}
      <div className="d-flex flex-column" style={{backgroundColor: backGround}}>
        {isLoading ? LoadingView() : gamingPageView()}
      </div>
    </>
  )
  return (
    <div className="d-flex" style={{minHeight: '90vh'}}>
      <Col md={2} xl={3} style={{minHeight: '90vh'}}>
        <SideBar tabName="gaming" />
      </Col>
      <Col
        md={10}
        xs={12}
        xl={8}
        style={{
          fontFamily: 'Roboto',
          color: fontColor,
          minHeight: '90vh',
          backgroundColor: backGround,
        }}
      >
        {renderGamingView()}
      </Col>
    </div>
  )
}
