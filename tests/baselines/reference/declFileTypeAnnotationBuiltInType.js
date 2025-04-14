//// [tests/cases/compiler/declFileTypeAnnotationBuiltInType.ts] ////

//// [declFileTypeAnnotationBuiltInType.ts]
// string
function foo(): string {
    return "";
}
function foo2() {
    return "";
}

// number
function foo3(): number {
    return 10;
}
function foo4() {
    return 10;
}

// boolean
function foo5(): boolean {
    return true;
}
function foo6() {
    return false;
}

// void
function foo7(): void {
    return;
}
function foo8() {
    return;
}

// any
function foo9(): any {
    return undefined;
}
function foo10() {
    return undefined;
}

//// [declFileTypeAnnotationBuiltInType.js]
// string
function foo() {
    return "";
}
function foo2() {
    return "";
}
// number
function foo3() {
    return 10;
}
function foo4() {
    return 10;
}
// boolean
function foo5() {
    return true;
}
function foo6() {
    return false;
}
// void
function foo7() {
    return;
}
function foo8() {
    return;
}
// any
function foo9() {
    return undefined;
}
function foo10() {
    return undefined;
}


//// [declFileTypeAnnotationBuiltInType.d.ts]
declare function foo(): string;
declare function foo2(): string;
declare function foo3(): number;
declare function foo4(): number;
declare function foo5(): boolean;
declare function foo6(): boolean;
declare function foo7(): void;
declare function foo8(): void;
declare function foo9(): any;
declare function foo10(): any;
