/// <reference path="fourslash.ts" />

////const foo = <T>(x: T): string => {
////    await new Promise(resolve => resolve(true));
////    return "";
////}

verify.codeFix({
    description: ts.Diagnostics.Add_async_modifier_to_containing_function.message,
    index: 0,
    newFileContent:
`const foo = async <T>(x: T): Promise<string> => {
    await new Promise(resolve => resolve(true));
    return "";
}`
});
