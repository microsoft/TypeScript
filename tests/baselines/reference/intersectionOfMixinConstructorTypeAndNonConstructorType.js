//// [intersectionOfMixinConstructorTypeAndNonConstructorType.ts]
// Repro for #17388

declare let x: {foo: undefined} & {new(...args: any[]): any};
new x();


//// [intersectionOfMixinConstructorTypeAndNonConstructorType.js]
// Repro for #17388
new x();
