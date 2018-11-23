import { Injectable } from '@angular/core';
import { WalletService, Network, EthereumService } from '@decentralizedtechnologies/scui-lib';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  onNetworkChange: Subject<any> = new Subject<any>()

  networks: Array<string> = [
    Network.testnet,
    Network.mainnet,
  ]

  constructor(
    private walletService: WalletService,
    private ethService: EthereumService) { }

  setNetwork(network: string = Network.mainnet) {
    this.walletService.setNetwork(network)
    this.walletService.setProviderByNetwork()
    this.ethService.setEtherScanURLByNetwork()
    if (this.walletService.isUnlocked()) {
      this.walletService.getAccountBalance()
    }
    this.onNetworkChange.next(true)
  }
}
