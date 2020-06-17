import React from 'react';
import { Form, Button, Icon, Label, Container, Tab, Card } from 'semantic-ui-react';
import { MetaDataJson } from '../../common/datatype';
import { OFFICIAL_ERC721_ADDRESS, OFFICIAL_ERC1155_ADDRESS } from '../../common/config';
import ImagePreview from './ImagePreview';

enum ERCStandard {
  erc721 = 'ERC721',
  erc1155 = 'ERC1155'
}

enum DeployType {
  official,
  customized
}

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
  targetAddress: string;
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
    targetAddress: OFFICIAL_ERC721_ADDRESS,
    imgUrl: ''
  }

  getOfficialAddress = () => {
    const { standard } = this.state;
    if (standard === ERCStandard.erc721) {
      return OFFICIAL_ERC721_ADDRESS;
    } else {
      return OFFICIAL_ERC1155_ADDRESS;
    }
  }

  standardChange = (e, { value }) => {
    let address = '';
    if (value === ERCStandard.erc721) {
      address = OFFICIAL_ERC721_ADDRESS;
    } else {
      address = OFFICIAL_ERC1155_ADDRESS
    }
    this.setState({
      standard: value,
      targetAddress: address
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
      targetAddress: addr
    })
  }

  updateImg = (url) => {
    this.setState({
      image: url
    })
  }

  render() {
    const { standard, props, deployType, targetAddress } = this.state;
    return (
      <div>
        <ImagePreview updateImg={this.updateImg} />
        <div style={{ marginTop: 20 }}>
          <Form>
            <Form.Group>
              <Form.Input width="10" fluid label="NFT NAME" placeholder="NFT NAME" onChange={this.inputChange('name')}></Form.Input>
              <Form.Input width="10" fluid label="URI" placeholder="URI" onChange={this.inputChange('uri')}></Form.Input>
              <Form.Select width="4" fluid label="STANDARD"
                defaultValue={this.state.standard}
                onChange={this.standardChange}
                options={options} />
            </Form.Group>
            <Form.TextArea width="16" label="Description" onChange={this.inputChange('desc')} placeholder="NFT Description" />
            <hr />
            <div className="properties">
              <div className="propForm">
                {props.map((prop, i) => (
                  <Form.Group key={i} className="propItem">
                    <Form.Input label="key" placeholder="key" value={prop.key} onChange={this.propChange(i, 'key')}></Form.Input>
                    <Form.Input label="value" placeholder="value" value={prop.value} onChange={this.propChange(i, 'value')}></Form.Input>
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
              {props.length > 0 ?
                <div className="metaJson">
                  <h3>Meta Data</h3>
                  <pre>{JSON.stringify(this.getMetaData(), null, 2)}</pre>
                </div>
                : null}
            </div>
          </Form>
        </div>
        <hr />
        <div>
          <Form>
            <Button.Group>
              <Button secondary={deployType === DeployType.official} onClick={this.changeDeployType.bind(this, DeployType.official)}>Official Contract</Button>
              <Button.Or />
              <Button secondary={deployType === DeployType.customized} onClick={this.changeDeployType.bind(this, DeployType.customized)}>Customized Contract</Button>
            </Button.Group>
            <Form.Group className="deploy">
              <Form.Input readOnly={deployType === DeployType.official} label="CONTRACT ADDRESS" placeholder="Contract Address" value={targetAddress} ref='txt' onChange={this.inputChange('targetAddress')} />
              {deployType === DeployType.customized ?
                <div className="btn">
                  <Button>New Contract</Button>
                </div> : null}
            </Form.Group>
            <Button primary className="goBtn" size="big">NFT GO!</Button>
          </Form>
        </div>
      </div>
    )
  }
}