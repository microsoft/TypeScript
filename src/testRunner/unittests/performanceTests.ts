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

describe('Marks when enabled', () => {
  const markName = 'testMark';
  before(() => {
    performance.enable();
    performance.mark(markName);
  }); 

  it('should have a mark with count 1 by default', () => {
    expect(performance.getCount(markName)).to.equal(1);
  });

  after(() => {
    performance.clearMarks();
    performance.disable();
  });
});
