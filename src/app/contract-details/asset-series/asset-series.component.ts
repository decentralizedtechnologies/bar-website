import { Component, OnInit, Input } from '@angular/core';
import { WalletService } from '@decentralizedtechnologies/scui-lib';
import { AssetSeriesContract } from '@contract/asset-series.contract';
import { SerialAssetContract } from '@contract/serial-asset.contract';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-series',
  templateUrl: './asset-series.component.html',
  styleUrls: ['./asset-series.component.scss']
})
export class AssetSeriesComponent implements OnInit {

  assetSeriesContract: AssetSeriesContract
  serialAssetContractType = SerialAssetContract._type
  serialAssets: Array<SerialAssetContract> = []

  constructor(
    private wallet: WalletService,
    private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.parent.params.subscribe(({ contractAddress }) => {
      this.assetSeriesContract = new AssetSeriesContract(this.wallet.getInstance())
      this.assetSeriesContract.connect()
      this.assetSeriesContract.setWebsocketProvider()
      this.assetSeriesContract.setAddress(contractAddress)
      this.assetSeriesContract.setInstanceAddress()
      this.assetSeriesContract.setWebsocketInstanceAddress()
      console.log(this.assetSeriesContract)
      this.getAssetSeriesContractData()
    })
  }

  async getAssetSeriesContractData() {
    this.assetSeriesContract.getLimit()
    this.assetSeriesContract.getDescription()
    this.assetSeriesContract.getIssuer()
    this.assetSeriesContract.getSerialNumber()

    await this.assetSeriesContract.getAssetsCount()
    if (this.assetSeriesContract.assetsCount > 0) {
      this.getSerialAssetBySerialNumber(1)
    }
  }

  async getSerialAssetBySerialNumber(number: number) {
    if (number > Number(this.assetSeriesContract.assetsCount)) {
      return
    }
    try {
      const serialAssetContract = new SerialAssetContract(this.wallet.getInstance())
      serialAssetContract.connect()
      const serialAssetAddress = await this.assetSeriesContract.getAssetBySerialNumber(number)
      serialAssetContract.setAddress(serialAssetAddress)
      serialAssetContract.setInstanceAddress()
      await serialAssetContract.getSerialNumber()
      serialAssetContract.getDescription()
      this.serialAssets.push(serialAssetContract)
      this.getSerialAssetBySerialNumber(Number(serialAssetContract.serialNumber) + 1)
    } catch (error) {
      console.log(error)
    }
  }
}
