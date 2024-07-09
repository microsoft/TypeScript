/// <reference path='fourslash.ts' />

////type Length<T> = T extends ArrayLike<infer U> ? number : never;

verify.codeFix({
    description: "Replace 'infer U' with 'unknown'",
    index: 0,
    newFileContent: "type Length<T> = T extends ArrayLike<unknown> ? number : never;",
});
