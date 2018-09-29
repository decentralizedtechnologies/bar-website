import { Wallet, EthereumService, ContractDeployment } from '@decentralizedtechnologies/scui-lib';
import { AssetSeriesContract } from '@contract/asset-series.contract';
import { SerialAssetContract } from '@contract/serial-asset.contract';

const Web3 = require('web3')

export class SerialAssetDeployer extends ContractDeployment {

  type: string

  assetSeriesContract: AssetSeriesContract
  serialAssetContract: SerialAssetContract

  constructor(wallet: Wallet, eth: EthereumService) {
    super(wallet, eth)
    this.type = SerialAssetContract._type
  }

  connectAssetSeriesContract() {
    this.assetSeriesContract = new AssetSeriesContract(this.wallet)
    this.assetSeriesContract.connect()
    this.assetSeriesContract.setWebsocketProvider()
    console.log(this.assetSeriesContract)
    return this
  }

  connectSerialAssetContract() {
    this.serialAssetContract = new SerialAssetContract(this.wallet)
    this.serialAssetContract.connect()
    this.serialAssetContract.setWebsocketProvider()
    console.log(this.serialAssetContract)
    return this
  }

  async estimateNewSerialAssetDeploymentCost() {
    const contract = this.assetSeriesContract
    console.log(contract)
    try {
      const txObject = await contract.instance.methods.newAsset(this.serialAssetContract.description)
      console.log(txObject)
      const gas = await txObject.estimateGas({
        from: this.wallet.address,
        to: contract.address
      })
      this.gas += gas + this.gasIncrement
      const txCost = await this.eth.getTxCost(gas)
      this.txCost = txCost
      return txCost
    } catch (error) {
      console.log(error)
    }
  }

  async newSerialAsset() {
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.assetSeriesContract
        const txObject = await contract.instance.methods.newAsset(this.serialAssetContract.description)
        const nonce = await this.eth.getNonce(contract)
        const txOptions = {
          from: this.wallet.address,
          to: contract.address,
          value: '0x0',
          gas: Web3.utils.toHex(this.gas),
          gasLimit: Web3.utils.toHex(this.gas),
          gasPrice: Web3.utils.toHex(this.eth.defaultGasPrice),
          data: txObject.encodeABI(),
          nonce: Web3.utils.toHex(nonce)
        }
        const signedTx = await contract.web3.eth.accounts.signTransaction(txOptions, this.wallet.privateKey)
        const tx = contract.web3.eth.sendSignedTransaction(signedTx.rawTransaction)

        tx.on('transactionHash', hash => {
          contract.tx = hash
        })
        tx.on('error', error => {
          reject(error)
        })
        tx.on('receipt', async receipt => {
          resolve(receipt)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
