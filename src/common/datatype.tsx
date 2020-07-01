export interface MetaDataJson {
  name: string;
  description: string;
  image: string;
  properties?: any;
  attributes?: Array<{
    display_type?: string;
    trait_type: string;
    value: string | number;
  }>;
}

export interface Token extends MetaDataJson {
  id: number | string;
}


export enum OpenseaDisplayType {
  NONE = 'empty',
  BoostPercenage = 'boost_percentage',
  BoostNumber = 'boost_number',
  Date = 'date'
}

export enum ERCStandard {
  erc721 = 'ERC721',
  erc1155 = 'ERC1155'
}

export enum EOSStandard {
  oasis = 'THE-OASIS'
}

export enum TRONStandard {
  trc721 = 'TRC721'
}

export enum EthTxStatus {
  IDLE,
  transactionHash,
  receipt,
  confirmation,
  error
}

export type NFTStandard = ERCStandard;