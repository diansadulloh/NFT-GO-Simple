import React from 'react';
import { Form, Button, Icon, Label, Container, Tab, Card, Modal, Popup, Input, Message, Segment, List } from 'semantic-ui-react';
import { MetaDataJson, ERCStandard, EthTxStatus } from '../../common/datatype';
import ImagePreview from './ImagePreview';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-semantic-toasts';
import ipfs from '../../blockchain/ipfs';
import { toastSuccess, toastWarning, toastError } from '../../common/helper';

const URL_PREFIX = 'ipfs://ipfs/'

const options = [
  {
    key: ERCStandard.erc721,
    text: ERCStandard.erc721,
    value: ERCStandard.erc721
  },
  {
    key: ERCStandard.erc1155,
    text: ERCStandard.erc1155,
    value: ERCStandard.erc1155
  }
]

interface IProps {
  standard: ERCStandard;
  onRef: (ref) => void;
}

interface IState {
  name: string;
  desc: string;
  image: string;
  props: Array<{
    key: string;
    value: string;
  }>;
  collectionName: string;
  symbol: string;
}

class CreateAsset extends React.Component<IProps, IState> {
  state = {
    standard: ERCStandard.erc721,
    props: [{
      key: 'we-love',
      value: 'satoshi'
    }],
    name: '',
    desc: '',
    image: '',
    imgUrl: '',
    collectionName: '',
    symbol: '',
  }

  componentDidMount() {
    this.props.onRef(this);
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
      const val = e.target.value;
      this.setState({
        [key]: val
      } as any)
    }
  }

  updateImg = (url) => {
    this.setState({
      image: url
    })
  }

  uploadToIpfs = async (): Promise<string> => {
    const meta = this.getMetaData();
    if (meta.name === '') {
      toastWarning('NFT `name` is required');
      return ''
    }
    if (meta.image === '') {
      toastWarning('NFT `image` is required');
      return ''
    }
    if (meta.description === '') {
      toastWarning('NFT `description` is required');
      return ''
    }
    const res = await ipfs.uploadMeta(meta);
    return URL_PREFIX + res.cid
  }

  pasteIpfs = () => {
    toast({
      title: 'Paste to clipboard',
    })
  }

  render() {
    const {
      props,
    } = this.state;

    const { standard } = this.props;

    return (
      <div>
        <ImagePreview updateImg={this.updateImg} />
        <div style={{ marginTop: 20 }}>
          <Form>
            <Form.Group>
              <Form.Input required width="16" fluid label="NFT NAME" placeholder="NFT NAME" onChange={this.inputChange('name')}></Form.Input>
            </Form.Group>
            <Form.TextArea required width="16" label="DESCRIPTION" onChange={this.inputChange('desc')} placeholder="NFT Description" />
            <hr />
            <div className="properties">
              <div className="propForm">
                {props.map((prop, i) => (
                  <Form.Group widths="equal" key={i} className="inlineFormWithBtn propItem">
                    <Form.Input required label="KEY" placeholder="key" value={prop.key} onChange={this.propChange(i, 'key')}></Form.Input>
                    <Form.Input required label="VALUE" placeholder="value" value={prop.value} onChange={this.propChange(i, 'value')}></Form.Input>
                    <div className="btn">
                      <Button icon circular onClick={this.removeProp.bind(this, i)}>
                        <Icon name="minus" />
                      </Button>
                    </div>
                  </Form.Group>
                ))}
                <Button style={{ marginTop: 5, marginBottom: 10, width: '100%' }} icon onClick={this.addProp}>
                  {standard === ERCStandard.erc721 ? 'Attributes' : 'Properties'}
                  <Icon name="plus" />
                </Button>
              </div>
              {/* <div className="metadata">
                <h3>{standard === ERCStandard.erc721 ? 'Attributes' : 'Properties'}</h3>
                <List divided>
                  {props.map(prop => <List.Item>
                    <Label size="medium" color="black">{prop.key}</Label>
                    <span>{prop.value}</span>
                  </List.Item>)}
                </List>
              </div> */}
            </div>
            {/* <Message info>
              <Message.Header>Upload Metadata JSON to IPFS<Icon name="hand point down outline" /></Message.Header>
              <Message.List items={[
                'Make your NFT really decentralized and accessible in global.',
                'The whole url below will be set as `URI` of your NFT.'
              ]} />
            </Message> */}
            {/* <Form.Field inline className="inlineFormWithBtn">
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
            </Form.Field> */}
          </Form>
        </div>
      </div >
    )
  }
}

export default CreateAsset;