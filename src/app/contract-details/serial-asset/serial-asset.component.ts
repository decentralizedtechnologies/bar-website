import { Component, OnInit } from '@angular/core';
import { WalletService, Wallet, EthereumService } from '@decentralizedtechnologies/scui-lib';
import { ActivatedRoute } from '@angular/router';
import { SerialAssetContract } from '@contract/serial-asset.contract';
import { AssetSeriesContract } from '@contract/asset-series.contract';
import { HttpClient } from '@angular/common/http';
import { SerialAsset } from '@model/serial-asset';
import { SettingsService } from '@service/settings.service';

@Component({
  selector: 'app-serial-asset',
  templateUrl: './serial-asset.component.html',
  styleUrls: ['./serial-asset.component.scss']
})
export class SerialAssetComponent implements OnInit {

  assetSeriesContract: AssetSeriesContract
  serialAssetContract: SerialAssetContract
  serialAssetContractType = SerialAssetContract._type

  serialAsset: SerialAsset

  constructor(
    private walletService: WalletService,
    public ethService: EthereumService,
    private http: HttpClient,
    private settings: SettingsService,
    private router: ActivatedRoute) {
    this.walletService.setEmptyWallet()
    this.settings.onNetworkChange.subscribe((networkChanged) => {
      this.ngOnInit()
    })
  }

  ngOnInit() {
    const wallet: Wallet = this.walletService.getInstance()
    this.router.parent.params.subscribe(({ contractAddress }) => {
      this.serialAssetContract = new SerialAssetContract(wallet)
      this.assetSeriesContract = new AssetSeriesContract(wallet)
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
    this.getAssetSeriesContractData()
    this.getAssetDescription()
  }

  async getAssetSeriesContractData() {
    this.assetSeriesContract.setWebsocketProvider()
    this.assetSeriesContract.setAddress(this.serialAssetContract.assetSeriesAddress)
    this.assetSeriesContract.setInstanceAddress()
    this.assetSeriesContract.setWebsocketInstanceAddress()
    this.assetSeriesContract.getDescription()
  }

  async getAssetDescription() {
    await this.serialAssetContract.getDescription()
    const hash = this.serialAssetContract.description

    this.http.get(`https://ipfs.infura.io/ipfs/${hash}`)
      .toPromise()
      .then((res: any) => {
        this.serialAsset = new SerialAsset(res.data)
      })
  }
}
