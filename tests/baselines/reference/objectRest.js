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
interface I {
    m(): void;
    removed: string;
    remainder: string;
}
var removable = new Removable();
var { removed, ...removableRest } = removable;
var i: I = removable;
var { removed, ...removableRest2 } = i;

let computed = 'b';
let computed2 = 'a';
var { [computed]: stillNotGreat, [computed2]: soSo,  ...o } = o;
({ [computed]: stillNotGreat, [computed2]: soSo, ...o } = o);

var noContextualType = ({ aNumber = 12, ...notEmptyObject }) => aNumber + notEmptyObject.anythingGoes;


//// [objectRest.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var o = { a: 1, b: 'no' };
var clone = __rest(o, []);
var { a } = o, justB = __rest(o, ["a"]);
var { a, b: renamed } = o, empty = __rest(o, ["a", "b"]);
var { ['b']: renamed } = o, justA = __rest(o, ['b']);
var { 'b': renamed } = o, justA = __rest(o, ['b']);
var { b: { '0': n, '1': oooo } } = o, justA = __rest(o, ["b"]);
let o2 = { c: 'terrible idea?', d: 'yes' };
var { d: renamed } = o2, d = __rest(o2, ["d"]);
let nestedrest;
var { x } = nestedrest, _a = nestedrest.n1, { y } = _a, _b = _a.n2, { z } = _b, nr = __rest(_b.n3, []), restrest = __rest(nestedrest, ["x", "n1"]);
let complex;
var _c = complex.x, { ka } = _c, nested = __rest(_c, ["ka"]), { y: other } = complex, rest = __rest(complex, ["x", "y"]);
(_d = complex.x, { ka } = _d, nested = __rest(_d, ["ka"]), { y: other } = complex, rest = __rest(complex, ["x", "y"]));
var _e = { x: 1, y: 2 }, { x } = _e, fresh = __rest(_e, ["x"]);
(_f = { x: 1, y: 2 }, { x } = _f, fresh = __rest(_f, ["x"]));
class Removable {
    set z(value) { }
    get both() { return 12; }
    set both(value) { }
    m() { }
}
var removable = new Removable();
var { removed } = removable, removableRest = __rest(removable, ["removed"]);
var i = removable;
var { removed } = i, removableRest2 = __rest(i, ["removed"]);
let computed = 'b';
let computed2 = 'a';
var _g = computed, stillNotGreat = o[_g], _h = computed2, soSo = o[_h], o = __rest(o, [typeof _g === "symbol" ? _g : _g + "", typeof _h === "symbol" ? _h : _h + ""]);
(_j = computed, stillNotGreat = o[_j], _k = computed2, soSo = o[_k], o = __rest(o, [typeof _j === "symbol" ? _j : _j + "", typeof _k === "symbol" ? _k : _k + ""]));
var noContextualType = (_a) => {
    var { aNumber = 12 } = _a, notEmptyObject = __rest(_a, ["aNumber"]);
    return aNumber + notEmptyObject.anythingGoes;
};
var _d, _f, _j, _k;
