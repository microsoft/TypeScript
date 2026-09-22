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

declare class P1 {
    get foo(): number;
    set foo(value: number);
}

declare class P2 {
    get foo(): number;
    private set foo(value: number);
}

declare class P3 {
    private get foo(): number;
    private set foo(value: number);
}

// Unions properties have most restricted accessibility

declare const cu12: C1 | C2;
cu12.foo;
cu12.foo = 123;  // Error, protected

declare const cu13: C1 | C3;
cu13.foo;  // Error, no property
cu13.foo = 123;  // Error, no property

declare const cu23: C2 | C3;
cu23.foo;  // Error, no property
cu23.foo = 123;  // Error, no property

declare const pu12: P1 | P2;
pu12.foo;
pu12.foo = 123;  // Error, private

declare const pu13: P1 | P3;
pu13.foo;  // Error, no property
pu13.foo = 123;  // Error, no property

declare const pu23: P2 | P3;
pu23.foo;  // Error, no property
pu23.foo = 123;  // Error, no property

// Intersection properties have most permissive accessibility

declare const ci12: C1 & C2;
ci12.foo;
ci12.foo = 123;

declare const ci13: C1 & C3;
ci13.foo;
ci13.foo = 123;

declare const ci23: C2 & C3;
ci23.foo;
ci23.foo = 123;  // Error, protected

declare const pi12: P1 & P2;
pi12.foo;
pi12.foo = 123;

declare const pi13: P1 & P3;
pi13.foo;  // Error, reduced to never
pi13.foo = 123;  // Error, reduced to never

declare const pi23: P2 & P3;
pi23.foo;  // Error, reduced to never
pi23.foo = 123;  // Error, reduced to never
