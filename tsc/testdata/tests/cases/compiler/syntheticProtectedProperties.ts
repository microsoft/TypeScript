// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63749

declare class Dummy {
    a: number;
}

type Public = Base | Dummy;

declare class Base {
    protected get content(): string;
    protected set content(value: string);
}

declare class Mock {
    get content(): string;
    set content(value: string);
}

declare const w: Public
if (w instanceof Mock) {
    w.content;
}
declare const w2: Mock & Public
w2.content;

declare const w3: Public & Mock
w3.content;

// private/protected set accessors are tracked in unions and intersections

declare class C1 {
    get foo(): number;
    set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C3 {
    protected get foo(): number;
    protected set foo(value: number);
}

// Unions properties have most restricted accessibility

declare const cu12: C1 | C2;
cu12.foo;
cu12.foo = 123;  // Error

declare const cu13: C1 | C3;
cu13.foo;  // Error
cu13.foo = 123;  // Error

declare const cu22: C2 | C3;
cu13.foo;  // Error
cu13.foo = 123;  // Error

// Intersection properties have most permissive accessibility

declare const ci12: C1 & C2;
ci12.foo;
ci12.foo = 123;

declare const ci13: C1 & C3;
ci12.foo;
ci12.foo = 123;

declare const ci23: C2 & C3;
ci23.foo;
ci23.foo = 123;  // Error
