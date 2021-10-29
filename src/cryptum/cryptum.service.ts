import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptumSdk from 'cryptum-sdk';
import { Block, GetBlockDto } from '../block/dto/get-block.dto';
import { Prices } from '../prices/dto/get-prices.dto';
import { GetTransactionByHashDto } from '../transaction/dto/get-transaction.dto';
import { GetUtxosDto } from '../transaction/dto/get-utxo.dto';
import { SendTransactionDto } from '../transaction/dto/send-transaction.dto';
import { Transaction, TransactionResponse, UTXO } from '../transaction/dto/transaction.dto';
import { GetWalletInfoDto } from '../wallet/dto/get-wallet-info.dto';
import { WalletInfo } from '../wallet/dto/wallet-info.dto';
import { Wallet } from '../wallet/dto/wallet.dto';
import { GenerateWalletDto } from '../wallet/dto/generate-wallet.dto';
import {
  CreateBitcoinTransferTransactionDto,
  CreateCeloTransferTransactionDto,
  CreateEthereumTransferTransactionDto,
  CreateHathorTransferTransactionDto,
  CreateRippleTransferTransactionDto,
  CreateStellarTransferTransactionDto,
  CreateTrustlineTransactionDto,
} from '../transaction/dto/create-transaction.dto';
import { Protocol, TrustlineProtocol } from './interfaces/protocols.interface';

@Injectable()
export class CryptumService {
  private sdk: CryptumSdk;

  constructor(private configService: ConfigService) {
    this.sdk = new CryptumSdk(this.configService.get<any>('cryptumConfig'));
  }
  generateRandomMnemonic(strength?: number): string {
    return this.sdk.getWalletController().generateRandomMnemonic(strength);
  }
  async generateWallet(input: GenerateWalletDto): Promise<Wallet> {
    return this.sdk.getWalletController().generateWallet(input);
  }
  async getWalletInfo(input: GetWalletInfoDto): Promise<WalletInfo> {
    return this.sdk.getWalletController().getWalletInfo(input);
  }
  async getTransactionByHash(input: GetTransactionByHashDto): Promise<Transaction> {
    return this.sdk.getTransactionController().getTransactionByHash(input);
  }
  async getUtxos(input: GetUtxosDto): Promise<UTXO[]> {
    return this.sdk.getTransactionController().getUTXOs(input);
  }
  async getBlock(input: GetBlockDto): Promise<Block> {
    return this.sdk.getTransactionController().getBlock(input);
  }
  async sendTransaction(input: SendTransactionDto): Promise<TransactionResponse> {
    return this.sdk.getTransactionController().sendTransaction(input);
  }
  async getPrices(asset: string): Promise<Prices> {
    return this.sdk.getPricesController().getPrices(asset);
  }
  async createTrustlineTransaction(input: CreateTrustlineTransactionDto) {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { protocol, privateKey, assetSymbol, issuer, limit, memo, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol,
      privateKey,
    });
    const transaction = {
      wallet,
      assetSymbol,
      issuer,
      limit,
      memo,
      fee,
    };
    switch (protocol) {
      case TrustlineProtocol.STELLAR:
        return txController.createStellarTrustlineTransaction(transaction);
      case TrustlineProtocol.RIPPLE:
        return txController.createRippleTrustlineTransaction(transaction);
      default:
        throw new BadRequestException('Unsupported protocol');
    }
  }
  async createStellarTransferTransaction(input: CreateStellarTransferTransactionDto) {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, issuer, assetSymbol, amount, destination, memo, createAccount, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.STELLAR,
      privateKey,
    });
    return txController.createStellarTransferTransaction({
      wallet,
      assetSymbol,
      issuer,
      amount,
      destination,
      createAccount,
      memo,
      fee,
    });
  }
  async createRippleTransferTransaction(input: CreateRippleTransferTransactionDto) {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, issuer, assetSymbol, amount, destination, memo, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.RIPPLE,
      privateKey,
    });
    return txController.createRippleTransferTransaction({
      wallet,
      assetSymbol,
      issuer,
      amount,
      destination,
      memo,
      fee,
    });
  }
  async createCeloTransferTransaction(input: CreateCeloTransferTransactionDto) {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, feeCurrency, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.CELO,
      privateKey,
    });
    return txController.createCeloTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      feeCurrency,
      fee,
    });
  }
  async createEthereumTransferTransaction(input: CreateEthereumTransferTransactionDto) {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.ETHEREUM,
      privateKey,
    });
    return txController.createEthereumTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    });
  }
  async createBscTransferTransaction(input: CreateEthereumTransferTransactionDto) {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, tokenSymbol, contractAddress, amount, destination, fee } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.BSC,
      privateKey,
    });
    return txController.createBscTransferTransaction({
      wallet,
      tokenSymbol,
      contractAddress,
      amount,
      destination,
      fee,
    });
  }
  async createBitcoinTransferTransaction(input: CreateBitcoinTransferTransactionDto) {
    const txController = this.sdk.getTransactionController();
    const walletController = this.sdk.getWalletController();
    const { privateKey, inputs, outputs } = input;
    const wallet = await walletController.generateWalletFromPrivateKey({
      protocol: Protocol.BITCOIN,
      privateKey,
    });
    return txController.createBitcoinTransferTransaction({
      wallet,
      inputs,
      outputs,
    });
  }
  async createHathorTransferTransaction(input: CreateHathorTransferTransactionDto) {
    const txController = this.sdk.getTransactionController();
    const { privateKey, inputs, outputs } = input;

    if (privateKey) {
      const walletController = this.sdk.getWalletController();
      const wallet = await walletController.generateWalletFromPrivateKey({
        protocol: Protocol.HATHOR,
        privateKey,
      });
      return txController.createHathorTransferTransactionFromWallet({
        wallet,
        outputs,
      });
    } else if (inputs) {
      return txController.createHathorTransferTransactionFromUTXO({
        inputs,
        outputs,
      });
    } else {
      throw new BadRequestException('Missing private key or inputs');
    }
  }
}
