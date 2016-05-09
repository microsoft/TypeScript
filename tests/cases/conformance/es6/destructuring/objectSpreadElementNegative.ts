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
