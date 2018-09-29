import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractDeploymentFactory } from '@decentralizedtechnologies/scui-lib';
import { AssetSeriesContract } from '@contract/asset-series.contract';
import { SerialAssetContract } from '@contract/serial-asset.contract';

@Component({
  selector: 'app-serial-asset',
  templateUrl: './serial-asset.component.html',
  styleUrls: ['./serial-asset.component.scss']
})
export class SerialAssetComponent implements OnInit {

  deployer: any

  assetSeriesContract: AssetSeriesContract
  @Input() serialAssetContract: SerialAssetContract

  isInvalid = false
  errorMessage: string

  constructor(
    private contractFactory: ContractDeploymentFactory,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.deployer = this.contractFactory.init(SerialAssetContract._type)
      this.deployer.connectSerialAssetContract()
      this.serialAssetContract = this.deployer.serialAssetContract
      this.deployer.connectAssetSeriesContract()
      this.assetSeriesContract = this.deployer.assetSeriesContract

      const assetSeriesAddress = params.assetSeriesAddress
      if (assetSeriesAddress) {
        this.assetSeriesContract.setAddress(assetSeriesAddress)
        this.assetSeriesContract.setInstanceAddress()
        this.assetSeriesContract.setWebsocketInstanceAddress()
      }
    })
  }

  async onCreateNewSerialAsset() {
    return this.router.navigate([`/contract/deploy/${SerialAssetContract._type}`])
  }
}
