//// [tests/cases/compiler/anonymousClassDeclarationDoesntPrintWithReadonly.ts] ////

//// [anonymousClassDeclarationDoesntPrintWithReadonly.ts]
export class X {
    constructor(readonly a: number) { }
}

export function y() {
    return class extends X { }
}

//// [anonymousClassDeclarationDoesntPrintWithReadonly.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.X = void 0;
exports.y = y;
class X {
    a;
    constructor(a) {
        this.a = a;
    }
}
exports.X = X;
function y() {
    return class extends X {
    };
}
