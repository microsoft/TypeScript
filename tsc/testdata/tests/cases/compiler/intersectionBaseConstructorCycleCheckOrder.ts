// @checkOrder: default, typesfirst

// The type of x depends on the members of C, which depend on its base B,
// whose members depend on the type of x. Whichever is resolved first, the
// cycle must be resolved the same way.

declare const B: (new (x: C["p"]) => {}) & (new () => {});
declare class C extends B { p: number; }
