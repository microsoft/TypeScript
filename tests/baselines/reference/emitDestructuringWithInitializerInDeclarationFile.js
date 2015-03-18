//// [emitDestructuringWithInitializerInDeclarationFile.ts]
class C { }
class D extends C { }
var {s = '10', c} = { s: 'bar', c: true };
var [s1 = '10', c1] = ['hello', 'word'];
var {s2 = { prop1: new C(), prop2: new C() }, c2} = { s2: { prop1: new D(), prop2: new D() }, c2: false };
var [[s3 = [], c3]] = [[[10,20], "blah"]];

//// [emitDestructuringWithInitializerInDeclarationFile.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C() {
    }
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(C);
var _a = {
    s: 'bar',
    c: true
}, _b = _a.s, s = _b === void 0 ? '10' : _b, c = _a.c;
var _c = [
    'hello',
    'word'
], _d = _c[0], s1 = _d === void 0 ? '10' : _d, c1 = _c[1];
var _e = {
    s2: {
        prop1: new D(),
        prop2: new D()
    },
    c2: false
}, _f = _e.s2, s2 = _f === void 0 ? {
    prop1: new C(),
    prop2: new C()
} : _f, c2 = _e.c2;
var _g = ([
    [
        [
            10,
            20
        ],
        "blah"
    ]
])[0], _h = _g[0], s3 = _h === void 0 ? [] : _h, c3 = _g[1];


//// [emitDestructuringWithInitializerInDeclarationFile.d.ts]
declare class C {
}
declare class D extends C {
}
declare var s: string, c: boolean;
declare var s1: string, c1: string;
declare var s2: {
    prop1: D;
    prop2: D;
}, c2: boolean;
declare var s3: number[], c3: string;
