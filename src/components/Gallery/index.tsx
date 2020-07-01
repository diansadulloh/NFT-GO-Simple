import React from 'react';
import { Segment } from 'semantic-ui-react';
import './index.scss';
import eth, { TokenId } from '../../blockchain/eth';
import Auth, { CrossChainAccount } from '../../common/auth';
import { toastError, fetchMetadata } from '../../common/helper';
import { NFTGO721_ADDRESSS, NFTGO1155_ADDRESS, IPFS_GATEWAY } from '../../blockchain/config';
import { Token } from '../../common/datatype';

interface IState {
  tokens: Token[];
  auth: CrossChainAccount;
  loading: boolean;
}

class NftGallery extends React.Component<any, IState>{
  state = {
    tokens: [],
    auth: undefined as CrossChainAccount,
    loading: false
  }

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    const auth = Auth.getAuth();
    this.setState({
      auth
    })
    this.fetchEthNfts();
  }

  fetchEthNfts = async () => {
    const { auth, loading } = this.state;
    if (!auth || !auth.eth) {
      return;
    }
    try {
      this.setState({
        loading: true
      })
      const nfts = await Promise.all([
        this.fetchERC721Nfts(auth.eth.address),
        this.fetchERC1155Nfts(auth.eth.address)
      ]);
      this.setState({
        tokens: nfts[0].concat(nfts[1])
      })
    } catch (e) {
      toastError(e.message);
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  fetchERC721Nfts = async (owner: string): Promise<Token[]> => {
    const tokens = await eth.fetchERC721NftsByOwner(NFTGO721_ADDRESSS, owner);
    const uriToMeta = {};
    await Promise.all(tokens.map(async (token) => {
      if (!uriToMeta[token.uri]) {
        uriToMeta[token.uri] = await fetchMetadata(token.uri);
      }
    }));
    return tokens.map(token => ({
      id: token.tokenId,
      ...uriToMeta[token.uri]
    }))
  }

  fetchERC1155Nfts = async (owner: string): Promise<Token[]> => {
    const res = await eth.fetchERC1155NftsByOwner(NFTGO1155_ADDRESS, owner);
    const types = [];
    for (let idType in res.typeToUri) {
      types.push({
        type: idType,
        uri: res.typeToUri[idType]
      })
    }
    const typeToMetadata = {};

    await Promise.all(types.map(async t => {
      const metadata = await fetchMetadata(t.uri);
      typeToMetadata[t.type] = metadata;
    }));

    return res.tokenIds.map((tokenId: number) => ({
      id: tokenId,
      ...typeToMetadata[tokenId >> 128]
    }))
  }

  render() {
    return <div>

    </div>
  }
}

export default NftGallery;