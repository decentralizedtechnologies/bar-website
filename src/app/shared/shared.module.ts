import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NetworkToggleComponent } from './network-toggle/network-toggle.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FooterComponent, NetworkToggleComponent],
  exports: [FooterComponent, NetworkToggleComponent]
})
export class SharedModule { }
