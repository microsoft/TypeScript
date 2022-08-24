//// [tests/cases/conformance/pragma/noImplicitReturns/noImplicitReturnsPragma2.ts] ////

//// [file1.ts]
// @ts-noImplicitReturns
export function f1(): string | undefined {
    if (!!f1) {
        return "";
    }
}

//// [file2.ts]
// @ts-noImplicitReturns true
export function f1(): string | undefined {
    if (!!f1) {
        return "";
    }
}

//// [file3.ts]
// @ts-noImplicitReturns false
export function f1(): string | undefined {
    if (!!f1) {
        return "";
    }
}

//// [file4.ts]
export function f1(): string | undefined {
    if (!!f1) {
        return "";
    }
}

//// [file1.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-noImplicitReturns
function f1() {
    if (!!f1) {
        return "";
    }
}
exports.f1 = f1;
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-noImplicitReturns true
function f1() {
    if (!!f1) {
        return "";
    }
}
exports.f1 = f1;
//// [file3.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-noImplicitReturns false
function f1() {
    if (!!f1) {
        return "";
    }
}
exports.f1 = f1;
//// [file4.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
function f1() {
    if (!!f1) {
        return "";
    }
}
exports.f1 = f1;
