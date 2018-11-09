import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@service/settings.service';
import { WalletService } from '@decentralizedtechnologies/scui-lib';

@Component({
  selector: 'app-network-toggle',
  templateUrl: './network-toggle.component.html',
  styleUrls: ['./network-toggle.component.scss']
})
export class NetworkToggleComponent implements OnInit {

  currentNetwork = 0

  constructor(
    public settings: SettingsService,
    public walletService: WalletService
  ) { }

  ngOnInit() {
  }

  toggleNetwork() {
    this.currentNetwork = Number(!this.currentNetwork)
    this.settings.setNetwork(this.settings.networks[this.currentNetwork])
  }

}
