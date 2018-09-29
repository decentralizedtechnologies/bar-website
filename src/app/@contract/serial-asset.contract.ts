import { Wallet } from '@decentralizedtechnologies/scui-lib';
import { AssetContract } from '@contract/asset.contract';

const SerializedAssetInterface = require('@abi/SerializedAsset.json')

export class SerialAssetContract extends AssetContract {

  static readonly _type: string = 'serial-asset'

  serialNumber: number
  assetSeriesAddress: string

  constructor(wallet: Wallet) {
    super(wallet)
    this.abi = SerializedAssetInterface.abi
    this.type = SerialAssetContract._type
  }

  async getSerialNumber() {
    this.serialNumber = await this.instance.methods.serialNumber().call()
  }

  async getAssetSeriesAddress() {
    this.assetSeriesAddress = await this.instance.methods.assetSeries().call()
  }
}
