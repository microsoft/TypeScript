////function foo(x: number): number {
////    return x!;
////}
////const a = 2;
////a?.toString!.call(2);

verify.codeFix({
    description: ts.Diagnostics.Remove_unnecessary_type_cast.message,
    index: 0,
    newFileContent: `function foo(x: number): number {
    return x;
}
const a = 2;
a?.toString!.call(2);`
});

verify.codeFixAll({
    fixAllDescription: ts.Diagnostics.Remove_all_unnecessary_type_casts.message,
    fixId: "removeUnnecessaryCast",
    newFileContent: `function foo(x: number): number {
    return x;
}
const a = 2;
a?.toString.call(2);`
});