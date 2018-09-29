import { Component, OnInit, Input } from '@angular/core';
import { ContractDeploymentFactory, WalletService, EthereumService, InsufficientFundsError } from '@decentralizedtechnologies/scui-lib';
import { Router } from '@angular/router';
import { AssetSeriesRegistryContract } from '@contract/asset-series-registry.contract';
import { AssetSeriesContract } from '@contract/asset-series.contract';

const Web3 = require('web3')

@Component({
  selector: 'app-asset-series',
  templateUrl: './asset-series.component.html',
  styleUrls: ['./asset-series.component.scss']
})
export class AssetSeriesComponent implements OnInit {

  deployer: any

  assetSeriesRegistryContract: AssetSeriesRegistryContract
  assetSeriesContract: AssetSeriesContract

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
    deployAssetSeries: {
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
    this.assetSeriesRegistryContract = this.deployer.assetSeriesRegistryContract
    this.deployer.connectAssetSeries()
    this.assetSeriesContract = this.deployer.assetSeriesContract

    this.stepCount = Object.keys(this.steps).length
    this.init()
    this.onNewAssetSeries()
  }

  onNewAssetSeries() {
    this.assetSeriesRegistryContract.websocketInstance
      .once('CreatedAssetSeries', {}, (error, event) => {
        if (error) {
          console.log(error)
        }
        console.log(event)
        const address = event.returnValues.assetSeries
        this.assetSeriesContract.setAddress(address)
        this.assetSeriesContract.setInstanceAddress()
        this.assetSeriesContract.setWebsocketInstanceAddress()
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
      return this.router.navigate([`/contract/${this.assetSeriesContract.address}/details/${this.assetSeriesContract.type}`])
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

  async deployAssetSeries() {
    this.steps.estimateTxCosts.isCurrent = false
    this.steps.deployAssetSeries.isCurrent = true
    this.steps.deployAssetSeries.hasError = false

    try {
      const receipt = await this.deployer.newAssetSeries()
      console.log(receipt)
      this.steps.deployAssetSeries.isComplete = true
    } catch (error) {
      console.log(error)
      this.steps.deployAssetSeries.hasError = true
      this.steps.deployAssetSeries.errorMessage = `There was a problem creating your Asset Series contract`
    }
  }

  async estimateTransactionCosts() {
    this.steps.estimateTxCosts.estimates.push({
      text: 'Asset Series deployment',
      txCost: '...'
    })
    const txCost = await this.deployer.estimateNewAssetSeriesDeploymentCost()
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
