//// [tests/cases/conformance/es7/trailingCommasInBindingPatterns.ts] ////

//// [trailingCommasInBindingPatterns.ts]
const [...a,] = [];
const {...b,} = {};
let c, d;
([...c,] = []);
({...d,} = {});

// Allowed for non-rest elements
const [e,] = <any>[];
const {f,} = <any>{};
let g, h;
([g,] = <any>[]);
({h,} = <any>{});


//// [trailingCommasInBindingPatterns.js]
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
var _a;
const [...a,] = [];
const b = __rest({}, []);
let c, d;
([...c,] = []);
(_a = {}, d = __rest(_a, []));
// Allowed for non-rest elements
const [e,] = [];
const { f, } = {};
let g, h;
([g,] = []);
({ h, } = {});
