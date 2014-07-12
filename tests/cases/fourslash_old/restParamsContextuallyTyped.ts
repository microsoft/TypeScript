/// <reference path='fourslash.ts' />

////var foo: Function = function (/*1*/a, /*2*/b, /*3*/c) { };

goTo.marker('1');
verify.quickInfoIs('any', "", "a", "parameter");
goTo.marker('2');
verify.quickInfoIs('any', "", "b", "parameter");
goTo.marker('3');
verify.quickInfoIs('any', "", "c", "parameter");
