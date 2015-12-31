/// <reference path='fourslash.ts'/>

////declare function f<T>(x: T, y: (p: T) => T, z: (p: T) => T): T;
////var /*1*/result = /*2*/f(0, /*3*/x => null, /*4*/x => x.blahblah);

goTo.marker('1');
verify.quickInfoIs('var result: number');
goTo.marker('2');
verify.quickInfoIs('function f<number>(x: number, y: (p: number) => number, z: (p: number) => number): number');
goTo.marker('3');
verify.quickInfoIs('(parameter) x: number');
goTo.marker('4');
verify.quickInfoIs('(parameter) x: number');