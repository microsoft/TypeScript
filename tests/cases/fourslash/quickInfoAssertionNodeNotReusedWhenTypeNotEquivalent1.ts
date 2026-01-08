/// <reference path="fourslash.ts" />

// https://github.com/microsoft/TypeScript/issues/60573

// @strict: true

//// type Wrapper<T> = {
////   _type: T;
//// };
////
//// function stringWrapper(): Wrapper<string> {
////   return { _type: "" };
//// }
////
//// function objWrapper<T extends Record<string, Wrapper<any>>>(
////   obj: T,
//// ): Wrapper<T> {
////   return { _type: obj };
//// }
////
//// const value = objWrapper({
////   prop1: stringWrapper() as Wrapper<"hello">,
//// });
////
//// type Unwrap<T extends Wrapper<any>> = T["_type"] extends Record<
////   string,
////   Wrapper<any>
//// >
////   ? { [Key in keyof T["_type"]]: Unwrap<T["_type"][Key]> }
////   : T["_type"];
////
//// type Test/*1*/ = Unwrap<typeof value>;

verify.quickInfoAt("1", `type Test = {
    prop1: "hello";
}`)
