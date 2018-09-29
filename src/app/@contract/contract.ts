import { Wallet } from '@decentralizedtechnologies/scui-lib';

const Web3 = require('web3')

export class Contract {

  type: string

  wallet: Wallet
  web3: any
  websocketInstance: any
  instance: any
  address: string
  abi: any
  tx: string

  constructor(wallet: Wallet) {
    this.wallet = wallet
    this.web3 = wallet.web3
  }

  setAddress(address: string) {
    this.address = address
    return this
  }

  setInstanceAddress(_address?: string) {
    const address = _address || this.address
    this.instance.options.address = address
    this.instance._address = address
    return this
  }

  setWebsocketProvider() {
    const provider = new Web3.providers.WebsocketProvider('ws://localhost:7545')
    const web3 = new Web3(provider)
    this.websocketInstance = new web3.eth.Contract(this.abi)
    return this
  }

  setWebsocketInstanceAddress(_address?: string) {
    const address = _address || this.address
    this.websocketInstance.options.address = this.address
    this.websocketInstance._address = this.address
    return this
  }
}
