//// [destructuringInFunctionType.ts]

interface a { a }
interface b { b }
interface c { c }

type T1 = ([a, b, c]);
type F1 = ([a, b, c]) => void;

type T2 = ({ a });
type F2 = ({ a }) => void;

type T3 = ([{ a: b }, { b: a }]);
type F3 = ([{ a: b }, { b: a }]) => void;

type T4 = ([{ a: [b, c] }]);
type F4 = ([{ a: [b, c] }]) => void;

type C1 = new ([{ a: [b, c] }]) => void;

var v1 = ([a, b, c]) => "hello";
var v2: ([a, b, c]) => string;


//// [destructuringInFunctionType.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var v1 = function (_a) {
    var _b = __read(_a, 3), a = _b[0], b = _b[1], c = _b[2];
    return "hello";
};
var v2;


//// [destructuringInFunctionType.d.ts]
interface a {
    a: any;
}
interface b {
    b: any;
}
interface c {
    c: any;
}
declare type T1 = ([a, b, c]);
declare type F1 = ([a, b, c]) => void;
declare type T2 = ({
    a;
});
declare type F2 = ({a}) => void;
declare type T3 = ([{
    a: b;
}, {
    b: a;
}]);
declare type F3 = ([{a: b}, {b: a}]) => void;
declare type T4 = ([{
    a: [b, c];
}]);
declare type F4 = ([{a: [b, c]}]) => void;
declare type C1 = new ([{a: [b, c]}]) => void;
declare var v1: ([a, b, c]: [any, any, any]) => string;
declare var v2: ([a, b, c]) => string;
