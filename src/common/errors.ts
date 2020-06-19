// ERC721 error codes
export const ZERO_ADDRESS = "003001";
export const NOT_VALID_NFT = "003002";
export const NOT_OWNER_OR_OPERATOR = "003003";
export const NOT_OWNER_APPROWED_OR_OPERATOR = "003004";
export const NOT_ABLE_TO_RECEIVE_NFT = "003005";
export const NFT_ALREADY_EXISTS = "003006";
export const NOT_OWNER = "003007";
export const IS_OWNER = "003008";
export const EMPTY_SYMBOL = "003009";
export const EMPTY_NAME = "003010";
export const URI_TOO_LONG = "003011";
export const MINT_FEE_NOT_ENOUGH = "003012";
export const INVALID_INDEX = "005007";

export const ErrCodeLocale = {
  [ZERO_ADDRESS]: {
    en: 'zero address',
    zh: '非法的空地址'
  },
  [NOT_VALID_NFT]: {
    en: 'nft not exist',
    zh: 'NFT不存在'
  },
  [NOT_OWNER_OR_OPERATOR]: {
    en: 'no authority to operate with nft',
    zh: '没有操作NFT的权限'
  },
}
