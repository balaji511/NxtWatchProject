import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {AiFillDislike, AiFillLike} from 'react-icons/ai'
import {HiOutlineSaveAs} from 'react-icons/hi'
import {Col, Button, Image} from 'react-bootstrap'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import SideBar from '../SideBar/SideBar'
import {getVideoWithId} from '../../Store/VideoIdSlice'
import {SaveActions} from '../../Store/SavedVideosSlice'

export default function VideoDetailedView(props) {
  console.log(SaveActions)

  const {match} = props
  const {params} = match
  const {id} = params
  const cookie = Cookies.get('jwtToken')
  const dispatch = useDispatch()
  const home = useSelector(state => state.home)
  const {isDark} = home
  const backGroundTrending = isDark ? '#8c8c8c' : '#f2f2f2'
  const backGround = isDark ? 'black' : 'white'
  const fontColor = isDark ? 'white' : 'black'
  const videoId = useSelector(state => state.videoId)
  const {videoWithId} = videoId
  const {videoIdData} = videoWithId

  const date = new Date(videoIdData.publishedDate)

  useEffect(() => {
    dispatch(getVideoWithId({id, cookie}))
  }, [id, cookie, dispatch])
  const LoadingView = () => (
    <div className="align-self-center" style={{padding: '250px'}}>
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )
  const successView = () => (
    <div className="p-1">
      {' '}
      <ReactPlayer
        height={350}
        className="d-none d-md-flex"
        url={videoIdData.videoUrl}
        width={830}
      />
      <ReactPlayer
        height={240}
        className="d-md-none d-visible"
        url={videoIdData.videoUrl}
        width={375}
      />
      <div>
        <h5 className="pt-3">{videoWithId.videoIdData.title}</h5>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex  algin-items-center pt-2">
            <p>{videoIdData.viewsCount} views </p>
            <p className="d-none d-md-flex">
              {' '}
              | published at {date && date.toLocaleDateString()}{' '}
            </p>
          </div>
          <div className="d-flex align-items-center" style={{}}>
            <Button
              className="bg-transparent"
              style={{borderWidth: '0px', color: fontColor}}
            >
              <AiFillLike />
              Like
            </Button>
            <Button
              className="bg-transparent"
              style={{color: fontColor, borderWidth: '0px'}}
            >
              <AiFillDislike /> DisLike{' '}
            </Button>
            <Button
              className="bg-transparent"
              style={{color: fontColor, borderWidth: '0px'}}
              onClick={() => dispatch(SaveActions.addItem(videoIdData))}
            >
              <HiOutlineSaveAs />
              Save
            </Button>{' '}
          </div>
        </div>
        <hr />
        <div className="d-flex ">
          <Image
            className="m-2"
            src={videoIdData.channelImage}
            style={{height: '48px'}}
          />

          <div className="p-2" style={{fontSize: '12px'}}>
            <p>{videoIdData.channelName}</p>
            <p>{videoIdData.channelSubsCount} Subscribers</p>
            <p>{videoIdData.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <>
      <div className="d-flex" style={{minHeight: '90vh'}}>
        <Col md={2} style={{minHeight: '90vh'}}>
          <SideBar />
        </Col>
        <Col md={10} xs={12}>
          <div
            className="p-1 d-flex flex-column"
            style={{
              backgroundColor: backGround,
              minHeight: '90vh',
              color: fontColor,
            }}
          >
            {videoWithId.isLoading ? LoadingView() : successView()}
          </div>
        </Col>
      </div>
    </>
  )
}
