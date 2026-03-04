//// [tests/cases/compiler/declarationEmitNestedBindingPattern.ts] ////

//// [declarationEmitNestedBindingPattern.ts]
// Nested array binding pattern
export class C1 {
    constructor(public [[x]]: any[]) {}
}

// Nested object binding pattern
export class C2 {
    constructor(public [{y}]: any[]) {}
}

// Multiple levels of array nesting
export class C3 {
    constructor(public [[[z]]]: any[]) {}
}

// Mixed array and object nesting
export class C4 {
    constructor(public [{a: [b]}]: any[]) {}
}

// Object with nested array
export class C5 {
    constructor(public {prop: [c]}: any) {}
}

// Object with multiple nested levels
export class C6 {
    constructor(public {prop: {nested: [d]}}: any) {}
}

// Multiple parameters with nested patterns
export class C7 {
    constructor(
        public [[e]]: any[],
        public [{f}]: any[]
    ) {}
}

// Nested pattern with rest element
export class C8 {
    constructor(public [[g, ...rest]]: any[]) {}
}

// Complex nested pattern
export class C9 {
    constructor(public [[h, i], {j, k: [l]}]: any) {}
}


//// [declarationEmitNestedBindingPattern.js]
// Nested array binding pattern
export class C1 {
    constructor([[x]]) {
    }
}
// Nested object binding pattern
export class C2 {
    constructor([{ y }]) {
    }
}
// Multiple levels of array nesting
export class C3 {
    constructor([[[z]]]) {
    }
}
// Mixed array and object nesting
export class C4 {
    constructor([{ a: [b] }]) {
    }
}
// Object with nested array
export class C5 {
    constructor({ prop: [c] }) {
    }
}
// Object with multiple nested levels
export class C6 {
    constructor({ prop: { nested: [d] } }) {
    }
}
// Multiple parameters with nested patterns
export class C7 {
    constructor([[e]], [{ f }]) {
    }
}
// Nested pattern with rest element
export class C8 {
    constructor([[g, ...rest]]) {
    }
}
// Complex nested pattern
export class C9 {
    constructor([[h, i], { j, k: [l] }]) {
    }
}


//// [declarationEmitNestedBindingPattern.d.ts]
export declare class C1 {
    x: any;
    constructor([[x]]: any[]);
}
export declare class C2 {
    y: any;
    constructor([{ y }]: any[]);
}
export declare class C3 {
    z: any;
    constructor([[[z]]]: any[]);
}
export declare class C4 {
    b: any;
    constructor([{ a: [b] }]: any[]);
}
export declare class C5 {
    c: any;
    constructor({ prop: [c] }: any);
}
export declare class C6 {
    d: any;
    constructor({ prop: { nested: [d] } }: any);
}
export declare class C7 {
    e: any;
    f: any;
    constructor([[e]]: any[], [{ f }]: any[]);
}
export declare class C8 {
    g: any;
    rest: any;
    constructor([[g, ...rest]]: any[]);
}
export declare class C9 {
    h: any;
    i: any;
    j: any;
    l: any;
    constructor([[h, i], { j, k: [l] }]: any);
}
