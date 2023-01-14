////function foo(x: number): number {
////    return x!;
////}
////const a = 2;
////a?.toString!.call(2);

verify.codeFix({
    description: ts.Diagnostics.Remove_unnecessary_type_assertion.message,
    index: 0,
    newFileContent: `function foo(x: number): number {
    return x;
}
const a = 2;
a?.toString!.call(2);`
});

verify.codeFixAll({
    fixAllDescription: ts.Diagnostics.Remove_all_unnecessary_type_assertions.message,
    fixId: "removeUnnecessaryTypeAssertion",
    newFileContent: `function foo(x: number): number {
    return x;
}
const a = 2;
a?.toString.call(2);`
});