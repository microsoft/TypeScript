// @allowUnreachableCode: true

// @target: es5

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

function f8(): void {
    // Fine since are typed any.
    return;
}

function f9(): void {
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