/// <reference path="fourslash.ts" />
////interface Stuff {
////    b: () => Promise<string>;
////}
////
////function foo(): Stuff | Date {
////    return {
////        b: _ => "hello",
////    }
////}

verify.codeFix({
    description: ts.Diagnostics.Add_async.message,
    index: 0,
    newFileContent:
`interface Stuff {
    b: () => Promise<string>;
}

function foo(): Stuff | Date {
    return {
        b: async (_) => "hello",
    }
}`
  });
  