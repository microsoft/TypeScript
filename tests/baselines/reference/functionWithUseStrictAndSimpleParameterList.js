//// [tests/cases/conformance/functions/functionWithUseStrictAndSimpleParameterList.ts] ////

//// [functionWithUseStrictAndSimpleParameterList.ts]
function a(a = 10) {
    "use strict";
}

export var foo = 10;
function b(a = 10) {
}

function container() {
    "use strict";
    function f(a = 10) {
    }
}

function rest(...args: any[]) {
    'use strict';
}

function rest1(a = 1, ...args) {
    'use strict';
}

function paramDefault(param = 1) {
    'use strict';
}

function objectBindingPattern({foo}: any) {
    'use strict';
}

function arrayBindingPattern([foo]: any[]) {
    'use strict';
}

function manyParameter(a = 10, b = 20) {
    "use strict";
}

function manyPrologue(a = 10, b = 20) {
    "foo";
    "use strict";
}

function invalidPrologue(a = 10, b = 20) {
    "foo";
    const c = 1;
    "use strict";
}


//// [functionWithUseStrictAndSimpleParameterList.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = void 0;
function a(a) {
    "use strict";
    if (a === void 0) { a = 10; }
}
exports.foo = 10;
function b(a) {
    if (a === void 0) { a = 10; }
}
function container() {
    "use strict";
    function f(a) {
        if (a === void 0) { a = 10; }
    }
}
function rest() {
    'use strict';
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
function rest1(a) {
    'use strict';
    if (a === void 0) { a = 1; }
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
}
function paramDefault(param) {
    'use strict';
    if (param === void 0) { param = 1; }
}
function objectBindingPattern(_a) {
    'use strict';
    var foo = _a.foo;
}
function arrayBindingPattern(_a) {
    'use strict';
    var foo = _a[0];
}
function manyParameter(a, b) {
    "use strict";
    if (a === void 0) { a = 10; }
    if (b === void 0) { b = 20; }
}
function manyPrologue(a, b) {
    "foo";
    "use strict";
    if (a === void 0) { a = 10; }
    if (b === void 0) { b = 20; }
}
function invalidPrologue(a, b) {
    "foo";
    if (a === void 0) { a = 10; }
    if (b === void 0) { b = 20; }
    var c = 1;
    "use strict";
}
