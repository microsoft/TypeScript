// @declaration: true

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
