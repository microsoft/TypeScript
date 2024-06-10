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

describe('Clearing mark with defined name', () => {
  const markName = 'testMark';
  before(() => {
    performance.enable();
    performance.mark(markName);
    performance.clearMarks(markName);
  }); 

  it('should have the mark with the val 0', () => {
    expect(performance.getCount(markName)).to.equal(0);
  });

  after(() => {
    performance.disable();
  });
});

describe('Clearing mark with defined name', () => {
  const markName = 'testMark';
  const marks: string[] = [];
  const testFunc: (innerMarkName: string) => void = (innerMarkName) => {
    marks.push(innerMarkName);
};

  before(() => {
    performance.enable();
    performance.mark(markName);
    performance.forEachMark(testFunc);
  }); 

  it('should contain testMark in marks', () => {
    expect(marks).to.include(markName);
  });

  after(() => {
    performance.disable();
    performance.clearMarks();
  });
});