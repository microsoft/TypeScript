/// <reference path="fourslash.ts" />

// @strict: true

// @filename: /bar.ts
////export type Bar = Record<string, string>
////export function bar<T extends Bar>(obj: { prop: T }) {}

// @filename: /foo.ts
////import { bar } from "./bar";
////
////export function f1<T>(x: T) {
////    bar({ prop: x })
////}
////
////function f2<T>(x: T) {
////    const y: `${number}` = x;
////}
////
////interface Fn<T extends string> {}
////function f3<T>(x: Fn<T>) {
////}
////
////function f4<T = `${number}`>(x: T) {
////    const y: `${number}` = x;
////}
////
////interface TypeRef<T extends {}> {
////    x: T
////}
////function f5<T>(): TypeRef</**/T> {
////    throw undefined as any as TypeRef<T>;
////}

goTo.file("/foo.ts");
verify.codeFixAll({
    fixId: "addMissingConstraint",
    fixAllDescription: ts.Diagnostics.Add_extends_constraint_to_all_type_parameters.message,
    newFileContent:
"import { bar } from \"./bar\";\n\n" +

"export function f1<T extends Bar>(x: T) {\n" +
"    bar({ prop: x })\n" +
"}\n\n" +

"function f2<T extends \`${number}\`>(x: T) {\n" +
"    const y: `${number}` = x;\n" +
"}\n\n" +

"interface Fn<T extends string> {}\n" +
"function f3<T extends string>(x: Fn<T>) {\n" +
"}\n\n" +

"function f4<T extends `${number}` = `${number}`>(x: T) {\n" +
"    const y: `${number}` = x;\n" +
"}\n\n" +

"interface TypeRef<T extends {}> {\n" +
"    x: T\n" +
"}\n" +
"function f5<T extends {}>(): TypeRef<T> {\n" +
"    throw undefined as any as TypeRef<T>;\n" +
"}"

});
