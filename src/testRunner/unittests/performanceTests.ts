import * as performance from '../../compiler/performance.js';

describe('Performance when enabled', () => {
  before(() => {
    performance.enable();
  });

  it('should be enabled', () => {
    expect(performance.isEnabled()).to.equal(true);
  });
  
  after(() => {
    performance.disable();
  });
});
