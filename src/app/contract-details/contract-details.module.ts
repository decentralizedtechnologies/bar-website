import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractDetailsRoutingModule } from './contract-details-routing.module';
import { AssetSeriesRegistryComponent } from './asset-series-registry/asset-series-registry.component';
import { AssetSeriesComponent } from './asset-series/asset-series.component';
import { AssetComponent } from './asset/asset.component';
import { AssetBarTagComponent } from './asset-bar-tag/asset-bar-tag.component';
import { SerialAssetComponent } from './serial-asset/serial-asset.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ContractDetailsRoutingModule,
    SharedModule,
  ],
  declarations: [
    AssetSeriesRegistryComponent,
    AssetSeriesComponent,
    AssetComponent,
    AssetBarTagComponent,
    SerialAssetComponent,
  ]
})
export class ContractDetailsModule { }
