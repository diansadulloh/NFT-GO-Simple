import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { Dropdown, Image, Menu, Button, Container, Flag } from 'semantic-ui-react';
import NftMakerPage from './components/NftMakerPage';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import { SemanticToastContainer } from 'react-semantic-toasts';

class App extends React.Component {

  state = {
    locale: [
      {
        key: 'en',
        text: <Flag name='america' />,
        value: 'en'
      },
      {
        key: 'zh-CN',
        text: <Flag name='china' />,
        value: 'zh-CN'
      }
    ]
  }

  render() {
    return (
      <Router>
        <div className="App">
          <SemanticToastContainer position="top-right" />
          <header className="App-header">
            <div className="header">
              <div className="navbar">
                <Link to="/">
                  <Image src={logo} className="logo" />
                </Link>
                <Menu secondary className="menu">
                  <Dropdown
                    item
                    text='Studio'
                    floating
                    button
                    selectOnNavigation={true}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/nft-maker">
                        NFT
                  </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/art-maker">
                        Crypto.Art
                  </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Menu.Item as={Link} to='/gallery'>Gallery</Menu.Item>
                  <Menu.Item as={Link} to='/market'>Market</Menu.Item>
                  <Menu.Item as={Link} to='/FAQ'>FAQ</Menu.Item>
                </Menu>
              </div>
            </div>
            <Dropdown
              inline
              defaultValue={this.state.locale[0].value}
              options={this.state.locale}
            />
          </header>
          <Container className="mainBox">
            <Switch>
              <Route exact path='/'></Route>
              <Route path='/nft-maker'>
                <NftMakerPage />
              </Route>
              <Route path='/art-maker'></Route>
              <Route path='/gallery'></Route>
              <Route path='/FAQ'></Route>
            </Switch>
          </Container>
        </div>
      </Router >
    );
  }
}

export default App;
