import React, { Fragment } from 'react';
import { Tab, Image, Card, Button, Label, Icon, Confirm, Header } from 'semantic-ui-react';
import EthNftMaker from './EthNftMaker';
import './index.scss';
import eth from '../../blockchain/eth';
import { Platform } from '../../common/auth';
import { toastError } from '../../common/helper';
import { Switch, Route } from 'react-router-dom';
import Storage from '../../common/storage';

const LAST_MAKER_KEY = "last_use";


interface IState {
  lastUse: Platform | undefined;    // last platform before jump out
  confirmOpen: boolean
}


export default class NftMaker extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      lastUse: Storage.get(LAST_MAKER_KEY),
      confirmOpen: false
    }
  }

  async componentWillMount() {
    const bc = Storage.get(LAST_MAKER_KEY);
    if (bc === Platform.ETH) {
      await eth.Ready();
    }
  }

  makeIt = async (bc: Platform) => {
    try {
      if (bc === Platform.ETH) {
        await eth.Ready();
      } else if (bc === Platform.EOS) {

      } else {

      }
    } catch (e) {
      toastError(e.message);
    }
    this.setState({
      lastUse: bc
    })
    Storage.set(LAST_MAKER_KEY, bc);
  }

  clearLastUse = () => {
    this.setState({
      lastUse: undefined,
      confirmOpen: false
    }, () => {
      Storage.remove(LAST_MAKER_KEY);
    })
  }

  render() {
    const { lastUse, confirmOpen } = this.state;
    return (
      <div>
        {!lastUse ?
          <Fragment>
            <Header as='h1' className="banner" textAlign='center'>
              <Header.Content>
                Choose Blockchains
              </Header.Content>
            </Header>
            <div className="platforms">
              <Card className="text-center">
                <Card.Content >
                  <Card.Header><i className="iconfont icon-ethereum1 bc-logo" />Ethereum</Card.Header>
                  <Card.Description>The most universal blockchain with billions of NFT assets. </Card.Description>
                </Card.Content>
                <Card.Content >
                  <h4>Support Standards</h4>
                  <Label size="large">ERC721</Label>
                  <Label size="large">ERC1155</Label>
                </Card.Content>
                <Card.Content >
                  <Button size="large" primary className="actionBtn" onClick={this.makeIt.bind(this, Platform.ETH)}>MAKE IT!</Button>
                </Card.Content>
              </Card>
              <Card className="text-center">
                <Card.Content >
                  <Card.Header><i className="iconfont icon-eos1 bc-logo" />EOS</Card.Header>
                  <Card.Description>The most efficient blockchain in the world. </Card.Description>
                </Card.Content>
                <Card.Content >
                  <h4>Support Standards</h4>
                  <Label size="large">THE-OASIS</Label>
                </Card.Content>
                <Card.Content >
                  <Button disabled size="large" color="black" className="actionBtn" onClick={this.makeIt.bind(this, Platform.EOS)}>COMING SOON</Button>
                </Card.Content>
              </Card>
              <Card className="text-center">
                <Card.Content >
                  <Card.Header><i className="iconfont icon-tron bc-logo" />Tron</Card.Header>
                  <Card.Description>Don't know how to say that, but it's also brilliant.</Card.Description>
                </Card.Content>
                <Card.Content>
                  <h4>Support Standards</h4>
                  <Label size="large">TRC20</Label>
                  <Label size="large">TRC721</Label>
                </Card.Content>
                <Card.Content >
                  <Button disabled size="large" color="google plus" className="actionBtn" onClick={this.makeIt.bind(this, Platform.TRON)}>COMING SOON</Button>
                </Card.Content>
              </Card>
            </div>
          </Fragment> : <div className="editor">
            {/* <Switch>
          <Route path='/eth'><EthNftMaker /></Route>
          <Route path='/eos'></Route>
          <Route path='/tron'></Route>
        </Switch> */}
            <div className="action">
              <Button icon>
                <Icon name="question" />
              </Button>
              <Button color="grey" icon onClick={() => this.setState({ confirmOpen: true })}>
                <Icon name="sign-out" />
              </Button>
            </div>
            <Confirm
              size="mini"
              content="Are you sure to go back to select other blockchains? It will clear all the data you just fill in."
              open={confirmOpen}
              onCancel={() => this.setState({ confirmOpen: false })}
              onConfirm={this.clearLastUse} />
            {lastUse === Platform.ETH ? <EthNftMaker /> : null}
            {/* {lastUse === Platform.EOS ? <EthNftMaker /> : null} */}
          </div>}
      </div >
    )
  }
}