import { ContractDetailsModule } from './contract-details.module';

describe('ContractDetailsModule', () => {
  let contractDetailsModule: ContractDetailsModule;

  beforeEach(() => {
    contractDetailsModule = new ContractDetailsModule();
  });

  it('should create an instance', () => {
    expect(contractDetailsModule).toBeTruthy();
  });
});
