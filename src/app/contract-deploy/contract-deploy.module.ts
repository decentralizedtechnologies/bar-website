import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractDeployRoutingModule } from './contract-deploy-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule as SCUISharedModule } from '@decentralizedtechnologies/scui-lib';
import { AssetComponent } from './asset/asset.component';
import { AssetSeriesComponent } from './asset-series/asset-series.component';
import { SerialAssetComponent } from './serial-asset/serial-asset.component';

@NgModule({
  imports: [
    CommonModule,
    ContractDeployRoutingModule,
    FormsModule,
    SCUISharedModule
  ],
  declarations: [
    AssetComponent,
    AssetSeriesComponent,
    SerialAssetComponent
  ]
})
export class ContractDeployModule { }
