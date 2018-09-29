import { Component, OnInit } from '@angular/core';
import { ContractDeploymentFactory } from '@decentralizedtechnologies/scui-lib';
import { AssetSeriesRegistryDeployer } from '@deployer/asset-series-registry.deployer';
import { AssetSeriesRegistryContract } from '@contract/asset-series-registry.contract';
import { SerialAssetDeployer } from '@deployer/serial-asset.deployer';
import { SerialAssetContract } from '@contract/serial-asset.contract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blockchain-asset-registry';

  constructor(private factory: ContractDeploymentFactory) { }

  ngOnInit() {
    this.factory.registerContractDeployment(AssetSeriesRegistryContract._type, AssetSeriesRegistryDeployer)
    this.factory.registerContractDeployment(SerialAssetContract._type, SerialAssetDeployer)
  }
}
