import { ContractCreateModule } from './contract-create.module';

describe('ContractCreateModule', () => {
  let contractCreateModule: ContractCreateModule;

  beforeEach(() => {
    contractCreateModule = new ContractCreateModule();
  });

  it('should create an instance', () => {
    expect(contractCreateModule).toBeTruthy();
  });
});
