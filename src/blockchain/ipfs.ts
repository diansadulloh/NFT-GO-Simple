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

  async upload(data: any): Promise<UploadResp> {
    return await axios.post('/v1/metadata/upload', data);
  }
}

export default new IpfsUtil();