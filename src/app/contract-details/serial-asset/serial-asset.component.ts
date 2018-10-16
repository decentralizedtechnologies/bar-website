import { Component, OnInit } from '@angular/core';
import { WalletService } from '@decentralizedtechnologies/scui-lib';
import { ActivatedRoute } from '@angular/router';
import { SerialAssetContract } from '@contract/serial-asset.contract';
import { AssetSeriesContract } from '@contract/asset-series.contract';

@Component({
  selector: 'app-serial-asset',
  templateUrl: './serial-asset.component.html',
  styleUrls: ['./serial-asset.component.css']
})
export class SerialAssetComponent implements OnInit {

  assetSeriesContract: AssetSeriesContract
  serialAssetContract: SerialAssetContract
  serialAssetContractType = SerialAssetContract._type

  constructor(
    private wallet: WalletService,
    private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.parent.params.subscribe(({ contractAddress }) => {
      this.serialAssetContract = new SerialAssetContract(this.wallet.getInstance())
      this.assetSeriesContract = new AssetSeriesContract(this.wallet.getInstance())
      console.log(this.serialAssetContract)
      console.log(this.assetSeriesContract)
      this.serialAssetContract.connect()
      this.assetSeriesContract.connect()
      this.serialAssetContract.setWebsocketProvider()
      this.serialAssetContract.setAddress(contractAddress)
      this.serialAssetContract.setInstanceAddress()
      this.serialAssetContract.setWebsocketInstanceAddress()
      this.getSerialAssetContractData()
    })
  }

  async getSerialAssetContractData() {
    await this.serialAssetContract.getAssetSeriesAddress()
    this.serialAssetContract.getSerialNumber()
    this.serialAssetContract.getOwner()
    this.serialAssetContract.getPendingOwner()
    this.serialAssetContract.getDescription()

    this.getAssetSeriesContractData()
  }

  async getAssetSeriesContractData() {
    this.assetSeriesContract.setWebsocketProvider()
    this.assetSeriesContract.setAddress(this.serialAssetContract.assetSeriesAddress)
    this.assetSeriesContract.setInstanceAddress()
    this.assetSeriesContract.setWebsocketInstanceAddress()
    this.assetSeriesContract.getDescription()
  }
}
