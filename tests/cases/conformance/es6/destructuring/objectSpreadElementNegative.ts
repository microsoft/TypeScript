let o = { a: 1, b: 'no' };
let swap = { a: 'yes', b: -1 };

// new field's type conflicts with existing field
let o2 = { ...o, a: 'wrong type?' }
let o3 = { a: 'wrong type?', ...o }
let o4 = { ...o, ...swap };

// parse errors
let o7 = { ...o? };
let o8 = { ...*o };
let o9 = { ...matchMedia() { }};
let o10 = { ...get x() { return 12; }};
let o5 = { ...1 + 1 };
let o6 = { ...(1 + 1) };
