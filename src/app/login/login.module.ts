import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { LoginModule as SCUILoginModule } from '@decentralizedtechnologies/scui-lib';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SCUILoginModule,
    LoginRoutingModule
  ],
  declarations: [ContainerComponent]
})
export class LoginModule { }
