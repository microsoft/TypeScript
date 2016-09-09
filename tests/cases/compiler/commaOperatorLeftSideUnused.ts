var xx: any;

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

// Should be OK
xx = x++, 2;
xx = x = 3, 2;

// Should error
xx = x = (3, 2);

// Error cases (object literals)
xx = ({ x: 3 }, 14);
xx = ({ y() { } }, 14);

// OK cases (object literals)
xx = ({ m: Math.pow(2, 3) }), 14;
xx = ({ ['foo'.substr(3)]: 5 }), 14;

// Error cases (array literals)
xx = ([1, 2], 4);
xx = ([], 4);
xx = ([[]], 4);
xx = ([{}], '');
xx = ([false, true, (xx, xx)], 4);

// OK cases (array literals)
xx = ([1, ''.substr(0)], '');
xx = ([new Date()], '');
xx = ([console.log], '');
