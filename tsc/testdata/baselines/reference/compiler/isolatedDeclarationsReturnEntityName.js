//// [tests/cases/compiler/isolatedDeclarationsReturnEntityName.ts] ////

//// [isolatedDeclarationsReturnEntityName.ts]
// Regression for #65106: value-position entity names in returns must produce
// TS9007/TS9008 (explicit return type), not TS9039/TS9013 (private name / expression).

export const x: { a: number } = { a: 1 };
export function f() { return x; }

export class C {
    x = 1;
    method() { return this.x; }
}


//// [isolatedDeclarationsReturnEntityName.js]
// Regression for #65106: value-position entity names in returns must produce
// TS9007/TS9008 (explicit return type), not TS9039/TS9013 (private name / expression).
export const x = { a: 1 };
export function f() { return x; }
export class C {
    x = 1;
    method() { return this.x; }
}
