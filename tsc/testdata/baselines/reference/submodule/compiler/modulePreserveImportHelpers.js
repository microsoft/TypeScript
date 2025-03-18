//// [tests/cases/compiler/modulePreserveImportHelpers.ts] ////

//// [a.mts]
declare var dec: any

@dec()
export class A {}

//// [b.cts]
declare var dec: any

@dec()
class B {}
export {};

//// [c.ts]
declare var dec: any

@dec()
export class C {}

//// [package.json]
{
    "type": "module"
}

//// [package.json]
{
    "name": "tslib",
    "main": "tslib.js",
    "types": "tslib.d.ts"
}

//// [tslib.d.ts]
export declare function __esDecorate(...args: any[]): any;
export declare function __runInitializers(...args: any[]): any;


//// [a.mjs]
@dec()
export class A {
}
//// [b.cjs]
@dec()
class B {
}
//// [c.js]
@dec()
export class C {
}
