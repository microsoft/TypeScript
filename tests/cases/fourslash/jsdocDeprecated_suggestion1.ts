///<reference path="fourslash.ts" />
// @experimentalDecorators: true

// @Filename: a.ts
//// export namespace foo {
////     /** @deprecated */
////     export function faff () { }
////     [|faff|]()
//// }
//// const [|a|] = foo.[|faff|]()
//// foo[[|"faff"|]]
//// const { [|faff|] } = foo
//// [|faff|]()
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
//// class C {
////     /** @deprecated */
////     constructor() {
////     }
////     /** @deprecated */
////     m() { }
//// }
//// /** @deprecated */
//// class D {
////     constructor() {
////     }
//// }
//// var c = new [|C|]()
//// c.[|m|]()
//// c.[|m|]
//// new [|D|]()
//// C
//// [|D|]
// @Filename: j.tsx
//// type Props = { someProp?: any }
//// declare var props: Props
//// /** @deprecated */
//// function Compi(_props: Props) {
////     return <div></div>
//// }
//// [|Compi|];
//// <[|Compi|] />;
//// <[|Compi|] {...props}><div></div></[|Compi|]>;
//// /** @deprecated */
//// function ttf(_x: unknown) {
//// }
//// [|ttf|]``
//// [|ttf|]
//// /** @deprecated */
//// function dec(_c: unknown) { }
//// [|dec|]
//// @[|dec|]
//// class K { }

// @Filename: b.ts
//// // imports and aliases
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
        "code": 6387,
        "message": "The signature '(): void' of 'faff' is deprecated.",
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
        "code": 6387,
        "message": "The signature '(): void' of 'foo.faff' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[2]
    },
    {
        "code": 6385,
        "message": "'faff' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[3]
    },
    {
        "code": 6385,
        "message": "'faff' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[4]
    },
    {
        "code": 6387,
        "message": "The signature '(): void' of 'faff' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[5]
    },
    {
        "code": 6387,
        "message": "The signature '(): void' of 'foo.faff' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[6]
    },
    {
        "code": 6387,
        "message": "The signature '(): void' of 'foo.faff' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[7]
    },
    {
        "code": 6387,
        "message": "The signature '(): void' of 'bar' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[8]
    },
    {
        "code": 6385,
        "message": "'Foo' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[9]
    },
    {
        "code": 6385,
        "message": "'zzz' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[10]
    },
    {
        "code": 6385,
        "message": "'QW' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[11]
    },
    {
        "code": 6387,
        "message": "The signature '(): C' of 'C' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[12]
    },
    {
        "code": 6387,
        "message": "The signature '(): void' of 'c.m' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[13]
    },
    {
        "code": 6385,
        "message": "'m' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[14]
    },
    {
        "code": 6385,
        "message": "'D' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[15]
    },
    {
        "code": 6385,
        "message": "'D' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[16]
    },
]);

goTo.file('j.tsx')
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'Compi' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[17]
    },
    {
        "code": 6387,
        "message": "The signature '(_props: Props): any' of 'Compi' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[18]
    },
    {
        "code": 6387,
        "message": "The signature '(_props: Props): any' of 'Compi' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[19]
    },
    {
        "code": 6385,
        "message": "'Compi' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[20]
    },
    {
        "code": 6387,
        "message": "The signature '(_x: unknown): void' of 'ttf' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[21]
    },
    {
        "code": 6385,
        "message": "'ttf' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[22]
    },
    {
        "code": 6385,
        "message": "'dec' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[23]
    },
    {
        "code": 6387,
        "message": "The signature '(_c: unknown): void' of 'dec' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[24]
    },
]);
goTo.file('b.ts')
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'bar' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[25]
    },
    {
        "code": 6385,
        "message": "'QW' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[26]
    },
    {
        "code": 6387,
        "message": "The signature '(): void' of 'f.bar' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[27]
    },
    {
        "code": 6387,
        "message": "The signature '(): void' of 'f.foo.faff' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[28]
    },
    {
        "code": 6387,
        "message": "The signature '(): void' of 'bar' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[29]
    },
    {
        "code": 6385,
        "message": "'QW' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[30]
    },
    {
        "code": 6385,
        "message": "'Foo' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[31]
    },
    {
        "code": 6385,
        "message": "'QW' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[32]
    },
    {
        "code": 6196,
        "message": "'O' is declared but never used.",
        "reportsUnnecessary": true,
        "range": ranges[33]
    }
])
