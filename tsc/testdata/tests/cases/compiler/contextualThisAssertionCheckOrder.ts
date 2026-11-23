// @strict: true
// @noEmit: true
// @allowUnreachableCode: false
// @checkOrder: default, typesfirst, editorfirst

// A function expression's this is typed contextually, and calling an
// assertion or never-returning method through it narrows the same way
// whether or not the types in the call were requested first (42175).

declare function makeContextualThisParameter<T>(cb: (this: T) => any): void;

makeContextualThisParameter<{ assert(v: any): asserts v }>(function () {
    const v = Boolean();
    this.assert(v);
    const w: true = v;
});

makeContextualThisParameter<{ returnNever(): never }>(function () {
    this.returnNever();
    debugger;
});
