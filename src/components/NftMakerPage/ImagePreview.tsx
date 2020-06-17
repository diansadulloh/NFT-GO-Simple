import React, { RefObject } from 'react';
import { Image, Form, Icon, List, Card, Header, Loader } from 'semantic-ui-react';
import { debounce } from 'lodash';

interface IState {
  imgUrl: string;
  width: number;
  height: number;
  size: number | string;
  imgLoading: boolean;
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
    imgLoading: false
  }

  imageRef: RefObject<HTMLImageElement>;

  debounceChange: any;
  constructor(props) {
    super(props);

    this.imageRef = React.createRef();
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

  imageChange = (e) => {
    e.persist();
    if (!this.debounceChange) {
      this.debounceChange = debounce(() => {
        // console.log(e.target.value);
        const url = e.target.value;
        this.setState({
          imgUrl: url || '',
          width: 0,
          height: 0,
          size: 0,
          imgLoading: true
        }, () => {
          this.props.updateImg(url);
          this.getImageInfo()
        })
      }, 500);
    }

    this.debounceChange();
  }

  getImageInfo = async () => {
    const { imgUrl } = this.state;
    if (!imgUrl) {
      this.setState({
        width: 0,
        height: 0,
        size: 0,
        imgLoading: false
      })
      return;
    }
    try {
      const u = new URL(imgUrl)
    } catch (e) {
      this.setState({
        imgLoading: false
      })
      return;
    }
    const img = document.createElement('img');
    img.src = imgUrl;
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
    try {
      const res = await fetch(imgUrl);
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

  render() {
    const { imgUrl, width, height, size, imgLoading } = this.state;
    return (
      <div className="imagePreview">
        <Card className="preview">
          {imgUrl && !imgLoading ?
            <img src={imgUrl} ref={this.setImageRef} /> : <div>
              <Header icon>
                {!imgLoading ?
                  <Icon color="grey" name="picture" /> : <Loader active />}
              </Header>
            </div>}
        </Card>
        <div className="info">
          <Form>
            <Form.Input onChange={this.imageChange} label="Image Url" placeholder="https://"></Form.Input>
          </Form>
          <List>
            <p><strong>Resolution: </strong>{`${width} × ${height}`}</p>
            <p><strong>Size: </strong>{this.beautifyBytes(size)}</p>
            <p><strong>Host: </strong>{this.getDomain(imgUrl)}</p>
          </List>
        </div>
      </div>
    )
  }
}