// @allowUnreachableCode: false
var xx: any;
var yy: any;

function fn() {
  let arr: any[] = [];
  switch(arr.length) {
    // Should error
    case 0, 1:
      return 'zero or one';
    default:
      return 'more than one';
  }
}

// Should error
let x = Math.pow((3, 5), 2);

// Should error
let a = [(3 + 4), ((1 + 1, 8) * 4)];

// Error cases
xx = (1, 2);
xx = ('', xx);
xx = (/323/, 5);
xx = (`wat`, 'ok'),
xx = (true, false);
xx = (false, true);
xx = (null, xx);
xx = (undefined, 10);
xx = (() => {}, 'no');
xx = (function() { }, 100);
xx = ({}, {});
xx = (typeof xx, 'unused');
xx = ([1, 2, x++], xx);
xx = (xx!, xx);
xx = (xx ? 3 : 4, 10);
xx = (3 + 4, 10);
xx = (!xx, 10);
xx = (~xx, 10);
xx = (-xx, 10);
xx = (+xx, 10);
xx = (0, xx)();

// OK cases
xx = (xx ? x++ : 4, 10);
xx = (--xx, 3);
xx = (xx = 3, 1);
xx = ((xx = 3), 5);
xx = (xx+= 4, xx);
xx = ((xx+= 4), xx);
xx = (Math.pow(3, 2), 4);
xx = (void xx, 10);
xx = (xx as any, 100);
xx = (0, xx.fn)();
xx = (0, xx['fn'])();
xx = (0, xx.fn)``;