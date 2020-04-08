//// [getParameterNameAtPosition.ts]
// Repro from #30171

interface Mock<Y extends any[]> extends Function {
    (...args: Y): any;
}
type Tester = (opts: any, done: (...args: any[]) => any) => any;
declare function cases(tester: Tester): void;
declare function fn<Y extends any[]>(implementation?: (...args: Y) => any): Mock<Y>;
cases(fn(opts => { }));


//// [getParameterNameAtPosition.js]
"use strict";
// Repro from #30171
cases(fn(function (opts) { }));
