import React, { Fragment } from 'react';
import { Form, Button, Icon, Label, Container, Tab, Card, Modal, Popup, Input, Message, Segment, Step, Loader, Image } from 'semantic-ui-react';
import { MetaDataJson, ERCStandard, EthTxStatus, NFTStandard } from '../../common/datatype';
import NewContract from './NewERC721Contract';
import Ethereum from '../../blockchain/eth';
import { NFTGO721_ADDRESSS, NFTGO1155_ADDRESS, IPFS_GATEWAY } from '../../blockchain/config';
import { toastSuccess, toastWarning, toastError } from '../../common/helper';
import { TransactionReceipt } from 'web3-core';
import CreateAsset from './CreateAsset';
import { Route, NavLink, BrowserRouter as Router, Redirect, matchPath, withRouter } from 'react-router-dom';
import Storage from '../../common/storage';
import eth from '../../blockchain/eth';
import { Slider } from 'react-semantic-ui-range';
import PacmanLoader from 'react-spinners/PacmanLoader';

enum DeployType {
  official,
  customized
}

interface IState {
  standard: NFTStandard;
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
  typeOptions: number[];
  // Selected URI for ERC1155 asset
  selectERC1155Uri: string;
  erc1155Metadata: MetaDataJson;
  fetchErc1155MetadataLoading: boolean;
  loadingBoxOpen: boolean;
  errorMsg: string;
  erc721MintFee: number;
  erc1155CreateFee: number;
}

class EthNftMaker extends React.Component<any, IState> {
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
    typeOptions: [],
    selectERC1155Uri: '',
    erc1155Metadata: undefined,
    loadingBoxOpen: false,
    errorMsg: '',
    fetchErc1155MetadataLoading: false,
    erc721MintFee: 0,
    erc1155CreateFee: 0
  }

  createAssetRef: any;

  async componentWillMount() {
    this.setState({
      customAddr: Storage.get('customAddr') || '',
    })
    this.fetchERC1155Assets();
    this.fetchCurrentFee();
  }

  fetchCurrentFee = async () => {
    const fees = await Promise.all([
      eth.fetchERC721MintFee(NFTGO721_ADDRESSS),
      eth.fetchERC1155CreateFee(NFTGO1155_ADDRESS)
    ])
    console.log(fees);
    this.setState({
      erc721MintFee: fees[0],
      erc1155CreateFee: fees[1]
    })
  }

  onRef = (ref) => {
    this.createAssetRef = ref;
  }

  standardChange = (e, data) => {
    let address = '';
    const value = data.panes[data.activeIndex].menuItem.key;
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

  uploadMetadataStart = () => {
    this.setState({
      uploadToIpfsLoading: true,
      loadingBoxOpen: true,
    })
  }

  sendTxStart = () => {
    this.setState({
      uploadToIpfsLoading: false,
      uploadToIpfsComplete: true,
      sendTxLoading: true
    })
  }

  sendTxSuccess = () => {
    this.setState({
      sendTxLoading: false,
      sendTxComplete: true
    })
  }

  setErrorMsgInLoadingBox = (e) => {
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
  }

  // mint ERC721 NFT
  mintERC721 = async () => {
    const { standard, mintNum } = this.state;
    this.uploadMetadataStart();
    try {
      // upload metadata
      const uri = await this.uploadMetadata();
      if (uri !== '') {
        this.sendTxStart();
        let receipt: TransactionReceipt;
        if (standard === ERCStandard.erc721) {
          receipt = await Ethereum.mintErc721(uri, this.targetAddress(), mintNum) as TransactionReceipt;
        }
        return receipt;
      } else {
        this.setState({
          loadingBoxOpen: false
        })
      }
    } catch (e) {
      this.setErrorMsgInLoadingBox(e);
    } finally {
      this.sendTxSuccess();
    }
  }

  targetAddress = () => {
    const { deployType, officialAddr, customAddr } = this.state;
    return deployType === DeployType.official ? officialAddr : customAddr;
  }

  // only erc1155 call this func
  createAsset = async () => {
    const { uri } = this.state;
    this.uploadMetadataStart();
    try {
      // upload metadata
      const uri = await this.uploadMetadata();
      if (uri !== '') {
        this.sendTxStart();
        const receipt = await eth.createErc1155Asset(uri, NFTGO1155_ADDRESS) as TransactionReceipt;
        return receipt;
      } else {
        this.setState({
          loadingBoxOpen: false
        })
      }
    } catch (e) {
      this.setErrorMsgInLoadingBox(e);
    } finally {
      this.sendTxSuccess();
    }
  }

  fetchERC1155Assets = async () => {
    try {
      const res = await eth.fetchERC1155Assets(NFTGO1155_ADDRESS);
      this.setState({
        uriOptions: res.uris,
        typeOptions: res.types,
        selectERC1155Uri: res.uris[0] || ''
      }, () => {
        if (res.uris.length !== 0) {
          this.fetchERC1155Metadata();
        }
      })
    } catch (e) {
      console.error(e.message);
      toastError(e.message);
    }
  }

  onSelectURI = (e, { value }) => {
    this.setState({
      selectERC1155Uri: value
    }, () => {
      this.fetchERC1155Metadata();
    })
  }

  getImageUrl = (ipfsUri: string) => {
    if (!ipfsUri) return '';
    return IPFS_GATEWAY + ipfsUri.replace('ipfs://', '')
  }

  // fetch metadata from IPFS gateway
  fetchERC1155Metadata = async () => {
    const { selectERC1155Uri } = this.state;
    try {
      this.setState({
        fetchErc1155MetadataLoading: true
      })
      const res = await fetch(this.getImageUrl(selectERC1155Uri));
      const metadata = await res.json();
      this.setState({
        erc1155Metadata: metadata
      })
    } catch (e) {
      console.error(e.message);
      toastError(e.message);
    } finally {
      this.setState({
        fetchErc1155MetadataLoading: false
      })
    }
  }

  erc1155TabChange = (e, { activeIndex }) => {
    if (activeIndex === 0) {
      this.fetchERC1155Assets();
    }
  }

  mintERC1155 = async () => {
    const { mintNum, selectERC1155Uri, uriOptions, typeOptions } = this.state;
    try {
      this.setState({
        sendTxLoading: true
      });
      const index = uriOptions.indexOf(selectERC1155Uri);
      await eth.mintErc1155(typeOptions[index], mintNum, NFTGO1155_ADDRESS);
      toastSuccess(`Mint ${mintNum} NFT on ${NFTGO1155_ADDRESS} success!`);
    } catch (e) {
      console.error(e.message);
      if (e.code !== 4001) {
        toastError(e.message);
      }
    } finally {
      this.setState({
        sendTxLoading: false
      })
    }
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
      errorMsg,
      selectERC1155Uri,
      erc1155Metadata,
      fetchErc1155MetadataLoading,
      erc721MintFee,
      erc1155CreateFee
    } = this.state;

    const targetAddress = this.targetAddress();

    const metadataProps = [];
    if (erc1155Metadata) {
      for (let key in erc1155Metadata.properties) {
        metadataProps.push({
          key,
          value: erc1155Metadata.properties[key]
        })
      }
    }

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
              onChange={this.onSelectURI}
              value={selectERC1155Uri}
            />

            <Segment loading={fetchErc1155MetadataLoading} className="metadata">
              {erc1155Metadata ? <Fragment>
                <div className="image">
                  <img src={this.getImageUrl(erc1155Metadata.image)} />
                </div>
                <div className="info">
                  <h3>{erc1155Metadata.name}</h3>
                  <p>{erc1155Metadata.description}</p>
                  <div className="properties">
                    {metadataProps.map((prop, i) =>
                      <div className="prop" key={i}>
                        <Label size="large" color="black">{prop.key}</Label>
                        <Input readOnly value={prop.value} />
                      </div>)}
                  </div>
                </div>
              </Fragment> : <p className="text-center">No Data</p>}
            </Segment>
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

          <Button loading={sendTxLoading} primary className="goBtn" size="big" onClick={this.mintERC1155}>NFT GO !</Button>
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
            <div className="totalFee">
              <h4>CREATE FEE:</h4>
              <span className="value">{erc1155CreateFee.toFixed(3) || 0} <i className="iconfont icon-ethereum1 bc-logo" /></span>
            </div>
            <Button className="goBtn" size="large" style={{ width: '100%' }} secondary onClick={this.createAsset}>CREATE ASSET</Button>
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
              <CreateAsset onRef={this.onRef} standard={ERCStandard.erc721} />
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
                  <div className="totalFee">
                    <h4>MINT FEE:</h4>
                    <span className="value">{(erc721MintFee * mintNum).toFixed(3) || 0} <i className="iconfont icon-ethereum1 bc-logo" /></span>
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
              <Tab onTabChange={this.erc1155TabChange} menu={{ secondary: true }} panes={ERC1155Panes} />
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
      loadingContent = 'Uploading Info To IPFS...';
      loadingDesc = 'Make your NFT decentralized and accessiable in global'
    } else if (sendTxLoading) {
      loadingContent = 'Sending Transaction...';
      loadingDesc = 'Wait for confirmations on blockchain'
    } else if (sendTxComplete) {
      if (standard === ERCStandard.erc721) {
        loadingContent = "You Got Your NFT!";
        loadingDesc = "Thanks for using NFTGO to kick off your trip"
      } else {
        loadingContent = "You Got A Brand New Asset";
        loadingDesc = "Now go to MINT TOKENs for yourself";
      }
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

export default withRouter(EthNftMaker);