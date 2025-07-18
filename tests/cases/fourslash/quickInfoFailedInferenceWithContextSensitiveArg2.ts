/// <reference path='fourslash.ts' />

//// declare function f1<T extends string>(
////   keys: T[],
//// ): <T2 extends object>(handlers: { [P in keyof T2 & T]: (arg: P) => void }) => [
////   T,
////   T2,
//// ];
////
//// const partialResult1 = f1(["foo"]);
////
//// const result1 = /*1*/partialResult1({
////   foo: (key) => {},
////   [|bar|]: (key) => {},
//// });
////
//// declare function f2<T extends string>(
////   keys: T[],
//// ): <T2 extends {}>(handlers: { [P in keyof T2 & T]: (arg: P) => void }) => [
////   T,
////   T2,
//// ];
////
//// const partialResult2 = f2(["foo"]);
////
//// const result2 = /*2*/partialResult2({
////   foo: (key) => {},
////   [|bar|]: (key) => {},
//// });

verify.quickInfoAt("1", `const partialResult1: <{
    foo: unknown;
}>(handlers: {
    foo: (arg: "foo") => void;
}) => ["foo", {
    foo: unknown;
}]`);
verify.quickInfoAt("2", `const partialResult2: <{
    foo: unknown;
}>(handlers: {
    foo: (arg: "foo") => void;
}) => ["foo", {
    foo: unknown;
}]`);

const [r1, r2] = test.ranges();

verify.getSemanticDiagnostics([{
    message: "Object literal may only specify known properties, and 'bar' does not exist in type '{ foo: (arg: \"foo\") => void; }'.",
    code: ts.Diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1.code,
    range: r1,
}, {
    message: "Object literal may only specify known properties, and 'bar' does not exist in type '{ foo: (arg: \"foo\") => void; }'.",
    code: ts.Diagnostics.Object_literal_may_only_specify_known_properties_and_0_does_not_exist_in_type_1.code,
    range: r2,
}]);
