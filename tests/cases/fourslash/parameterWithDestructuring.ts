/// <reference path='fourslash.ts'/>

// Repros from issues #4949 and #4818

////const result = [{ foo: 'hello' }]
////    .map(({ /*1*/foo }) => /*2*/foo)
////    .map(foo => foo);
////
////const f = (foo: (bar: string[]) => void) => { };
////
////f(([a, b]) => {
////    /*3*/a.charAt(0); // Not okay: inferred as `any`
////});

goTo.marker('1');
verify.quickInfoIs('var foo: string');

goTo.marker('2');
verify.quickInfoIs('var foo: string');

goTo.marker('3');
verify.quickInfoIs('var a: string');
