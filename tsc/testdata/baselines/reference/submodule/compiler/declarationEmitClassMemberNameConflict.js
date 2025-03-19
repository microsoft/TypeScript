//// [tests/cases/compiler/declarationEmitClassMemberNameConflict.ts] ////

//// [declarationEmitClassMemberNameConflict.ts]
export class C1 {
    C1() { } // has to be the same as the class name

    bar() {
        return function (t: typeof C1) {
        };
    }
}

export class C2 {
    C2: any // has to be the same as the class name

    bar() {
        return function (t: typeof C2) {
        };
    }
}

export class C3 {
    get C3() { return 0; } // has to be the same as the class name

    bar() {
        return function (t: typeof C3) {
        };
    }
}

export class C4 {
    set C4(v) { } // has to be the same as the class name

    bar() {
        return function (t: typeof C4) {
        };
    }
}

//// [declarationEmitClassMemberNameConflict.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C4 = exports.C3 = exports.C2 = exports.C1 = void 0;
class C1 {
    C1() { } // has to be the same as the class name
    bar() {
        return function (t) {
        };
    }
}
exports.C1 = C1;
class C2 {
    C2; // has to be the same as the class name
    bar() {
        return function (t) {
        };
    }
}
exports.C2 = C2;
class C3 {
    get C3() { return 0; } // has to be the same as the class name
    bar() {
        return function (t) {
        };
    }
}
exports.C3 = C3;
class C4 {
    set C4(v) { } // has to be the same as the class name
    bar() {
        return function (t) {
        };
    }
}
exports.C4 = C4;
