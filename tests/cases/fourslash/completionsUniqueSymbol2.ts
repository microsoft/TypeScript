/// <reference path="fourslash.ts" />

////const a = {
////    KEY_1: 'key_1',
////    KEY_2: 'key_2',
////    KEY_3: 'key_3',
////} as const;
////
////const b = {
////    KEY_1: 'key_1',
////    KEY_2: 'key_2',
////    KEY_3: 'key_3',
////} as const;
////
////interface I {
////    [b.KEY_1]: string,
////    [a.KEY_2]: string,
////    [a.KEY_3]: string
////}
////
////const foo: I = {
////    key_1: 'value_1',
////    key_2: 'value_2',
////    key_3: 'value_3',
////}
////
////foo./**/

verify.baselineCompletions({
    includeCompletionsWithInsertText: true,
});
