import React, { Fragment } from 'react';
import { Form, Button, Icon, Label, Container, Tab, Card, Modal, Popup, Input, Message, Segment, Step, Loader } from 'semantic-ui-react';
import { MetaDataJson, ERCStandard, EthTxStatus } from '../../common/datatype';
import NewContract from './NewERC721Contract';
import Ethereum from '../../blockchain/eth';
import { NFTGO721_ADDRESSS, NFTGO1155_ADDRESS } from '../../blockchain/config';
import { toastSuccess, toastWarning, toastError } from '../../common/helper';
import { TransactionReceipt } from 'web3-core';
import CreateAsset from './CreateAsset';
import { Route, NavLink, BrowserRouter as Router, Redirect, matchPath } from 'react-router-dom';
import Storage from '../../common/storage';
import eth from '../../blockchain/eth';
import { Slider } from 'react-semantic-ui-range';
import { css } from '@emotion/core';
import PacmanLoader from 'react-spinners/PacmanLoader';

enum DeployType {
  official,
  customized
}

interface IState {
  standard: ERCStandard;
  name: string;
  desc: string;
  image: string;
  props: Array<{
    key: string;
    value: string;
  }>;
  deployType: DeployType;
  officialAddr: string;
  customAddr: string;
  collectionName: string;
  symbol: string;
  uri: string;
  mintNum: number;
  uploadToIpfsLoading: boolean;
  uploadToIpfsComplete: boolean;
  sendTxLoading: boolean;
  sendTxComplete: boolean;
  newAssetURI: string;
  // URI Options for ERC1155 assets
  uriOptions: string[];
  // Selected URI for ERC1155 asset
  selectERC1155Uri: string;
  loadingBoxOpen: boolean;
  errorMsg: string;
}

export default class EthNftMaker extends React.Component<any, IState> {
  state = {
    standard: ERCStandard.erc721,
    props: [{
      key: 'we-love',
      value: 'satoshi'
    }],
    name: '',
    uri: '',
    mintNum: 1,
    desc: '',
    image: '',
    deployType: DeployType.official,
    officialAddr: NFTGO721_ADDRESSS,
    customAddr: '',
    imgUrl: '',
    collectionName: '',
    symbol: '',
    uploadToIpfsLoading: false,
    uploadToIpfsComplete: false,
    sendTxLoading: false,
    sendTxComplete: false,
    newAssetURI: '',
    uriOptions: [],
    selectERC1155Uri: '',
    loadingBoxOpen: false,
    errorMsg: ''
  }

  createAssetRef: any;

  componentWillMount() {
    this.setState({
      customAddr: Storage.get('customAddr') || ''
    })
    this.fetchERC1155Assets();
  }

  onRef = (ref) => {
    this.createAssetRef = ref;
  }

  standardChange = (e, data) => {
    let address = '';
    const value = data.panes[data.activeIndex].menuItem;
    if (value === ERCStandard.erc721) {
      address = NFTGO721_ADDRESSS;
    } else {
      address = NFTGO1155_ADDRESS;
    }
    this.setState({
      standard: value,
      officialAddr: address
    })
  }

  getOfficialAddress = () => {
    const { standard } = this.state;
    if (standard === ERCStandard.erc721) {
      return NFTGO721_ADDRESSS;
    } else {
      return NFTGO1155_ADDRESS;
    }
  }

  inputChange = (key: string) => {
    return (e) => {
      this.setState({
        [key]: e.target.value
      } as any)
    }
  }

  changeDeployType = (type: DeployType) => {
    let addr = '';
    if (type === DeployType.official) {
      addr = this.getOfficialAddress();
    }
    this.setState({
      deployType: type,
      officialAddr: addr
    })
  }

  // throw error if failed
  deploy = async () => {
    const { collectionName, symbol } = this.state;
    if (collectionName === '') {
      throw new Error('`Collection Name` is required');
    }
    if (symbol === '') {
      throw new Error('`Symbol` is required');
    }
    const receipt = await Ethereum.deployErc721(collectionName, symbol) as TransactionReceipt;
    toastSuccess(`Deploy a new ERC721 contract at address ${receipt.contractAddress}`);
    this.setState({
      customAddr: receipt.contractAddress
    })
    Storage.set('customAddr', receipt.contractAddress);
    return receipt;
  }

  // mint ERC721 NFT
  mintERC721 = async () => {
    const { uri, standard, mintNum } = this.state;
    this.setState({
      uploadToIpfsLoading: true,
      loadingBoxOpen: true,
    })
    try {
      // upload metadata
      const uri = await this.uploadMetadata();
      if (uri !== '') {
        this.setState({
          uploadToIpfsLoading: false,
          uploadToIpfsComplete: true,
          sendTxLoading: true
        })
        let receipt: TransactionReceipt;
        if (standard === ERCStandard.erc721) {
          receipt = await Ethereum.mintErc721(uri, this.targetAddress(), mintNum) as TransactionReceipt;
        }
        toastSuccess(`Mint NFT to ${Ethereum.from} success`)
        return receipt;
      } else {
        this.setState({
          loadingBoxOpen: false
        })
      }
    } catch (e) {
      console.error(e.message);
      if (e.code !== 4001) {
        // cancel transaction
        // toastError(`transaction failed: ${e.message}`);
        this.setState({
          errorMsg: e.message
        })
      } else {
        this.setState({
          errorMsg: 'You cancel the transaction'
        })
      }
    } finally {
      this.setState({
        sendTxLoading: false,
        sendTxComplete: true
      })
    }
  }

  targetAddress = () => {
    const { deployType, officialAddr, customAddr } = this.state;
    return deployType === DeployType.official ? officialAddr : customAddr;
  }

  // only erc1155 call this func
  createAsset = async () => {
    const { uri } = this.state;
    try {
      if (uri === '') {
        return toastWarning('URI is required. Upload metadata to IPFS first');
      }
      this.setState({
        sendTxLoading: true
      })
      const receipt = await eth.createErc1155Asset(uri, NFTGO1155_ADDRESS) as TransactionReceipt;
      toastSuccess(`Create new type of NFT asset success`);
      return receipt;
    } catch (e) {
      console.error(e.message);
      if (e.code !== 4001) {
        toastError(`transaction failed: ${e.message}`);
      }
    } finally {
      this.setState({
        sendTxLoading: false
      })
    }
  }

  fetchERC1155Assets = async () => {
    try {
      const uris = await eth.fetchERC1155Assets(NFTGO1155_ADDRESS);
      this.setState({
        uriOptions: uris
      })
    } catch (e) {
      console.error(e.message);
    }
  }

  mintERC1155 = async () => {

  }

  mintNumChange = (val) => {
    this.setState({
      mintNum: val
    })
  }

  uploadMetadata = async () => {
    return await this.createAssetRef.uploadToIpfs();
  }

  closeLoadingBox = () => {
    this.setState({
      loadingBoxOpen: false,
      uploadToIpfsLoading: false,
      sendTxLoading: false,
      uploadToIpfsComplete: false,
      sendTxComplete: false,
      errorMsg: ''
    })
  }

  render() {
    const {
      standard,
      deployType,
      sendTxLoading,
      officialAddr,
      mintNum,
      uriOptions,
      loadingBoxOpen,
      uploadToIpfsLoading,
      uploadToIpfsComplete,
      sendTxComplete,
      errorMsg
    } = this.state;

    const targetAddress = this.targetAddress();

    // ERC1155 panes
    const ERC1155Panes = [
      {
        menuItem: 'MINT TOKEN',
        render: () => <Fragment>
          <Form className="assetTypes">
            <Form.Select
              label='ASSET TYPE'
              fluid
              options={uriOptions.map(opt => ({
                key: opt,
                text: opt,
                value: opt
              }))}
              onChange={this.inputChange('selectERC1155Uri')}
            />
            <div className="metadata">
              META DATA
            </div>
          </Form>
          <hr />
          <div>
            <h4>MINT NUM: {mintNum}</h4>
            <Slider settings={{
              start: 1,
              min: 1,
              max: 50,
              step: 1,
              onChange: this.mintNumChange
            }} />
          </div>
          <Button loading={sendTxLoading} primary className="goBtn" size="big" onClick={this.mintERC721}>NFT GO !</Button>
        </Fragment>
      },
      {
        menuItem: 'CREATE NEW ASSET',
        render: () => <Fragment>
          <CreateAsset onRef={this.onRef} standard={ERCStandard.erc1155} />
          <hr />
          <Form>
            <Form.Group className="deploy">
              <Form.Input
                readOnly={deployType === DeployType.official}
                label="CONTRACT ADDRESS"
                placeholder="Contract Address"
                value={officialAddr}
                onChange={this.inputChange('customAddr')}
              />
            </Form.Group>
            <Button size="large" style={{ width: '100%' }} secondary onClick={this.createAsset}>CREATE ASSET</Button>
          </Form>
        </Fragment>
      }
    ]


    // NFT maker tab panes
    const panes = [
      {
        menuItem: {
          as: NavLink,
          content: 'ERC721',
          to: '/nft-maker/erc721',
          key: 'erc721',
        },
        render: () =>
          <Tab.Pane as={Route} path="/nft-maker/erc721">
            <Segment>
              <CreateAsset onRef={this.onRef} standard={standard} />
              <hr />
              <div>
                <Form>
                  <div className="deployHeader">
                    <Button.Group>
                      <Button secondary={deployType === DeployType.official} onClick={this.changeDeployType.bind(this, DeployType.official)}>Official Contract</Button>
                      <Button.Or />
                      <Button secondary={deployType === DeployType.customized} onClick={this.changeDeployType.bind(this, DeployType.customized)}>Customized Contract</Button>
                    </Button.Group>
                    <a style={{ fontSize: 16, marginRight: 5 }} href="https://etherscan.io" target="_blank">
                      <Icon name="code" color="grey" />
                    </a>
                  </div>
                  <Form.Group className="deploy inlineFormWithBtn">
                    <Form.Input
                      readOnly={deployType === DeployType.official}
                      label="CONTRACT ADDRESS"
                      placeholder="Contract Address"
                      value={targetAddress}
                      ref='txt'
                      onChange={this.inputChange('customAddr')}
                    />
                    <div className="btn">
                      {deployType === DeployType.customized ?
                        <NewContract
                          inputChange={this.inputChange}
                          title="NEW CONTRACT"
                          trigger={<Button>NEW CONTRACT</Button>}
                          submit={this.deploy}
                        />
                        : null}
                    </div>
                  </Form.Group>
                  <div>
                    <h4>MINT NUM: <span className="mintNum">{mintNum}</span></h4>
                    <Slider settings={{
                      start: 1,
                      min: 1,
                      max: 50,
                      step: 1,
                      onChange: this.mintNumChange
                    }} />
                  </div>
                  <Button loading={sendTxLoading} primary className="goBtn" size="big" onClick={this.mintERC721}>NFT GO !</Button>
                </Form>
              </div>
            </Segment>
          </Tab.Pane>
      },
      {
        menuItem: {
          as: NavLink,
          content: 'ERC1155',
          to: '/nft-maker/erc1155',
          key: 'erc1155',
        },
        render: () =>
          <Tab.Pane as={Route} path="/nft-maker/erc1155">
            <Segment>
              <Tab menu={{ secondary: true }} panes={ERC1155Panes} />
            </Segment>
          </Tab.Pane>
      }
    ]

    const defaultActiveIndex = panes.findIndex(pane => {
      return !!matchPath(window.location.pathname, {
        path: pane.menuItem.to,
        exact: true
      });
    });

    let loadingContent = '', loadingDesc = ''
    if (uploadToIpfsLoading && !uploadToIpfsComplete) {
      loadingContent = 'Uploading Metadata To IPFS...';
      loadingDesc = 'Make your NFT decentralized and accessiable in global'
    } else if (sendTxLoading && uploadToIpfsComplete) {
      loadingContent = 'Sending Transaction...';
      loadingDesc = 'Wait for confirmations on blockchain'
    } else if (sendTxComplete) {
      loadingContent = "You Got Your NFT!";
      loadingDesc = "Thanks for using NFT to kick off your trip"
    }

    return (
      <Router>
        <Tab defaultActiveIndex={defaultActiveIndex} onTabChange={this.standardChange} menu={{ secondary: true }} panes={panes} />
        <Modal size="tiny" dimmer='blurring' open={loadingBoxOpen} onClose={this.closeLoadingBox}>
          <Modal.Content className="loadingBox" >
            {errorMsg === '' ?
              <Fragment>
                {
                  sendTxComplete ?
                    <Icon className="symbol" name="like" style={{ marginTop: -15 }} /> :
                    <div className="loader">
                      <PacmanLoader
                        size={40}
                        loading={uploadToIpfsLoading || sendTxLoading}
                        color='#36D7B7'
                      />
                    </div>
                }
                <div className="description">
                  <h2>{loadingContent}</h2>
                  {loadingDesc ?
                    <Modal.Description>{loadingDesc}</Modal.Description> : null}
                </div>
              </Fragment> : <Fragment>
                <Icon className="symbol" name="frown outline" />
                <Message size="large" className="description" content={errorMsg} error />
              </Fragment>}
          </Modal.Content>
        </Modal>
      </Router >
    )
  }
}