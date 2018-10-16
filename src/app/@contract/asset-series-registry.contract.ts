import { Wallet } from '@decentralizedtechnologies/scui-lib';
import { Contract } from '@contract/contract';

const AssetSeriesRegistryInterface = require('@abi/AssetSeriesRegistry.json')

export class AssetSeriesRegistryContract extends Contract {

  static readonly JSON_RPC_ADDRESS: string = '0xbc70a894b7f4f5b751f4be7020f07660e03ff5e1'

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
