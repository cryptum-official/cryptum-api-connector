export class TransactionResponse {
  hash: string;
}
export class BuildTransactionResponse {
  protocol: string;
  signedTx: string;
  type: TransactionType;
}

export class Transaction {}

export class UTXO {
  index: number;
  txHash: string;
  value: number;
  height?: number;
  address?: string;
}

export enum TransactionType {
  TRANSFER = 'TRANSFER',
  CALL_CONTRACT_METHOD = 'CALL_CONTRACT_METHOD',
  DEPLOY_CONTRACT = 'DEPLOY_CONTRACT',
  DEPLOY_ERC20 = 'DEPLOY_ERC20',
  DEPLOY_ERC721 = 'DEPLOY_ERC721',
  DEPLOY_ERC1155 = 'DEPLOY_ERC1155',
  CHANGE_TRUST = 'CHANGE_TRUST',
  HATHOR_TOKEN_CREATION = 'HATHOR_TOKEN_CREATION',
  HATHOR_TOKEN_MINT = 'HATHOR_TOKEN_MINT',
  HATHOR_TOKEN_MELT = 'HATHOR_TOKEN_MELT',
}

export enum TransactionHathorType {
  TRANSFER = 'TRANSFER',
  MINT = 'MINT',
  BURN = 'BURN',
  NFT_TRANSFER = 'NFT_TRANSFER',
  NFT_MINT = 'NFT_MINT',
  NFT_BURN = 'NFT_BURN',
  TOKEN_CREATION = 'TOKEN_CREATION',
  NFT_CREATION = 'NFT_CREATION',
  CALL_CONTRACT_METHOD = 'CALL_CONTRACT_METHOD',
  DEPLOY_CONTRACT = 'DEPLOY_CONTRACT',
  DEPLOY_ERC20 = 'DEPLOY_ERC20',
  DEPLOY_ERC721 = 'DEPLOY_ERC721',
  DEPLOY_ERC1155 = 'DEPLOY_ERC1155',
  CHANGE_TRUST = 'CHANGE_TRUST',
  HATHOR_TOKEN_CREATION = 'HATHOR_TOKEN_CREATION',
  HATHOR_TOKEN_MINT = 'HATHOR_TOKEN_MINT',
  HATHOR_TOKEN_MELT = 'HATHOR_TOKEN_MELT',
  HATHOR_NFT_MINT = 'HATHOR_NFT_MINT',
  HATHOR_NFT_MELT = 'HATHOR_NFT_MELT',
}

export enum EthTokenType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}
