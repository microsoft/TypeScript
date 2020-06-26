///<reference path="fourslash.ts" />

//// /** @deprecated */
//// interface f { a: number }
//// declare function f(): void
//// declare const tf: [|f|]
//// f;
//// f();

//// interface b { a: number; }
//// /** @deprecated */
//// declare function b(): void
//// declare const tb: b;
//// b
//// [|b()|];

//// interface c { }
//// /** @deprecated */
//// declare function c(): void
//// declare function c(a: number): void
//// declare const tc: c;
//// c;
//// [|c()|];
//// c(1);

//// /** @deprecated */
//// interface d { }
//// declare function d(): void
//// declare function d(a: number): void
//// declare const td: [|d|];
//// d;
//// d();
//// d(1);

const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        message: "'f' is deprecated",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    },
    {
        message: "'(): void' is deprecated",
        code: 6385,
        range: ranges[1],
        reportsDeprecated: true,
    },
    {
        message: "'(): void' is deprecated",
        code: 6385,
        range: ranges[2],
        reportsDeprecated: true,
    },
    {
        message: "'d' is deprecated",
        code: 6385,
        range: ranges[3],
        reportsDeprecated: true,
    }
])
