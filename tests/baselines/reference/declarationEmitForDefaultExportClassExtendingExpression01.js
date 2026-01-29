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
class A {
    getGreeting() {
        return 'hello';
    }
}
const getGreeterBase = () => A;
export default class extends getGreeterBase() {
}


//// [declarationEmitForDefaultExportClassExtendingExpression01.d.ts]
interface Greeter {
    getGreeting(): string;
}
interface GreeterConstructor {
    new (): Greeter;
}
declare const default_base: GreeterConstructor;
export default class extends default_base {
}
export {};
