// @target: ES5
// @declaration: true
// @removeComments: false
// @module: commonjs

// @Filename: declFileFunctions_0.ts
/** This comment should appear for foo*/
export function foo() {
}
/** This is comment for function signature*/
export function fooWithParameters(/** this is comment about a*/a: string,
    /** this is comment for b*/
    b: number) {
    var d = a;
}
export function fooWithRestParameters(a: string, ...rests: string[]) {
    return a + rests.join("");
}

export function fooWithOverloads(a: string): string;
export function fooWithOverloads(a: number): number;
export function fooWithOverloads(a: any): any {
    return a;
}

export function fooWithSingleOverload(a: string): string;
export function fooWithSingleOverload(a: any) {
    return a;
}

export function fooWithTypePredicate(a: any): a is number {
    return true;
}
export function fooWithTypePredicateAndMulitpleParams(a: any, b: any, c: any): a is number {
    return true;
}
export function fooWithTypeTypePredicateAndGeneric<T>(a: any): a is T {
    return true;
}
export function fooWithTypeTypePredicateAndRestParam(a: any, ...rest): a is number {
    return true;
}

/** This comment should appear for nonExportedFoo*/
function nonExportedFoo() {
}
/** This is comment for function signature*/
function nonExportedFooWithParameters(/** this is comment about a*/a: string,
    /** this is comment for b*/
    b: number) {
    var d = a;
}
function nonExportedFooWithRestParameters(a: string, ...rests: string[]) {
    return a + rests.join("");
}

function nonExportedFooWithOverloads(a: string): string;
function nonExportedFooWithOverloads(a: number): number;
function nonExportedFooWithOverloads(a: any): any {
    return a;
}

// @Filename: declFileFunctions_1.ts
/** This comment should appear for foo*/
function globalfoo() {
}
/** This is comment for function signature*/
function globalfooWithParameters(/** this is comment about a*/a: string,
    /** this is comment for b*/
    b: number) {
    var d = a;
}
function globalfooWithRestParameters(a: string, ...rests: string[]) {
    return a + rests.join("");
}
function globalfooWithOverloads(a: string): string;
function globalfooWithOverloads(a: number): number;
function globalfooWithOverloads(a: any): any {
    return a;
}