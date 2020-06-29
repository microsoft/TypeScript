///<reference path="fourslash.ts" />

// @Filename: a.ts
//// export namespace foo {
////     /** @deprecated */
////     export function faff () { }
////     [|faff()|]
//// }
//// const [|a|] = [|foo.faff()|]
//// foo[[|"faff"|]]
//// const { [|faff|] } = foo
//// [|faff()|]
//// /** @deprecated */
//// export function bar () {
////     [|foo?.faff()|]
//// }
//// [|foo?.["faff"]?.()|]
//// [|bar()|];
//// /** @deprecated */
//// export interface Foo {
////     /** @deprecated */
////     zzz: number
//// }
//// /** @deprecated */
//// export type QW = [|Foo|][[|"zzz"|]]
//// export type WQ = [|QW|]

// @Filename: b.ts
//// import * as f from './a';
//// import { [|bar|], [|QW|] } from './a';
//// [|f.bar()|];
//// [|f.foo.faff()|];
//// [|bar()|];
//// type Z = [|QW|];
//// type A = f.[|Foo|];
//// type B = f.[|QW|];
//// type C = f.WQ;
//// type [|O|] = Z | A | B | C;

goTo.file('a.ts')
const ranges = test.ranges();

verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'(): void' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[0]
    },
    {
        "code": 6133,
        "message": "'a' is declared but its value is never read.",
        "reportsUnnecessary": true,
        "range": ranges[1]
    },
    {
        "code": 6385,
        "message": "'(): void' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[2]
    },
    {
        "code": 6385,
        "message": "'faff' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[3]
    },
    {
        "code": 6385,
        "message": "'faff' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[4]
    },
    {
        "code": 6385,
        "message": "'(): void' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[5]
    },
    {
        "code": 6385,
        "message": "'(): void' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[6]
    },
    {
        "code": 6385,
        "message": "'(): void' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[7]
    },
    {
        "code": 6385,
        "message": "'(): void' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[8]
    },
    {
        "code": 6385,
        "message": "'Foo' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[9]
    },
    {
        "code": 6385,
        "message": "'zzz' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[10]
    },
    {
        "code": 6385,
        "message": "'QW' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[11]
    },
]);

goTo.file('b.ts')
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'bar' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[12]
    },
    {
        "code": 6385,
        "message": "'QW' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[13]
    },
    {
        "code": 6385,
        "message": "'(): void' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[14]
    },
    {
        "code": 6385,
        "message": "'(): void' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[15]
    },
    {
        "code": 6385,
        "message": "'(): void' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[16]
    },
    {
        "code": 6385,
        "message": "'QW' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[17]
    },
    {
        "code": 6385,
        "message": "'Foo' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[18]
    },
    {
        "code": 6385,
        "message": "'QW' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[19]
    },
    {
        "code": 6196,
        "message": "'O' is declared but never used.",
        "reportsUnnecessary": true,
        "range": ranges[20]
    }
])
