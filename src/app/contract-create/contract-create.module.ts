import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContractCreateRoutingModule } from './contract-create-routing.module';
import { AssetSeriesComponent } from './asset-series/asset-series.component';
import { SerialAssetComponent } from './serial-asset/serial-asset.component';

@NgModule({
  imports: [
    CommonModule,
    ContractCreateRoutingModule,
    FormsModule
  ],
  declarations: [
    AssetSeriesComponent,
    SerialAssetComponent
  ]
})
export class ContractCreateModule { }
