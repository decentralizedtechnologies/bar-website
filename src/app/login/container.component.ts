import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssetSeriesContract } from '@contract/asset-series.contract';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class ContainerComponent {

  constructor(
    private router: Router
  ) { }

  onUnlockSuccess() {
    return this.router.navigate([`/contract/create/${AssetSeriesContract._type}`])
  }

}
