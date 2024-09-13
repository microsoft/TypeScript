/// <reference path="./fourslash.ts"/>

// @strict: true
// @exactOptionalPropertyTypes: true

// https://github.com/microsoft/TypeScript/issues/59948

//// type OptionalToUnionWithUndefined<T> = {
////   [K in keyof T]: T extends Record<K, T[K]> ? T[K] : T[K] | undefined;
//// };
////
//// type Intermidiate/*1*/ = OptionalToUnionWithUndefined<{ a?: string }>;
//// type Literal/*2*/ = { a?: string | undefined };
////
//// type Res1/*3*/ = Required<Intermidiate>;
//// type Res2/*4*/ = Required<Literal>;

verify.quickInfoAt("1", `type Intermidiate = {
    a?: string | undefined;
}`);
verify.quickInfoAt("2", `type Literal = {
    a?: string | undefined;
}`);
verify.quickInfoAt("3", `type Res1 = {
    a: string | undefined;
}`);
verify.quickInfoAt("4", `type Res2 = {
    a: string | undefined;
}`);
