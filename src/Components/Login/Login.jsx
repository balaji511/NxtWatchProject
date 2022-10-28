import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Container, Row, Col, Card, Image, Form, Button} from 'react-bootstrap'
import {authentication} from '../../Store/LoginSlice'

export default function Login(props) {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const LoginFormSubmitted = e => {
    e.preventDefault()
    dispatch(authentication({username, password}))
    if (auth.jwtToken) {
      const {history} = props
      history.replace('/')
    }
  }
  if (Cookies.get('jwtToken') !== undefined) {
    return <Redirect to="/" />
  }
  const LoadingView = () => (
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  )

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '100vh',
        borderWidth: '0px',
        fontFamily: 'Roboto',
        backGroundColor: '#f3f6f4',
      }}
    >
      <Row className="d-flex flex-column">
        {auth.Loading ? (
          LoadingView()
        ) : (
          <Col sm={10} xs={12} md={12} lg={12} className="align-self-center">
            <Card
              className="p-2 shadow-lg p-md-3"
              style={{borderWidth: '0px', borderRadius: '10px'}}
            >
              <Image
                className="align-self-center mt-1"
                style={{height: '35px'}}
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="logo"
              />
              <Card.Body>
                <Form
                  onSubmit={LoginFormSubmitted}
                  className="d-flex flex-column"
                >
                  <Form.Group className="mb-2 mt-1">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      placeholder="username"
                      type="text"
                      value={username}
                      onChange={e => setUserName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="mt-1">Password</Form.Label>
                    <Form.Control
                      placeholder="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                    />
                  </Form.Group>
                  {auth.errorMsg && (
                    <p className="text-danger p-1">{auth.errorMsg}</p>
                  )}
                  <Button
                    type="submit"
                    style={{borderWidth: '0px'}}
                    className="bg-danger mt-2 mt-md-2 align-self-center"
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  )
}
