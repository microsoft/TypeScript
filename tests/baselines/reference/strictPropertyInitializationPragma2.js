//// [tests/cases/conformance/pragma/strictPropertyInitialization/strictPropertyInitializationPragma2.ts] ////

//// [file1.ts]
// @ts-strictPropertyInitialization
export class A {
    prop: string;
    constructor() {}
}

//// [file2.ts]
// @ts-strictPropertyInitialization true
export class A {
    prop: string;
    constructor() {}
}

//// [file3.ts]
// @ts-strictPropertyInitialization false
export class A {
    prop: string;
    constructor() {}
}

//// [file4.ts]
export class A {
    prop: string;
    constructor() {}
}


//// [file1.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
// @ts-strictPropertyInitialization
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
// @ts-strictPropertyInitialization true
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [file3.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
// @ts-strictPropertyInitialization false
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
//// [file4.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;
