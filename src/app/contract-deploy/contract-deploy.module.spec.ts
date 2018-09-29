import { ContractDeployModule } from './contract-deploy.module';

describe('ContractDeployModule', () => {
  let contractDeployModule: ContractDeployModule;

  beforeEach(() => {
    contractDeployModule = new ContractDeployModule();
  });

  it('should create an instance', () => {
    expect(contractDeployModule).toBeTruthy();
  });
});
