import React from 'react';
import { Form, Button, Icon, Label, Container, Tab, Card, Modal, Popup, Input, Message } from 'semantic-ui-react';
import { MetaDataJson, ERCStandard, EthTxStatus } from '../../common/datatype';
import ImagePreview from './ImagePreview';
import CreateAsset from './CreateAsset';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-semantic-toasts';
import ipfs from '../../blockchain/ipfs';
import Ethereum from '../../blockchain/eth';
import { NFTGO721_ADDRESSS, NFTGO1155_ADDRESS } from '../../blockchain/config';
import { toastSuccess, toastWarning, toastError } from '../../common/helper';
import { TransactionReceipt } from 'web3-core';
import storage from 'umbrella-storage';

enum DeployType {
  official,
  customized
}

const URL_PREFIX = 'ipfs://ipfs'

const options = [
  {
    key: ERCStandard.erc721,
    text: ERCStandard.erc721,
    value: ERCStandard.erc721
  }, {
    key: ERCStandard.erc1155,
    text: ERCStandard.erc1155,
    value: ERCStandard.erc1155
  }
]

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
  uploadToIpfsLoading: boolean;
  sendTxLoading: boolean
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
    desc: '',
    image: '',
    deployType: DeployType.official,
    officialAddr: NFTGO721_ADDRESSS,
    customAddr: '',
    imgUrl: '',
    collectionName: '',
    symbol: '',
    uploadToIpfsLoading: false,
    sendTxLoading: false
  }

  componentWillMount() {
    this.setState({
      customAddr: storage.getLocalStorage('customAddr') || ''
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

  standardChange = (e, { value }) => {
    let address = '';
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

  addProp = () => {
    this.setState({
      props: this.state.props.concat({ key: '', value: '' })
    })
  }

  removeProp = (index: number) => {
    console.log(index);
    const { props } = this.state;
    props.splice(index, 1);
    this.setState({
      props
    })
  }

  propChange = (index: number, type: string) => {
    return (e) => {
      const { props } = this.state;
      const prop = props[index];
      if (type === 'key') {
        prop.key = e.target.value;
      } else {
        prop.value = e.target.value;
      }
      props[index] = prop;
      this.setState({
        props
      })
    }
  }

  getMetaData = () => {
    const { name, desc, image, props, standard } = this.state;
    const meta: MetaDataJson = {
      name,
      description: desc,
      image,
    }
    if (standard === ERCStandard.erc1155) {
      meta.properties = {};
      props.forEach(prop => {
        meta.properties[prop.key] = prop.value;
      })
    } else {
      meta.attributes = [];
      props.forEach(prop => {
        meta.attributes.push({
          trait_type: prop.key,
          value: prop.value
        })
      })
    }
    return meta;
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
    })
  }

  updateImg = (url) => {
    this.setState({
      image: url
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
    storage.setLocalStorage('customAddr', receipt.contractAddress);
    return receipt;
  }

  createAsset = async () => {
    const { uri } = this.state;
    try {
      if (uri === '') {
        return toastWarning('URI is required. Upload metadata to IPFS first');
      }
      this.setState({
        sendTxLoading: true
      })
      const receipt = await Ethereum.mintErc721(URL_PREFIX + uri, this.targetAddress()) as TransactionReceipt;
      toastSuccess(`Mint NFT to ${Ethereum.from} success`)
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

  uploadToIpfs = async () => {
    try {
      this.setState({
        uploadToIpfsLoading: true
      })
      const meta = this.getMetaData();
      if (meta.name === '') {
        return toastWarning('NFT `name` is required');
      }
      if (meta.image === '') {
        return toastWarning('NFT `image` is required');
      }
      if (meta.description === '') {
        return toastWarning('NFT `description` is required');
      }
      const res = await ipfs.upload(meta);
      this.setState({
        uri: res.cid
      })
    } catch (e) {
      toast({
        type: 'error',
        title: 'ERROR',
        description: e.message
      })
    } finally {
      this.setState({
        uploadToIpfsLoading: false
      })
    }
  }

  pasteIpfs = () => {
    toast({
      title: 'Paste to clipboard',
    })
  }

  targetAddress = () => {
    const { deployType, officialAddr, customAddr } = this.state;
    return deployType === DeployType.official ? officialAddr : customAddr;
  }

  render() {
    const {
      standard,
      props,
      deployType,
      uri,
      uploadToIpfsLoading,
      sendTxLoading,
    } = this.state;

    const targetAddress = this.targetAddress();
    return (
      <div>
        <ImagePreview updateImg={this.updateImg} />
        <div style={{ marginTop: 20 }}>
          <Form>
            <Form.Group>
              <Form.Select width="4" fluid label="STANDARD"
                defaultValue={this.state.standard}
                onChange={this.standardChange}
                options={options} />
              <Form.Input required width="16" fluid label="NFT NAME" placeholder="NFT NAME" onChange={this.inputChange('name')}></Form.Input>
              {standard === ERCStandard.erc1155 ?
                <Form.Input required width="10" fluid label="SYMBOL" placeholder="symbol" onChange={this.inputChange('symbol')} /> : null}
            </Form.Group>
            {/* <Form.Field fluid >
              <label>URI</label>
              <Input label={`https://metadata-api.nftgo.io/${officialAddr}`} placeholder="URI Fragment" onChange={this.inputChange('uri')} />
            </Form.Field> */}
            <Form.TextArea required width="16" label="Description" onChange={this.inputChange('desc')} placeholder="NFT Description" />
            <hr />
            <div className="properties">
              <div className="propForm">
                {props.map((prop, i) => (
                  <Form.Group key={i} className="inlineFormWithBtn propItem">
                    <Form.Input required label="key" placeholder="key" value={prop.key} onChange={this.propChange(i, 'key')}></Form.Input>
                    <Form.Input required label="value" placeholder="value" value={prop.value} onChange={this.propChange(i, 'value')}></Form.Input>
                    <div className="btn">
                      <Button icon circular onClick={this.removeProp.bind(this, i)}>
                        <Icon name="minus" />
                      </Button>
                    </div>
                  </Form.Group>
                ))}
                <Button style={{ marginTop: 5, width: '100%' }} icon onClick={this.addProp}>
                  {standard === ERCStandard.erc721 ? 'Attributes' : 'Properties'}
                  <Icon name="plus" />
                </Button>
              </div>
              <div className="metaJson">
                <h3>Meta Data</h3>
                <pre>{JSON.stringify(this.getMetaData(), null, 2)}</pre>
              </div>
            </div>
            <Message info>
              <Message.Header>Upload Metadata JSON to IPFS<Icon name="hand point down outline" /></Message.Header>
              <Message.List items={[
                'Make your NFT really decentralized and accessible in global.',
                'The whole url below will be set as `URI` of your NFT.'
              ]} />
            </Message>
            <Form.Field inline className="inlineFormWithBtn">
              {uri !== '' ?
                <CopyToClipboard text={uri} onCopy={this.pasteIpfs}>
                  <Input style={{ flex: 1 }} label={URL_PREFIX} value={uri} readOnly />
                </CopyToClipboard> :
                <Input style={{ flex: 1 }} label={URL_PREFIX} value={uri} readOnly />
              }
              {uri !== '' ?
                <Button style={{ marginRight: 10 }} href={'https://gateway.pinata.cloud/ipfs/' + uri} target="_blank" basic>CHECK</Button> :
                <Button color="google plus" loading={uploadToIpfsLoading} onClick={this.uploadToIpfs}>ULOAD METADATA TO IPFS</Button>
              }
            </Form.Field>
          </Form>
        </div>
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
                  <CreateAsset
                    inputChange={this.inputChange}
                    title="NEW CONTRACT"
                    trigger={<Button>NEW CONTRACT</Button>}
                    submit={this.deploy}
                    standard={standard}
                    onlyDeploy={standard === ERCStandard.erc1155}
                  />
                  : null}
              </div>
              {deployType === DeployType.customized && standard === ERCStandard.erc1155 ?
                <div className="btn">
                  <CreateAsset
                    title="CREATE ASSET"
                    trigger={<Button secondary>CREATE ASSET</Button>}
                    inputChange={this.inputChange}
                    submit={this.createAsset}
                    standard={standard}
                  />
                </div>
                : null}
            </Form.Group>
            <Button loading={sendTxLoading} primary className="goBtn" size="big" onClick={this.createAsset}>NFT GO !</Button>
          </Form>
        </div>
      </div >
    )
  }
}