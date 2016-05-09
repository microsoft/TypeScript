//// [objectSpreadElementNegative.ts]
let o = { a: 1, b: 'no' };
let swap = { a: 'yes', b: -1 };

// new field's type conflicts with existing field
let o2 = { ...o, a: 'wrong type?' }
let o3 = { a: 'wrong type?', ...o }
let o4 = { ...o, ...swap };

// expressions are not allowed
let o5 = { ...1 + 1 };
let o6 = { ...(1 + 1) };


//// [objectSpreadElementNegative.js]
var o = { a: 1, b: 'no' };
var swap = { a: 'yes', b: -1 };
// new field's type conflicts with existing field
var o2 = { , a: 'wrong type?' };
var o3 = { a: 'wrong type?',  };
var o4 = { ,  };
// expressions are not allowed
var o5 = {  };
var o6 = {  };
