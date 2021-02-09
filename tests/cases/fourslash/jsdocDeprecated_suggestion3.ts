///<reference path="fourslash.ts" />

//// // merges
//// /** @deprecated */
//// interface a { a: number }
//// declare function a(): void
//// declare const ta: [|a|]
//// a;
//// a();

//// interface b { a: number; }
//// /** @deprecated */
//// declare function b(): void
//// declare const tb: b;
//// [|b|]
//// [|b|]();

//// interface c { }
//// /** @deprecated */
//// declare function c(): void
//// declare function c(a: number): void
//// declare const tc: c;
//// c;
//// [|c|]();
//// c(1);

//// /** @deprecated */
//// interface d { }
//// declare function d(): void
//// declare function d(a: number): void
//// declare const td: [|d|];
//// d;
//// d();
//// d(1);

//// /** @deprecated */
//// declare function e(): void
//// /** @deprecated */
//// declare function e(a: number): void
//// [|e|];
//// [|e|]();
//// [|e|](1);

//// /** @deprecated */
//// interface f { a: number }
//// declare const tf: [|f|]

//// /** @deprecated */
//// type g = number
//// declare const tg: [|g|]

//// /** @deprecated */
//// class H { }
//// declare const th: [|H|]

const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        message: "'a' is deprecated.",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    },
    {
        message: "'b' is deprecated.",
        code: 6385,
        range: ranges[1],
        reportsDeprecated: true,
    },
    {
        message: "The signature '(): void' of 'b' is deprecated.",
        code: 6387,
        range: ranges[2],
        reportsDeprecated: true,
    },
    {
        message: "The signature '(): void' of 'c' is deprecated.",
        code: 6387,
        range: ranges[3],
        reportsDeprecated: true,
    },
    {
        message: "'d' is deprecated.",
        code: 6385,
        range: ranges[4],
        reportsDeprecated: true,
    },
    {
        message: "'e' is deprecated.",
        code: 6385,
        range: ranges[5],
        reportsDeprecated: true,
    },
    {
        message: "The signature '(): void' of 'e' is deprecated.",
        code: 6387,
        range: ranges[6],
        reportsDeprecated: true,
    },
    {
        message: "The signature '(a: number): void' of 'e' is deprecated.",
        code: 6387,
        range: ranges[7],
        reportsDeprecated: true,
    },
    {
        message: "'f' is deprecated.",
        code: 6385,
        range: ranges[8],
        reportsDeprecated: true,
    },
    {
        message: "'g' is deprecated.",
        code: 6385,
        range: ranges[9],
        reportsDeprecated: true,
    },
    {
        message: "'H' is deprecated.",
        code: 6385,
        range: ranges[10],
        reportsDeprecated: true,
    },
])
