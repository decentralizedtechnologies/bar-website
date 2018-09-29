import { Wallet } from '@decentralizedtechnologies/scui-lib';
import { Contract } from '@contract/contract';

const AssetSeriesInterface = require('@abi/AssetSeries.json')

export class AssetSeriesContract extends Contract {

  static readonly _type: string = 'asset-series'

  limit: number
  name: string
  description: string
  issuer: string
  serialNumber: number
  assetsCount: number
  assets: Array<any>

  constructor(wallet: Wallet) {
    super(wallet)
    this.abi = AssetSeriesInterface.abi
    this.type = AssetSeriesContract._type
  }

  connect() {
    const contract = new this.web3.eth.Contract(this.abi)
    this.instance = contract
    return this
  }

  async getLimit() {
    this.limit = await this.instance.methods.limit().call()
  }

  async getDescription() {
    this.description = await this.instance.methods.description().call()
  }

  async getIssuer() {
    this.issuer = await this.instance.methods.issuer().call()
  }

  async getSerialNumber() {
    this.serialNumber = await this.instance.methods.serialNumber().call()
  }

  async getAssetsCount() {
    this.assetsCount = await this.instance.methods.assetsCount().call()
  }

  async getAssetBySerialNumber(number: number) {
    const address = await this.instance.methods.assetsBySerialNumber(number).call()
    return address
  }
}
