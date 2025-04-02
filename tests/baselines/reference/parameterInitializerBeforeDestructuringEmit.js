//// [tests/cases/compiler/parameterInitializerBeforeDestructuringEmit.ts] ////

//// [parameterInitializerBeforeDestructuringEmit.ts]
interface Foo {
    bar?: any;
    baz?: any;
}

function foobar({ bar = {}, ...opts }: Foo = {}) {
    "use strict";
    "Some other prologue";
    opts.baz(bar);
}

class C {
    constructor({ bar = {}, ...opts }: Foo = {}) {
        "use strict";
        "Some other prologue";
        opts.baz(bar);
    }
}


//// [parameterInitializerBeforeDestructuringEmit.js]
"use strict";
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
function foobar(_a) {
    "use strict";
    "Some other prologue";
    if (_a === void 0) { _a = {}; }
    var _b = _a.bar, bar = _b === void 0 ? {} : _b, opts = __rest(_a, ["bar"]);
    opts.baz(bar);
}
var C = /** @class */ (function () {
    function C(_a) {
        "use strict";
        "Some other prologue";
        if (_a === void 0) { _a = {}; }
        var _b = _a.bar, bar = _b === void 0 ? {} : _b, opts = __rest(_a, ["bar"]);
        opts.baz(bar);
    }
    return C;
}());
