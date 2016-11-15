//// [objectRest.ts]
var o = { a: 1, b: 'no' }
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

let computed = 'b';
let computed2 = 'a';
var { [computed]: stillNotGreat, [computed2]: soSo,  ...o } = o;
({ [computed]: stillNotGreat, [computed2]: soSo, ...o } = o);


//// [objectRest.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) === -1)
        t[p] = s[p];
    return t;
};
var o = { a: 1, b: 'no' };
var clone = __rest(o, []);
var { a } = o, justB = __rest(o, ["a"]);
var { a, b: renamed } = o, empty = __rest(o, ["a", "b"]);
var _a = 'b', renamed = o[_a], justA = __rest(o, [_a + ""]);
var { 'b': renamed } = o, justA = __rest(o, ["b"]);
var { b: { '0': n, '1': oooo } } = o, justA = __rest(o, ["b"]);
let o2 = { c: 'terrible idea?', d: 'yes' };
var { d: renamed } = o2, d = __rest(o2, ["d"]);
let nestedrest;
var { x } = nestedrest, _b = nestedrest.n1, { y } = _b, _c = _b.n2, { z } = _c, nr = __rest(_c.n3, []), restrest = __rest(nestedrest, ["x", "n1"]);
let complex;
var _d = complex.x, { ka } = _d, nested = __rest(_d, ["ka"]), { y: other } = complex, rest = __rest(complex, ["x", "y"]);
(_e = complex.x, { ka } = _e, nested = __rest(_e, ["ka"]), { y: other } = complex, rest = __rest(complex, ["x", "y"]), complex);
var _f = { x: 1, y: 2 }, { x } = _f, fresh = __rest(_f, ["x"]);
(_g = { x: 1, y: 2 }, { x } = _g, fresh = __rest(_g, ["x"]), _g);
class Removable {
    set z(value) { }
    get both() { return 12; }
    set both(value) { }
    m() { }
}
var removable = new Removable();
var { removed } = removable, removableRest = __rest(removable, ["removed"]);
let computed = 'b';
let computed2 = 'a';
var _h = computed, stillNotGreat = o[_h], _j = computed2, soSo = o[_j], o = __rest(o, [_h + "", _j + ""]);
(_k = computed, stillNotGreat = o[_k], _l = computed2, soSo = o[_l], o = __rest(o, [_k + "", _l + ""]), o);
var _e, _g, _k, _l;
