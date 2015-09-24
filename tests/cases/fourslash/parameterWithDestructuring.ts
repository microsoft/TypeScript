/// <reference path='fourslash.ts'/>

////const result = [{ foo: 'hello' }]
////    .map(({ /*1*/foo }) => /*2*/foo)
////    .map(foo => foo);

goTo.marker('1');
verify.quickInfoIs('var foo: string');

goTo.marker('2');
verify.quickInfoIs('var foo: string');
