import { Wallet } from '@decentralizedtechnologies/scui-lib';
import { Contract } from '@contract/contract';

const AssetSeriesRegistryInterface = require('@abi/AssetSeriesRegistry.json')

export class AssetSeriesRegistryContract extends Contract {

  static readonly JSON_RPC_ADDRESS: string = '0xb1864df1388b7bc728d6ac4158095998eee2e9f5'

  static readonly _type: string = 'asset-series-registry'

  limit: number
  name: string
  description: string

  constructor(wallet: Wallet) {
    super(wallet)
    this.abi = AssetSeriesRegistryInterface.abi
    this.type = AssetSeriesRegistryContract._type
  }

  connect() {
    const contract = new this.web3.eth.Contract(this.abi)
    this.instance = contract
    return this
  }

  onNewAssetSeries() {
    return this.websocketInstance.eth.subscribe('logs', {
      address: this.address,
    })
  }
}
