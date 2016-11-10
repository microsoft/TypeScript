//// [objectRest.ts]
let o = { a: 1, b: 'no' }
var { ...clone } = o;
var { a, ...justB } = o;
var { a, b: renamed, ...empty } = o;
var { ['b']: renamed, ...justA } = o;
var { 'b': renamed, ...justA } = o;
var { b: { '0': n, '1': oooo }, ...justA } = o;

let o2 = { c: 'terrible idea?', d: 'yes' };
var { d: renamed, ...d } = o2;

let nestedrest: { x: number, n1: { y: number, n2: { z: number, n3: { n4: number } } }, rest: number, restrest: number };
var { x, n1: { y, n2: { z, n3: { ...nr } } }, ...restrest } = nestedrest;

let complex: { x: { ka, ki }, y: number };
var { x: { ka, ...nested }, y: other, ...rest } = complex;
({x: { ka, ...nested }, y: other, ...rest} = complex);
var { x, ...fresh } = { x: 1, y: 2 };
({ x, ...fresh } = { x: 1, y: 2 });

class Removable {
    private x: number;
    protected y: number;
    set z(value: number) { }
    get both(): number { return 12 }
    set both(value: number) { }
    m() { }
    removed: string;
    remainder: string;
}
var removable = new Removable();
var { removed, ...removableRest } = removable;


//// [objectRest.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && !e.indexOf(p))
        t[p] = s[p];
    return t;
};
let o = { a: 1, b: 'no' };
var clone = __rest(o, []);
var { a } = o, justB = __rest(o, ["a"]);
var { a, b: renamed } = o, empty = __rest(o, ["a", "b"]);
var { ['b']: renamed } = o, justA = __rest(o, ["b"]);
var { 'b': renamed } = o, justA = __rest(o, ["b"]);
var { b: { '0': n, '1': oooo } } = o, justA = __rest(o, ["b"]);
let o2 = { c: 'terrible idea?', d: 'yes' };
var { d: renamed } = o2, d = __rest(o2, ["d"]);
let nestedrest;
var { x } = nestedrest, _a = nestedrest.n1, { y } = _a, _b = _a.n2, { z } = _b, nr = __rest(_b.n3, []), restrest = __rest(nestedrest, ["x", "n1"]);
let complex;
var _c = complex.x, { ka } = _c, nested = __rest(_c, ["ka"]), { y: other } = complex, rest = __rest(complex, ["x", "y"]);
(_d = complex.x, { ka } = _d, nested = __rest(_d, ["ka"]), { y: other } = complex, rest = __rest(complex, ["x", "y"]), complex);
var _e = { x: 1, y: 2 }, { x } = _e, fresh = __rest(_e, ["x"]);
(_f = { x: 1, y: 2 }, { x } = _f, fresh = __rest(_f, ["x"]), _f);
class Removable {
    set z(value) { }
    get both() { return 12; }
    set both(value) { }
    m() { }
}
var removable = new Removable();
var { removed } = removable, removableRest = __rest(removable, ["removed"]);
var _d, _f;
