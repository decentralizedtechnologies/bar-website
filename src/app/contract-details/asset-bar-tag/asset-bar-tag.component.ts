import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { ContractDeploymentFactory } from '@decentralizedtechnologies/scui-lib';
import { AssetContract } from '@contract/asset.contract';

const qrcode = require('qrcode-generator')

@Component({
  selector: 'app-asset-bar-tag',
  templateUrl: './asset-bar-tag.component.html',
  styleUrls: ['./asset-bar-tag.component.scss']
})
export class AssetBarTagComponent implements OnInit, AfterViewInit {

  QR: any

  deployer: any
  assetContract: AssetContract

  @Input() address: string

  @ViewChild('qrCode') set el(el: ElementRef) {
    this.QR = el
  }

  constructor(
    private contractFactory: ContractDeploymentFactory) {
    this.deployer = this.contractFactory.deployer
  }

  ngOnInit() {
    this.assetContract = this.deployer.assetContract
  }

  ngAfterViewInit() {
    const qr = qrcode(0, 'H')
    qr.addData(this.address)
    qr.make()
    this.QR.nativeElement.innerHTML = qr.createImgTag(6, 2)
  }

}
