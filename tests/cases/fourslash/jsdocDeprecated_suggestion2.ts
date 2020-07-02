///<reference path="fourslash.ts" />

//// // overloads
//// declare function foo(a: string): number;
//// /** @deprecated */
//// declare function foo(): undefined;
//// declare function foo (a?: string): number | undefined;
//// [|foo()|];
//// foo('');
//// foo;

//// /** @deprecated */
//// declare function bar(): number;
//// [|bar()|];
//// [|bar|];

//// /** @deprecated */
//// declare function baz(): number;
//// /** @deprecated */
//// declare function baz(): number | undefined;
//// [|baz()|];
//// [|baz|];

//// interface Foo {
////     /** @deprecated */
////     (): void
////     (a: number): void
//// }
//// declare const f: Foo;
//// [|f()|];
//// f(1);

//// interface T {
////     createElement(): void
////     /** @deprecated */
////     createElement(tag: 'xmp'): void;
//// }
//// declare const t: T;
//// t.createElement();
//// [|t.createElement('xmp')|];

//// declare class C {
////     /** @deprecated */
////     constructor ();
////     constructor(v: string)
//// }
//// C;
//// const c = [|new C()|];

//// interface Ca {
////     /** @deprecated */
////     (): void
////     new (): void
//// }
//// interface Cb {
////     (): void
////     /** @deprecated */
////     new (): string
//// }
//// declare const ca: Ca;
//// declare const cb: Cb;
//// ca;
//// cb;
//// [|ca()|];
//// cb();
//// new ca();
//// [|new cb()|];

const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        message: "'(): undefined' is deprecated",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    },
    {
        message: "'(): number' is deprecated",
        code: 6385,
        range: ranges[1],
        reportsDeprecated: true,
    },
    {
        message: "'bar' is deprecated",
        code: 6385,
        range: ranges[2],
        reportsDeprecated: true,
    },
    {
        message: "'(): number' is deprecated",
        code: 6385,
        range: ranges[3],
        reportsDeprecated: true,
    },
    {
        message: "'baz' is deprecated",
        code: 6385,
        range: ranges[4],
        reportsDeprecated: true,
    },
    {
        message: "'(): void' is deprecated",
        code: 6385,
        range: ranges[5],
        reportsDeprecated: true,
    },
    {
        message: `'(tag: "xmp"): void' is deprecated`,
        code: 6385,
        range: ranges[6],
        reportsDeprecated: true,
    },
    {
        message: `'(): C' is deprecated`,
        code: 6385,
        range: ranges[7],
        reportsDeprecated: true,
    },
    {
        message: `'(): void' is deprecated`,
        code: 6385,
        range: ranges[8],
        reportsDeprecated: true,
    },
    {
        message: `'(): string' is deprecated`,
        code: 6385,
        range: ranges[9],
        reportsDeprecated: true,
    },
])
