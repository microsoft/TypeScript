/// <reference path='fourslash.ts'/>

////[[{foo: 'hello', bar: [1]}]]
////  .map(([{foo, bar: [baz]}]) => /*1*/foo + /*2*/baz);

goTo.marker('1');
verify.quickInfoIs('var foo: string');

goTo.marker('2');
verify.quickInfoIs('var baz: number');
