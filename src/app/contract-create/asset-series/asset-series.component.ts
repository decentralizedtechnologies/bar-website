import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContractDeploymentFactory } from '@decentralizedtechnologies/scui-lib';
import { AssetSeriesContract } from '@contract/asset-series.contract';
import { AssetSeriesRegistryContract } from '@contract/asset-series-registry.contract';

@Component({
  selector: 'app-asset-series',
  templateUrl: './asset-series.component.html',
  styleUrls: ['./asset-series.component.scss']
})
export class AssetSeriesComponent implements OnInit {

  deployer: any

  @Input() assetSeriesRegistryContract: AssetSeriesRegistryContract

  isInvalid = false
  errorMessage: string

  constructor(
    private contractFactory: ContractDeploymentFactory,
    private router: Router) { }

  ngOnInit() {
    this.deployer = this.contractFactory.init(AssetSeriesRegistryContract._type)
    this.deployer.connectAssetSeriesRegistry()
    this.assetSeriesRegistryContract = this.deployer.assetSeriesRegistryContract
  }

  async onCreateNewAssetSeries() {
    if (isNaN(Number(this.assetSeriesRegistryContract.limit)) || this.assetSeriesRegistryContract.limit <= 0) {
      this.isInvalid = true
      this.errorMessage = 'Limit must be an integer number greater than 0'
      return false
    }

    return this.router.navigate([`/contract/deploy/${AssetSeriesContract._type}`])
  }
}
