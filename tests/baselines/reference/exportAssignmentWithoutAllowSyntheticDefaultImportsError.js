//// [tests/cases/compiler/exportAssignmentWithoutAllowSyntheticDefaultImportsError.ts] ////

//// [bar.ts]
export = bar;
function bar() {}

//// [foo.ts]
import bar from './bar';

//// [bar.js]
function bar() { }
export {};
//// [foo.js]
export {};
