import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { SCUILibModule, Network, Config } from '@decentralizedtechnologies/scui-lib';
import { HttpClientModule } from '@angular/common/http';
import { ContractCreateModule } from './contract-create/contract-create.module';
import { ContractDeployModule } from './contract-deploy/contract-deploy.module';
import { ContractDetailsModule } from './contract-details/contract-details.module';

import merge from 'deepmerge';
const config = merge(Config, {
  network: Network.testnet
})

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SCUILibModule,
    LoginModule,
    ContractCreateModule,
    ContractDeployModule,
    ContractDetailsModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: 'config',
    useValue: config
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
