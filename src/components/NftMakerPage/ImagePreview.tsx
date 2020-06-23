import React, { RefObject, Fragment } from 'react';
import { Image, Form, Icon, List, Card, Header, Loader, Label, Button, Divider, Input } from 'semantic-ui-react';
import { debounce } from 'lodash';
import { toastWarning, toastError, toastSuccess } from '../../common/helper';
import ipfs from '../../blockchain/ipfs';

interface IState {
  imgUrl: string;
  width: number;
  height: number;
  size: number | string;
  imgLoading: boolean;
  tmpPath: string;
  tmpFile: File;
}

interface IProps {
  updateImg: (url) => void
}

export default class ImagePreview extends React.Component<IProps, IState> {
  state = {
    imgUrl: '',
    width: 0,
    height: 0,
    size: 0,
    imgLoading: false,
    tmpPath: '',
    tmpFile: undefined
  };


  imageRef: RefObject<HTMLImageElement>;
  fileRef: any;

  debounceChange: any;
  constructor(props) {
    super(props);

    this.imageRef = React.createRef();
    this.fileRef = React.createRef();
  }

  setImageRef = e => {
    this.imageRef = e;
    if (!this.imageRef) return;
    const node = this.imageRef.current;
    if (!node) return;
    node.onload = () => {
      this.setState({
        imgLoading: false
      })
    }
    node.onerror = () => {
      this.setState({
        imgLoading: false
      })
    }
  }

  getImageInfo = async (url: string, isFetch = false) => {
    if (!url) {
      this.setState({
        width: 0,
        height: 0,
        size: 0,
        imgLoading: false
      })
      return;
    }
    try {
      const u = new URL(url)
    } catch (e) {
      this.setState({
        imgLoading: false
      })
      return;
    }
    const img = document.createElement('img');
    img.src = url;
    img.onload = () => {
      this.setState({
        width: img.naturalWidth,
        height: img.naturalHeight,
        imgLoading: false
      })
    };
    img.onerror = () => {
      this.setState({
        imgLoading: false
      })
    }
    if (isFetch) {
      try {
        const res = await fetch(url);
        const data = await res.blob();
        this.setState({
          size: data.size
        })
      } catch (e) {
        this.setState({
          size: 0
        })
      }
    }
  }

  beautifyBytes = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) {
      return (bytes / 1024 / 1024 / 1024).toFixed(3) + ' GB'
    } else if (bytes >= 1024 * 1024) {
      return (bytes / 1024 / 1024).toFixed(3) + ' MB'
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(3) + ' KB'
    } else if (bytes === 0) {
      return 'no data'
    } else {
      return bytes + ' B';
    }
  }

  getDomain(url: string) {
    if (url === '') return 'no data';
    try {
      const u = new URL(url);
      return u.hostname;
    } catch (e) {
      return 'no data';
    }
  }

  attachFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const url = e.target.result as string;
      this.getImageInfo(url)
      this.setState({
        imgUrl: '',
        tmpPath: url,
        size: file.size,
      })
    }
    this.setState({
      tmpFile: file
    })
  }

  submitUpload = async () => {
    const { tmpFile } = this.state;
    if (!tmpFile) {
      return toastWarning('please attach your image first');
    }
    if (tmpFile.size > 2 * 1024 * 1024) {
      return toastWarning('Image size should be lower than 2 MB');
    }

    try {
      this.setState({
        imgLoading: true
      })
      const fd = new FormData();
      fd.append('file', tmpFile);
      const res = await ipfs.uploadFile(fd);
      const newUrl = "ipfs://ipfs/" + res.cid;
      this.setState({
        imgUrl: res.cid
      })
      this.props.updateImg(newUrl);
      toastSuccess('upload success')
    } catch (e) {
      toastError(e.message);
    } finally {
      this.setState({
        imgLoading: false
      })
    }
  }

  render() {
    const { imgUrl, tmpPath, width, height, size, imgLoading } = this.state;
    return (
      <div className="imagePreview">
        <Card className="preview" onClick={() => this.fileRef.current.click()}>
          {tmpPath ?
            <Image src={tmpPath} ref={this.setImageRef} /> :
            <Header icon>
              <Icon color="grey" name="picture" />
              <span className="holderText" >Upload Image or Paste an URL</span>
            </Header>
          }
          {imgLoading ?
            <Loader active /> : null}
          <input
            ref={this.fileRef}
            type="file"
            style={{ display: 'none' }}
            onChange={this.attachFile}
            accept="image/*"
          />
        </Card>
        <div className="info">
          <List>
            <Input
              style={{ marginBottom: 10 }}
              fluid
              label='ipfs://ipfs/'
              value={imgUrl}
              readOnly
              action={{
                icon: 'eye',
                as: 'a',
                href: 'https://gateway.pinata.cloud/ipfs/' + imgUrl,
                disabled: imgUrl === '',
                target: '_blank'
              }}
            />
            <p><strong>Size: </strong>{`${width} × ${height}`}</p>
            <p><strong>Bytes: </strong>{this.beautifyBytes(size)}</p>
            <p><strong>Host: </strong>{this.getDomain(imgUrl)}</p>
          </List>
          {tmpPath && !imgUrl ?
            <Button color="google plus" onClick={this.submitUpload} disabled={imgLoading}>UPLOAD</Button> : null}
        </div>
      </div>
    )
  }
}