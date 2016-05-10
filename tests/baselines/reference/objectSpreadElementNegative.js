//// [objectSpreadElementNegative.ts]
let o = { a: 1, b: 'no' };
let swap = { a: 'yes', b: -1 };

// new field's type conflicts with existing field
let o2 = { ...o, a: 'wrong type?' }
let o3 = { a: 'wrong type?', ...o }
let o4 = { ...o, ...swap };
let combinedNested = {
    ...{ a: 1, ...{ b: false, c: 'overriden' } },
    c: -1 // error, number not assignable to string
}
// expressions are not allowed
let o5 = { ...1 + 1 };
let o6 = { ...(1 + 1) };

// repeats are not allowed
let duplicated = { b: 'bad', ...o, b: 'bad', ...o2, b: 'bad' }

// spreading write-only properties is not allowed
let setterOnly = { ...{ set b (bad: number) { } } };


//// [objectSpreadElementNegative.js]
var o = { a: 1, b: 'no' };
var swap = { a: 'yes', b: -1 };
// new field's type conflicts with existing field
var o2 = { , a: 'wrong type?' };
var o3 = { a: 'wrong type?',  };
var o4 = { ,  };
var combinedNested = {
    ,
    c: -1 // error, number not assignable to string
};
// expressions are not allowed
var o5 = {  };
var o6 = {  };
// repeats are not allowed
var duplicated = { b: 'bad', , b: 'bad', , b: 'bad' };
// spreading write-only properties is not allowed
var setterOnly = {  };
