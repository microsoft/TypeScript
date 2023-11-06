//// [tests/cases/conformance/parser/ecmascript5/IndexSignatures/parserIndexSignature11.ts] ////

//// [parserIndexSignature11.ts]
interface I {
        [p]; // Used to be indexer, now it is a computed property
        [p1: string];
        [p2: string, p3: number];
}

/// [Declarations] ////



//// [/.src/parserIndexSignature11.d.ts]
interface I {
    [p1: string]: any;
    [p2: string, p3: number]: any;
}
/// [Errors] ////

parserIndexSignature11.ts(2,9): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
parserIndexSignature11.ts(2,10): error TS2304: Cannot find name 'p'.
parserIndexSignature11.ts(3,9): error TS1021: An index signature must have a type annotation.
parserIndexSignature11.ts(4,10): error TS1096: An index signature must have exactly one parameter.


==== parserIndexSignature11.ts (4 errors) ====
    interface I {
            [p]; // Used to be indexer, now it is a computed property
            ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
             ~
!!! error TS2304: Cannot find name 'p'.
            [p1: string];
            ~~~~~~~~~~~~~
!!! error TS1021: An index signature must have a type annotation.
            [p2: string, p3: number];
             ~~
!!! error TS1096: An index signature must have exactly one parameter.
    }