// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63559
// Extending a value whose type is a class instance type carrying a construct
// signature should resolve the base type from that construct signature rather
// than repeating the outer instance type.

export declare const Base: {
    new (): {
        kind: "A";
        new (): { kind: "B" };
    };
};

const A = new class extends Base {}();
const B = new class extends A {}();

const a: "A" = A.kind;
const b: "B" = B.kind;
