///<reference path="fourslash.ts" />

// @allowJs: true

// @Filename: a.ts
//// /**
////  * /*b*/
////  */
//// function bb(b: string) {}

// @Filename: b.js
//// /**
////  * /*jb*/
////  */
//// function bb(b) {}
////
//// /**
////  * 
////  * @p/*jc*/
////  */
//// function cc({ b: { a, c } = { a: 1, c: 3 } }) {
////
//// }
////
//// /**
////  * 
////  * @p/*jd*/
////  */
//// function dd(...a) {}
////
//// /**
////  * @p/*z*/
////  */
//// function zz(a = 3) {}


verify.baselineCompletions({
    includeCompletionsWithSnippetText: true,
});