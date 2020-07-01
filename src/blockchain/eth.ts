import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { ERC721_CONTRACT_ABI, ERC721_CONTRACT_BYTECODE, ERC1155_CONTRACT_ABI } from './config';
import { PromiEvent, TransactionReceipt } from 'web3-core';
import Auth, { Platform } from '../common/auth';

declare global {
  interface Window {
    web3: Web3;
    ethereum: any
  }
}

export type TokenId = number | string;
export type IdType = number;


class EthereumUtil {
  web3: Web3;

  async Ready() {
    if (this.web3) return this.web3;
    if (window.ethereum) {
      console.log('init metamask', window.ethereum);
      this.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await this.web3.eth.getAccounts();
      this.web3.eth.defaultAccount = accounts[0];
      Auth.login({
        bc: Platform.ETH,
        address: accounts[0]
      })
    } else {
      throw new Error('Metamask required');
    }

    return this.web3;
  }

  get from() {
    return this.web3.eth.defaultAccount;
  }

  async checkWeb3() {
    if (!this.web3) await this.Ready();
  }


  async fetchERC1155Assets(address: string): Promise<{
    types: number[];
    uris: string[];
  }> {
    await this.checkWeb3();
    const erc1155Contract = new this.web3.eth.Contract(ERC1155_CONTRACT_ABI as any, address, {
      from: this.web3.eth.defaultAccount,
      gasPrice: '30000000000'
    });

    const result = await erc1155Contract.methods.allUris().call();
    return {
      types: result._types,
      uris: result._uris.map(bytes => bytes.reduce((val, curr) => {
        return val + String.fromCharCode(this.web3.utils.hexToNumber(curr))
      }, ''))
    }
  }

  ERC721Contract(address: string, opts?: any) {
    return new this.web3.eth.Contract(ERC721_CONTRACT_ABI as any, address, opts);
  }

  ERC1155Contract(address: string, opts?: any) {
    return new this.web3.eth.Contract(ERC1155_CONTRACT_ABI as any, address, opts);
  }

  async fetchERC721MintFee(address: string): Promise<number> {
    await this.checkWeb3();
    const ERC721 = new this.web3.eth.Contract(ERC721_CONTRACT_ABI as any, address);
    return await ERC721.methods.fee().call() / Math.pow(10, 18);
  }

  async fetchERC1155CreateFee(address: string): Promise<number> {
    await this.checkWeb3();
    const ERC1155 = new this.web3.eth.Contract(ERC1155_CONTRACT_ABI as any, address);
    return await ERC1155.methods.createFee().call() / Math.pow(10, 18);
  }

  async fetchERC721NftsByOwner(address: string, owner: string): Promise<Array<{
    tokenId: TokenId;
    uri: string;
  }>> {
    await this.checkWeb3();
    const ERC721 = this.ERC721Contract(address);
    const tokens = await ERC721.methods.tokensByOwner(owner).call();
    const uris = await Promise.all(tokens.map(tid => {
      return ERC721.methods.tokenURI(tid);
    }))

    return tokens.map((id, i) => {
      return {
        tokenId: id,
        uri: uris[i]
      }
    })
  }

  async fetchERC1155NftsByOwner(address: string, owner: string): Promise<{
    tokenIds: TokenId[];
    typeToUri: {
      [key: number]: string
    };
  }> {
    await this.checkWeb3();
    const ERC1155 = this.ERC721Contract(address);
    const tokens: number[] = await ERC1155.methods.ownerToIds(owner).call();
    const typeToUri = {};
    tokens.forEach(tokenId => {
      typeToUri[tokenId >> 128] = true;
    })
    const idTypes = [];
    for (let type in typeToUri) {
      idTypes.push(type);
    }
    const uris = await Promise.all(idTypes.map(type => {
      return ERC1155.methods.typeToUri(type).call();
    }));
    idTypes.forEach((idType, i) => {
      typeToUri[idType] = uris[i];
    });
    return {
      tokenIds: tokens,
      typeToUri
    }
  }

  deployErc721(name: string, symbol: string) {
    return new Promise(async (resolve, reject) => {
      await this.checkWeb3();
      let newERC721 = new this.web3.eth.Contract(ERC721_CONTRACT_ABI as any);
      newERC721.deploy({
        data: ERC721_CONTRACT_BYTECODE,
        arguments: [name, symbol]
      }).send({
        from: this.from,
        gasPrice: '30000000000'
      }).on('receipt', (receipt: TransactionReceipt) => {
        resolve(receipt);
      }).on('error', (err) => {
        reject(err);
      })
    })
  }

  async deployErc1155() {

  }

  mintErc721(uri: string, address: string, num: number) {
    return new Promise(async (resolve, reject) => {
      await this.checkWeb3();
      const erc721Contract = this.ERC721Contract(address, {
        from: this.from,
        gasPrice: '30000000000',
      })
      const ev = erc721Contract.methods.mint(this.from, uri, num).send({
        value: 0.001 * Math.pow(10, 18) * num
      })
      ev.on('receipt', (receipt: TransactionReceipt) => {
        resolve(receipt);
      }).on('error', (err: Error) => {
        reject(err);
      })
    })
  }

  createErc1155Asset(uri: string, address: string, isNF: boolean = true) {
    return new Promise(async (resolve, reject) => {
      const erc1155Contract = this.ERC1155Contract(address, {
        from: this.from,
        gasPrice: '30000000000'
      })

      const ev = erc1155Contract.methods.create(uri, isNF).send({
        value: 0.005 * Math.pow(10, 18)
      });
      ev.on('receipt', (receipt: TransactionReceipt) => {
        resolve(receipt);
      }).on('error', (err: Error) => {
        reject(err);
      })
    })
  }

  async mintErc1155(type: number, num: number, address: string) {
    return new Promise(async (resolve, reject) => {
      await this.Ready();
      const erc1155Contract = this.ERC1155Contract(address, {
        from: this.from,
        gasPrice: '30000000000'
      })

      const ev = erc1155Contract.methods.mintNonFungible(type, this.from, num).send({
        value: 0.001 * Math.pow(10, 18)
      });
      ev.on('receipt', (receipt: TransactionReceipt) => {
        resolve(receipt);
      }).on('error', (err: Error) => {
        reject(err);
      })
    })
  }

  async transferErc721() {

  }

  async transferErc1155() {

  }
}

export default new EthereumUtil();