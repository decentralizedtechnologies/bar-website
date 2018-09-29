import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { SCUILibModule, Network } from '@decentralizedtechnologies/scui-lib';
import { HttpClientModule } from '@angular/common/http';
import { ContractCreateModule } from './contract-create/contract-create.module';
import { ContractDeployModule } from './contract-deploy/contract-deploy.module';
import { ContractDetailsModule } from './contract-details/contract-details.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    SCUILibModule.forRoot({
      network: Network.private
    }),
    ContractCreateModule,
    ContractDeployModule,
    ContractDetailsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
