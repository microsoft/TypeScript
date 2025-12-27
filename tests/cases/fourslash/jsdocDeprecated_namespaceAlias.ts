/// <reference path="fourslash.ts" />

// @Filename: /example.ts
//// export type Bar = string | number;
//// /** @deprecated */
//// export type Baz = string | number;

// @Filename: /foo.ts
//// import * as example from './example';
////
//// export namespace JSX {
////     /** @deprecated */
////     export type Foo = string | number;
////
////     /** @deprecated */
////     export import Bar = example.Bar;
////
////     export import Baz = example.Baz;
//// }
////
//// export type X = JSX.[|Foo|];   // Should be deprecated (Foo itself is deprecated)
//// export type Y = JSX.[|Bar|];   // Should be deprecated (Bar alias is deprecated)
//// export type Z = JSX.[|Baz|];   // Should be deprecated (example.Baz is deprecated)

goTo.file('/foo.ts');
const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "message": "'Foo' is deprecated.",
        "code": 6385,
        "range": ranges[0],
        "reportsDeprecated": true,
    },
    {
        "message": "'Bar' is deprecated.",
        "code": 6385,
        "range": ranges[1],
        "reportsDeprecated": true,
    },
    {
        "message": "'Baz' is deprecated.",
        "code": 6385,
        "range": ranges[2],
        "reportsDeprecated": true,
    },
]);
