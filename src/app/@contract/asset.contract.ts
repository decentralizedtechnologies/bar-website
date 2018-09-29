import { Wallet } from '@decentralizedtechnologies/scui-lib';
import { Contract } from '@contract/contract';

const AssetInterface = require('@abi/Asset.json')

export class AssetContract extends Contract {

  static readonly _type: string = 'asset'

  owner: string
  pendingOwner: string
  description: string

  constructor(wallet: Wallet) {
    super(wallet)
    this.abi = AssetInterface.abi
    this.type = AssetContract._type
  }

  connect() {
    const contract = new this.web3.eth.Contract(this.abi)
    this.instance = contract
    return this
  }

  async getOwner() {
    this.owner = await this.instance.methods.owner().call()
  }

  async getPendingOwner() {
    this.pendingOwner = await this.instance.methods.pendingOwner().call()
  }

  async getDescription() {
    this.description = await this.instance.methods.description().call()
  }
}
