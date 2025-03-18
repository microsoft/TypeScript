//// [tests/cases/compiler/declarationEmitForDefaultExportClassExtendingExpression01.ts] ////

//// [declarationEmitForDefaultExportClassExtendingExpression01.ts]
interface Greeter {
    getGreeting(): string;
}

interface GreeterConstructor {
    new (): Greeter;
}

class A {
    getGreeting() {
        return 'hello';
    }
}

const getGreeterBase = (): GreeterConstructor => A;

export default class extends getGreeterBase() {
}



//// [declarationEmitForDefaultExportClassExtendingExpression01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class A {
    getGreeting() {
        return 'hello';
    }
}
const getGreeterBase = () => A;
class default_1 extends getGreeterBase() {
}
exports.default = default_1;
