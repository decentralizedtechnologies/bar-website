import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { ContractCreateModule } from './contract-create/contract-create.module';
import { UnlockRouteGuard } from '@guard/unlock-route.guard';
import { ContractDeployModule } from './contract-deploy/contract-deploy.module';
import { ContractDetailsModule } from './contract-details/contract-details.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => LoginModule,
  },
  {
    path: 'contract/create',
    loadChildren: () => ContractCreateModule,
    canActivate: [UnlockRouteGuard],
  },
  {
    path: 'contract/deploy',
    loadChildren: () => ContractDeployModule,
    canActivate: [UnlockRouteGuard],
  },
  {
    path: 'contract/:contractAddress/details',
    loadChildren: () => ContractDetailsModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
