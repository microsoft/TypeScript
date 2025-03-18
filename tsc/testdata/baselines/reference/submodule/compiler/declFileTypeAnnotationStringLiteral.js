//// [tests/cases/compiler/declFileTypeAnnotationStringLiteral.ts] ////

//// [declFileTypeAnnotationStringLiteral.ts]
function foo(a: "hello"): number;
function foo(a: "name"): string;
function foo(a: string): string | number;
function foo(a: string): string | number {
    if (a === "hello") {
        return a.length;
    }

    return a;
}

//// [declFileTypeAnnotationStringLiteral.js]
function foo(a) {
    if (a === "hello") {
        return a.length;
    }
    return a;
}
