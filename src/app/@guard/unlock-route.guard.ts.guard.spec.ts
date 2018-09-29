import { TestBed, async, inject } from '@angular/core/testing';

import { UnlockRouteGuard } from '@guard/unlock-route.guard';

describe('UnlockRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnlockRouteGuard]
    });
  });

  it('should ...', inject([UnlockRouteGuard], (guard: UnlockRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
