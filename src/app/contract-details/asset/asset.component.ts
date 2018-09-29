import { Component, OnInit, Input } from '@angular/core';
import { ContractDeploymentFactory } from '@decentralizedtechnologies/scui-lib';
import { AssetContract } from '@contract/asset.contract';
import { AssetSeriesContract } from '@contract/asset-series.contract';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

  deployer: any
  assetContract: AssetContract
  assetSeriesContract: AssetSeriesContract

  @Input() address: string

  constructor(
    private contractFactory: ContractDeploymentFactory) {
    this.deployer = this.contractFactory.deployer
  }

  ngOnInit() {
    this.assetContract = this.deployer.assetContract
    this.assetSeriesContract = this.deployer.assetSeriesContract
    console.log(this.assetContract)
    console.log(this.assetSeriesContract)
    this.assetContract.setAddress(this.address)
    this.assetContract.setInstanceAddress()
    this.assetContract.setWebsocketInstanceAddress()
    this.getAssetContractData()
    this.getAssetSeriesData()
  }

  async getAssetContractData() {
    this.assetContract.getOwner()
    this.assetContract.getPendingOwner()
  }

  async getAssetSeriesData() {
    this.assetSeriesContract.getDescription()
  }
}
