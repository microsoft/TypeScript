//// [tests/cases/compiler/excessPropertiesInOverloads.ts] ////

//// [excessPropertiesInOverloads.ts]
declare function fn(a: { x: string }): void;
declare function fn(a: { y: string }): void;
fn({ z: 3, a: 3 });


//// [excessPropertiesInOverloads.js]
fn({ z: 3, a: 3 });
