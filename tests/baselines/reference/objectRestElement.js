//// [objectRestElement.ts]
let o = { a: 1, b: 'no' };
var { ...clone } = o;
var { a, ...justB } = o;
var { a, b: renamed, ...empty } = o;

let o2 = { c: 'terrible idea?', d: 'yes' };
var { d: renamed, ...d } = o2;


//// [objectRestElement.js]
var __rest = (this && this.__destructure) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && !e.indexOf(p))
        t[p] = s[p];
    return t;
};
var o = { a: 1, b: 'no' };
var clone = o.clone;
var a = o.a, justB = o.justB;
var a = o.a, renamed = o.b, empty = o.empty;
var o2 = { c: 'terrible idea?', d: 'yes' };
var renamed = o2.d, d = o2.d;
