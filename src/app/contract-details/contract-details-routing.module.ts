import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetSeriesContract } from '@contract/asset-series.contract';
import { AssetSeriesComponent } from './asset-series/asset-series.component';
import { SerialAssetContract } from '@contract/serial-asset.contract';
import { SerialAssetComponent } from './serial-asset/serial-asset.component';

const routes: Routes = [
  {
    path: `${AssetSeriesContract._type}`,
    component: AssetSeriesComponent
  },
  {
    path: `${SerialAssetContract._type}`,
    component: SerialAssetComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractDetailsRoutingModule { }
