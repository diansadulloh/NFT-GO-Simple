import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { ERC721_CONTRACT_ABI, NFTGO721_ADDRESSS, ERC721_CONTRACT_BYTECODE } from './config';
import { PromiEvent, TransactionReceipt } from 'web3-core';
import { resolve } from 'dns';
import { rejects } from 'assert';

declare global {
  interface Window {
    web3: Web3;
    ethereum: any
  }
}


let ethUtil: EthereumUtil;

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
    } else {
      alert('Metamask required');
      return;
    }

    return this.web3;
  }

  get from() {
    return this.web3.eth.defaultAccount;
  }

  async deployErc721(name: string, symbol: string) {
    return new Promise(async (resolve, reject) => {
      await this.Ready();
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

  mintErc721(uri: string, address: string) {
    return new Promise(async (resolve, reject) => {
      await this.Ready();
      const erc721Contract = new this.web3.eth.Contract(ERC721_CONTRACT_ABI as any, address, {
        from: this.web3.eth.defaultAccount,
        gasPrice: '30000000000',
      })
      const ev = erc721Contract.methods.mint(this.from, uri).send({
        value: 0.005 * Math.pow(10, 18)
      })
      ev.on('receipt', (receipt: TransactionReceipt) => {
        resolve(receipt);
      }).on('error', (err: Error) => {
        reject(err);
      })
    })
  }

  async mintErc1155() {

  }

  async transferErc721() {

  }

  async transferErc1155() {

  }
}

export default new EthereumUtil();