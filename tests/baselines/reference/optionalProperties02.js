//// [tests/cases/conformance/types/typeRelationships/comparable/optionalProperties02.ts] ////

//// [optionalProperties02.ts]
interface Foo {
    a?: string;
    b: string;
}

<Foo>{ a: undefined };

//// [optionalProperties02.js]
({ a: undefined });


//// [optionalProperties02.d.ts]
interface Foo {
    a?: string;
    b: string;
}
