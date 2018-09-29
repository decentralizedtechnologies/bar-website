import { Wallet, EthereumService, ContractDeployment } from '@decentralizedtechnologies/scui-lib';
import { AssetSeriesRegistryContract } from '@contract/asset-series-registry.contract';
import { AssetSeriesContract } from '@contract/asset-series.contract';
import { AssetContract } from '@contract/asset.contract';
import { SerialAssetContract } from '@contract/serial-asset.contract';

const Web3 = require('web3')

export class AssetSeriesRegistryDeployer extends ContractDeployment {

  type: string

  assetSeriesRegistryContract: AssetSeriesRegistryContract
  assetSeriesContract: AssetSeriesContract
  assetContract: AssetContract
  serializedAssetContract: SerialAssetContract

  constructor(wallet: Wallet, eth: EthereumService) {
    super(wallet, eth)
    this.type = AssetSeriesRegistryContract._type
  }

  connectAssetSeriesRegistry() {
    this.assetSeriesRegistryContract = new AssetSeriesRegistryContract(this.wallet)
    this.assetSeriesRegistryContract.connect()
    this.assetSeriesRegistryContract.setWebsocketProvider()
    this.assetSeriesRegistryContract.setAddress(AssetSeriesRegistryContract.JSON_RPC_ADDRESS)
    this.assetSeriesRegistryContract.setInstanceAddress()
    this.assetSeriesRegistryContract.setWebsocketInstanceAddress()
    console.log(this.assetSeriesRegistryContract)
    return this
  }

  connectAssetSeries() {
    this.assetSeriesContract = new AssetSeriesContract(this.wallet)
    this.assetSeriesContract.connect()
    this.assetSeriesContract.setWebsocketProvider()
    console.log(this.assetSeriesContract)
    return this
  }

  connectAsset() {
    this.assetContract = new AssetContract(this.wallet)
    this.assetContract.connect()
    this.assetContract.setWebsocketProvider()
    console.log(this.assetContract)
    return this
  }

  connectSerializedAsset() {
    this.serializedAssetContract = new SerialAssetContract(this.wallet)
    this.serializedAssetContract.connect()
    this.serializedAssetContract.setWebsocketProvider()
    console.log(this.serializedAssetContract)
    return this
  }

  async estimateNewAssetSeriesDeploymentCost() {
    const contract = this.assetSeriesRegistryContract
    const txObject = await contract.instance.methods.newAssetSeries(contract.limit, contract.description)
    const gas = await txObject.estimateGas()
    this.gas += gas + this.gasIncrement
    const txCost = await this.eth.getTxCost(gas)
    this.txCost = txCost
    return txCost
  }

  async estimateNewAssetDeploymentCost() {
    const contract = this.assetSeriesContract
    console.log(contract)
    try {
      const txObject = await contract.instance.methods.newAsset()
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

  async newAssetSeries() {
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.assetSeriesRegistryContract
        const txObject = await contract.instance.methods.newAssetSeries(contract.limit, contract.description)
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

  async newAsset() {
    return new Promise(async (resolve, reject) => {
      try {
        const contract = this.assetSeriesContract
        const txObject = await contract.instance.methods.newAsset()
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
