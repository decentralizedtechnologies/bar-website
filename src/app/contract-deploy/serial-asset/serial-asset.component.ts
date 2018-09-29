import { Component, OnInit, Input } from '@angular/core';
import { WalletService, ContractDeploymentFactory, EthereumService, InsufficientFundsError } from '@decentralizedtechnologies/scui-lib';
import { Router } from '@angular/router';
import { AssetSeriesContract } from '@contract/asset-series.contract';
import { SerialAssetContract } from '@contract/serial-asset.contract';

const Web3 = require('web3')

@Component({
  selector: 'app-serial-asset',
  templateUrl: './serial-asset.component.html',
  styleUrls: ['./serial-asset.component.scss']
})
export class SerialAssetComponent implements OnInit {

  deployer: any

  assetSeriesContract: AssetSeriesContract
  serialAssetContract: SerialAssetContract

  stepCount = 0

  supply: string

  steps: any = {
    estimateTxCosts: {
      step: 1,
      isCurrent: true,
      isComplete: false,
      hasError: false,
      estimates: []
    },
    deploySerialAsset: {
      step: 2,
      isCurrent: false,
      isComplete: false,
      hasError: false,
      errorMessage: '',
    },
  }

  @Input() gasPrice: number

  constructor(
    private contractFactory: ContractDeploymentFactory,
    public wallet: WalletService,
    public eth: EthereumService,
    private router: Router) {
    this.deployer = this.contractFactory.deployer
    this.gasPrice = Web3.utils.fromWei(eth.defaultGasPrice.toString(), 'gwei')
  }

  ngOnInit() {
    this.assetSeriesContract = this.deployer.assetSeriesContract
    this.serialAssetContract = this.deployer.serialAssetContract

    this.stepCount = Object.keys(this.steps).length
    this.init()
    this.onNewAsset()
  }

  onNewAsset() {
    this.assetSeriesContract.websocketInstance
      .once('CreatedAsset', {}, (error, event) => {
        if (error) {
          console.log(error)
        }
        console.log(event)
        const address = event.returnValues.asset
        this.serialAssetContract.setAddress(address)
        this.serialAssetContract.setInstanceAddress()
        this.serialAssetContract.setWebsocketInstanceAddress()
      })
  }

  updateGasPrice() {
    this.deployer.gas = 0
    this.eth.updateGasPrice(this.gasPrice)
    this.init()
  }

  reset() {
    Object.keys(this.steps).forEach(key => {
      const step = this.steps[key]
      step.isCurrent = false
      step.isComplete = false
      step.hasError = false
    })

    this.steps.estimateTxCosts.isCurrent = true
    this.steps.estimateTxCosts.estimates = []
  }

  finish() {
    try {
      return this.router.navigate([`/contract/${this.serialAssetContract.address}/details/${this.serialAssetContract.type}`])
    } catch (error) {
      console.log(error)
    }
  }

  async init() {
    this.reset()

    try {
      await this.wallet.getAccountBalance()
      await this.estimateTransactionCosts()
    } catch (error) {
      if (error instanceof InsufficientFundsError) {
        this.steps.estimateTxCosts.hasError = true
      }
    }
  }

  async deploySerialAsset() {
    this.steps.estimateTxCosts.isCurrent = false
    this.steps.deploySerialAsset.isCurrent = true
    this.steps.deploySerialAsset.hasError = false

    try {
      const receipt = await this.deployer.newSerialAsset()
      console.log(receipt)
      this.steps.deploySerialAsset.isComplete = true
    } catch (error) {
      console.log(error)
      this.steps.deploySerialAsset.hasError = true
      this.steps.deploySerialAsset.errorMessage = `There was a problem creating your Asset Series contract`
    }
  }

  async estimateTransactionCosts() {
    this.steps.estimateTxCosts.estimates.push({
      text: 'Serial Asset deployment',
      txCost: '...'
    })
    const txCost = await this.deployer.estimateNewSerialAssetDeploymentCost()
    this.steps.estimateTxCosts.estimates[0].txCost = txCost.ETH
    this.steps.estimateTxCosts.estimates.push({
      text: 'TOTAL',
      txCost: this.deployer.txCost.ETH
    })
    const wei = this.deployer.txCost.WEI
    const hasInsufficientFunds = wei.gt(this.wallet.balance)
    if (hasInsufficientFunds) {
      throw new InsufficientFundsError(InsufficientFundsError.MESSAGE)
    }
    this.steps.estimateTxCosts.isComplete = true
  }
}
