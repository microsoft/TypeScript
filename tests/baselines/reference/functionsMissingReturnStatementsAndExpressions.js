//// [tests/cases/compiler/functionsMissingReturnStatementsAndExpressions.ts] ////

//// [functionsMissingReturnStatementsAndExpressions.ts]
function f1(): string {
    // errors because there are no return statements
}

function f2(): string {
    // Permissible; returns undefined.
    return;
}

function f3(): string {
    return "Okay, because this is a return expression.";
}

function f4(): void {
    // Fine since we are typed void.
}

function f5(): void {
    // Fine since we are typed void.
    return;
}

function f6(): void {
    // Fine since we are typed void and return undefined
    return undefined;
}

function f7(): void {
    // Fine since we are typed void and return null
    return null;
}

function f8(): any {
    // Fine since are typed any.
    return;
}

function f9(): any {
    // Fine since we are typed any and return undefined
    return undefined;
}

function f10(): void {
    // Fine since we are typed any and return null
    return null;
}

function f11(): string {
    // Fine since we consist of a single throw statement.
    throw undefined;
}

function f12(): void {
    // Fine since we consist of a single throw statement.
    throw undefined;
}

function f13(): any {
    // Fine since we consist of a single throw statement.
    throw undefined;
}

function f14(): number {
    // Not fine, since we can *only* consist of a single throw statement
    // if no return statements are present but we are annotated.
    throw undefined;
    throw null;
}

function f15(): number {
    // Fine, since we have a return statement somewhere.
    throw undefined;
    throw null;
    return;
}


function f16() {
    // Okay; not type annotated.
}

function f17() {
    // Okay; not type annotated.
    return;
}

function f18() {
    return "Okay, not type annotated.";
}

function f19(): void | number {
    // Okay; function return type is union containing void
}

function f20(): any | number {
    // Okay; function return type is union containing any
}

function f21(): number | string {
    // Not okay; union does not contain void or any
}

function f22(): undefined {
    // Okay; return type allows implicit return of undefined
}

function f23(): undefined | number {
    // Error; because `undefined | number` becomes `number` without strictNullChecks.
}

const f30: () => undefined = () => {
    // Ok, contextual type for implicit return is `undefined`
}

const f31: () => undefined = () => {
    // Ok, contextual type for expression-less return is `undefined`
    return;
}

const f32: () => undefined | number = () => {
    // Error, contextual type for implicit return isn't just `undefined`
}

const f33: () => undefined | number = () => {
    // Error, contextual type for expression-less return isn't just `undefined`
    return;
}

class C {
    public get m1() {
        // Errors; get accessors must return a value.
    }

    public get m2() {
        // Permissible; returns undefined.
        return;
    }

    public get m3() {
        return "Okay, because this is a return expression.";
    }

    public get m4() {
        // Fine since this consists of a single throw statement.
        throw null;
    }

    public get m5() {
        // Not fine, since we can *only* consist of a single throw statement
        // if no return statements are present but we are a get accessor.
        throw null;
        throw undefined.
    }
}


//// [functionsMissingReturnStatementsAndExpressions.js]
function f1() {
    // errors because there are no return statements
}
function f2() {
    // Permissible; returns undefined.
    return;
}
function f3() {
    return "Okay, because this is a return expression.";
}
function f4() {
    // Fine since we are typed void.
}
function f5() {
    // Fine since we are typed void.
    return;
}
function f6() {
    // Fine since we are typed void and return undefined
    return undefined;
}
function f7() {
    // Fine since we are typed void and return null
    return null;
}
function f8() {
    // Fine since are typed any.
    return;
}
function f9() {
    // Fine since we are typed any and return undefined
    return undefined;
}
function f10() {
    // Fine since we are typed any and return null
    return null;
}
function f11() {
    // Fine since we consist of a single throw statement.
    throw undefined;
}
function f12() {
    // Fine since we consist of a single throw statement.
    throw undefined;
}
function f13() {
    // Fine since we consist of a single throw statement.
    throw undefined;
}
function f14() {
    // Not fine, since we can *only* consist of a single throw statement
    // if no return statements are present but we are annotated.
    throw undefined;
    throw null;
}
function f15() {
    // Fine, since we have a return statement somewhere.
    throw undefined;
    throw null;
    return;
}
function f16() {
    // Okay; not type annotated.
}
function f17() {
    // Okay; not type annotated.
    return;
}
function f18() {
    return "Okay, not type annotated.";
}
function f19() {
    // Okay; function return type is union containing void
}
function f20() {
    // Okay; function return type is union containing any
}
function f21() {
    // Not okay; union does not contain void or any
}
function f22() {
    // Okay; return type allows implicit return of undefined
}
function f23() {
    // Error; because `undefined | number` becomes `number` without strictNullChecks.
}
var f30 = function () {
    // Ok, contextual type for implicit return is `undefined`
};
var f31 = function () {
    // Ok, contextual type for expression-less return is `undefined`
    return;
};
var f32 = function () {
    // Error, contextual type for implicit return isn't just `undefined`
};
var f33 = function () {
    // Error, contextual type for expression-less return isn't just `undefined`
    return;
};
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "m1", {
        get: function () {
            // Errors; get accessors must return a value.
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "m2", {
        get: function () {
            // Permissible; returns undefined.
            return;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "m3", {
        get: function () {
            return "Okay, because this is a return expression.";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "m4", {
        get: function () {
            // Fine since this consists of a single throw statement.
            throw null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "m5", {
        get: function () {
            // Not fine, since we can *only* consist of a single throw statement
            // if no return statements are present but we are a get accessor.
            throw null;
            throw undefined.
            ;
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());
