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
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b, _c, _d, _e;
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
var { x } = nestedrest, _f = nestedrest.n1, { y } = _f, _g = _f.n2, { z } = _g, nr = __rest(_g.n3, []), restrest = __rest(nestedrest, ["x", "n1"]);
let complex;
var _h = complex.x, { ka } = _h, nested = __rest(_h, ["ka"]), { y: other } = complex, rest = __rest(complex, ["x", "y"]);
(_a = complex.x, { ka } = _a, nested = __rest(_a, ["ka"]), { y: other } = complex, rest = __rest(complex, ["x", "y"]));
var _j = { x: 1, y: 2 }, { x } = _j, fresh = __rest(_j, ["x"]);
(_b = { x: 1, y: 2 }, { x } = _b, fresh = __rest(_b, ["x"]));
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
var _k = o, _l = computed, stillNotGreat = _k[_l], _m = computed2, soSo = _k[_m], o = __rest(_k, [typeof _l === "symbol" ? _l : _l + "", typeof _m === "symbol" ? _m : _m + ""]);
(_c = o, _d = computed, stillNotGreat = _c[_d], _e = computed2, soSo = _c[_e], o = __rest(_c, [typeof _d === "symbol" ? _d : _d + "", typeof _e === "symbol" ? _e : _e + ""]));
var noContextualType = (_a) => {
    var { aNumber = 12 } = _a, notEmptyObject = __rest(_a, ["aNumber"]);
    return aNumber + notEmptyObject.anythingGoes;
};
