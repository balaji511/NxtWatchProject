import {Col, Card, Image} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {HiOutlineSaveAs} from 'react-icons/hi'
import SideBar from '../SideBar/SideBar'

export default function SavedVideos() {
  const home = useSelector(state => state.home)
  const {isDark} = home
  const backGroundTrending = isDark ? '#8c8c8c' : '#f2f2f2'
  const backGround = isDark ? 'black' : 'white'
  const fontColor = isDark ? 'white' : 'black'
  const saved = useSelector(state => state.saved)
  const {savedData, isLoading} = saved
  const noSavedVideos = () => (
    <div
      style={{fontFamily: 'Roboto'}}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      {' '}
      <Image
        style={{height: '250px'}}
        className="align-self-center mt-5"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
      />
      <h3 className="pt-5">No saved videos</h3>
      <p>You can save your videos while watching them</p>
    </div>
  )

  const renderSavedVideosList = () => (
    <>
      {!savedData.length > 0 ? (
        noSavedVideos()
      ) : (
        <ul
          className="d-flex flex-md-row flex-wrap flex-column  mt-1 mr-3"
          style={{listStyleType: 'none'}}
        >
          {savedData.map(each => (
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
                    src={each.thumbnail}
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

  const renderSavedVideos = () => (
    <>
      <Card
        className="d-flex flex-row align-items-center p-2"
        style={{
          borderRadius: '0px',
          borderWidth: '0px',
          backgroundColor: backGroundTrending,
        }}
      >
        <HiOutlineSaveAs
          className=" p-1 m-1 text-danger"
          style={{
            borderRadius: '20px',
            backgroundColor: 'lightblue',
            fontSize: '30px',
          }}
        />
        <h4 className="pt-2">Saved Videos</h4>
      </Card>
      <div
        className="d-flex flex-column "
        style={{backgroundColor: backGround}}
      >
        {isLoading ? '' : renderSavedVideosList()}
      </div>
    </>
  )
  return (
    <div className="d-flex" style={{minHeight: '90vh'}}>
      <Col md={2} xl={3} style={{minHeight: '90vh'}}>
        <SideBar tabName="saved" />
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
        {renderSavedVideos()}
      </Col>
    </div>
  )
}
