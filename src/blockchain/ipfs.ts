import ipfsClient from 'ipfs-http-client';
import axios from '../common/axios';

const endpoints = [
  'ipfs.infura.io',
  'gateway.ipfs.io'
]

interface UploadResp {
  cid: string;
  size: number;
  timestamp: number;
}

class IpfsUtil {

  ipfs: ipfsClient;

  constructor() {
    this.ipfs = ipfsClient({
      host: endpoints[1],
      port: 443,
      protocol: 'https'
    })
    return this;
  }

  async uploadMeta(data: any): Promise<UploadResp> {
    return await axios.post('/v1/metadata/upload', data);
  }

  async uploadFile(fd: FormData): Promise<UploadResp> {
    return await axios.post('/v1/file/upload', fd, {
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8'
      }
    })
  }
}

export default new IpfsUtil();