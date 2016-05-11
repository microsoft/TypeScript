let o = { a: 1, b: 'no' };
var { ...clone } = o;
var { a, ...justB } = o;
var { a, b: renamed, ...empty } = o;

let o2 = { c: 'terrible idea?', d: 'yes' };
var { d: renamed, ...d } = o2;
