// @Filename: a.ts
//// export namespace foo {
////     /** @deprecated */
////     export function faff () { }
////     [|faff|]()
//// }
//// const [|a|] = foo.[|faff|]() 
//// foo[[|"faff"|]]
//// const { [|faff|] } = foo
//// faff()
//// /** @deprecated */
//// export function bar () {
////     foo?.[|faff|]()
//// }
//// foo?.[[|"faff"|]]?.()
//// [|bar|]();
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
//// f.[|bar|]();
//// f.foo.[|faff|]();
//// [|bar|]();
//// type Z = [|QW|];
//// type A = f.[|Foo|];
//// type B = f.[|QW|];
//// type C = f.WQ;
//// type [|O|] = Z | A | B | C;

goTo.file('a.ts')
const ranges = test.ranges();

verify.getSuggestionDiagnostics([
    {
        message: "'faff' is deprecated",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    },
    {
        message: "'a' is declared but its value is never read.",
        code: 6133,
        range: ranges[1],
        reportsUnnecessary: true
    },
    {
        message: "'faff' is deprecated",
        code: 6385,
        range: ranges[2],
        reportsDeprecated: true,
    },
    {
        message: "'faff' is deprecated",
        code: 6385,
        range: ranges[3],
        reportsDeprecated: true,
    },
    {
        message: "'faff' is deprecated",
        code: 6385,
        range: ranges[4],
        reportsDeprecated: true,
    },
    {
        message: "'faff' is deprecated",
        code: 6385,
        range: ranges[5],
        reportsDeprecated: true,
    },
    {
        message: "'faff' is deprecated",
        code: 6385,
        range: ranges[6],
        reportsDeprecated: true,
    },
    {
        message: "'bar' is deprecated",
        code: 6385,
        range: ranges[7],
        reportsDeprecated: true,
    },
    {
        message: "'Foo' is deprecated",
        code: 6385,
        range: ranges[8],
        reportsDeprecated: true,
    },
    {
        message: "'zzz' is deprecated",
        code: 6385,
        range: ranges[9],
        reportsDeprecated: true,
    },
    {
        message: "'QW' is deprecated",
        code: 6385,
        range: ranges[10],
        reportsDeprecated: true,
    }
])

goTo.file('b.ts')
verify.getSuggestionDiagnostics([
    {
        message: "'bar' is deprecated",
        code: 6385,
        range: ranges[11],
        reportsDeprecated: true,
    },
    {
        message: "'QW' is deprecated",
        code: 6385,
        range: ranges[12],
        reportsDeprecated: true,
    },
    {
        message: "'bar' is deprecated",
        code: 6385,
        range: ranges[13],
        reportsDeprecated: true,
    },
    {
        message: "'faff' is deprecated",
        code: 6385,
        range: ranges[14],
        reportsDeprecated: true,
    },
    {
        message: "'bar' is deprecated",
        code: 6385,
        range: ranges[15],
        reportsDeprecated: true,
    },
    {
        message: "'QW' is deprecated",
        code: 6385,
        range: ranges[16],
        reportsDeprecated: true,
    },
    {
        message: "'Foo' is deprecated",
        code: 6385,
        range: ranges[17],
        reportsDeprecated: true,
    },
    {
        message: "'QW' is deprecated",
        code: 6385,
        range: ranges[18],
        reportsDeprecated: true,
    },
    {
        message: "'O' is declared but never used.",
        code: 6196,
        range: ranges[19],
        reportsUnnecessary: true
    }
])