import Storage from "./storage";

export interface Account {
  bc: Platform;
  address: string;
  publicKey?: string;
}

const ACCOUNT_CACHE_PREFIX = 'acc_'

export enum Platform {
  ETH = 'Ethereum',
  EOS = 'EOS',
  TRON = 'Tron'
}


export default class Auth {
  static getAuth(): {
    eth: Account,
    eos: Account,
    tron: Account
  } {
    return {
      eth: Storage.get(ACCOUNT_CACHE_PREFIX + Platform.ETH),
      eos: Storage.get(ACCOUNT_CACHE_PREFIX + Platform.EOS),
      tron: Storage.get(ACCOUNT_CACHE_PREFIX + Platform.TRON)
    }
  }

  static login(acc: Account) {
    Storage.set(ACCOUNT_CACHE_PREFIX + acc.bc, acc);
  }

  static logout(bc: Platform) {
    Storage.remove(ACCOUNT_CACHE_PREFIX + bc);
  }
}