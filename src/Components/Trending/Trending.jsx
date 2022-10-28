import {Col, Card, Image} from 'react-bootstrap'
import {AiFillFire} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import SideBar from '../SideBar/SideBar'
import {getTrendingData} from '../../Store/TredingSlice'

export default function Trending() {
  const home = useSelector(state => state.home)
  const {isDark} = home
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTrendingData())
  }, [dispatch])
  const trending = useSelector(state => state.trending)
  const {isLoading, trendingData} = trending

  const backGroundTrending = isDark ? '#8c8c8c' : '#f2f2f2'
  const backGround = isDark ? 'black' : 'white'
  const fontColor = isDark ? 'white' : 'black'

  const LoadingView = () => (
    <div className="align-self-center" style={{paddingTop: '250px'}}>
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )
  const TrendingPageView = () => (
    <ul
      className="d-flex flex-md-row flex-wrap flex-column mt-1 mr-3"
      style={{listStyleType: 'none'}}
    >
      {trendingData.map(each => (
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
  )
  const renderTrendingView = () => (
    <>
      <Card
        className="d-flex flex-row align-items-center p-2"
        style={{
          borderRadius: '0px',
          borderWidth: '0px',
          backgroundColor: backGroundTrending,
        }}
      >
        <AiFillFire
          className=" p-1 m-1 text-danger"
          style={{
            borderRadius: '20px',
            backgroundColor: 'lightblue',
            fontSize: '30px',
          }}
        />
        <h3 className="pt-2">Trending</h3>
      </Card>
      <div
        className="d-flex flex-column "
        style={{backgroundColor: backGround}}
      >
        {isLoading ? LoadingView() : TrendingPageView()}
      </div>
    </>
  )
  return (
    <div className="d-flex" style={{minHeight: '90vh'}}>
      <Col md={2} xl={3} style={{minHeight: '90vh'}}>
        <SideBar tabName="trending" />
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
        {renderTrendingView()}
      </Col>
    </div>
  )
}
