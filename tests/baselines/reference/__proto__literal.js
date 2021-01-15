//// [__proto__literal.ts]
const o = { a: 1 }
const __proto__ = o
// Should
const x1 = { __proto__: o }
const x2 = { __proto_\u005f: o }
const x3 = { "__proto__": o }
const x4 = { "__proto_\u005f": o }

// Duplicate
const y1 = { __proto__: o, __proto_\u005f: o }

// Spread order
const z1 = { ...({a: ''}), __proto__: o }
const z2 = { __proto__: o, ...({a: ''}) }

// Null
const w = { __proto__: null }

// Non-object
const q = { __proto__: 1, x: 1 }

// Should not
const x5 = { ["__proto__"]: o }
const x6 = { __proto__ }
const x7 = { __proto__() {} }
enum e { __proto__ = 1 }
{
    const { __proto__ } = { ['__proto__']: 1 }
}

//// [__proto__literal.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a, _b;
var o = { a: 1 };
var __proto__ = o;
// Should
var x1 = { __proto__: o };
var x2 = { __proto_\u005f: o };
var x3 = { "__proto__": o };
var x4 = { "__proto_\u005f": o };
// Duplicate
var y1 = { __proto__: o, __proto_\u005f: o };
// Spread order
var z1 = __assign(__assign({}, ({ a: '' })), { __proto__: o });
var z2 = __assign({ __proto__: o }, ({ a: '' }));
// Null
var w = { __proto__: null };
// Non-object
var q = { __proto__: 1, x: 1 };
// Should not
var x5 = (_a = {}, _a["__proto__"] = o, _a);
var x6 = { __proto__: __proto__ };
var x7 = { __proto__: function () { } };
var e;
(function (e) {
    e[e["__proto__"] = 1] = "__proto__";
})(e || (e = {}));
{
    var __proto__1 = (_b = {}, _b['__proto__'] = 1, _b).__proto__;
}
