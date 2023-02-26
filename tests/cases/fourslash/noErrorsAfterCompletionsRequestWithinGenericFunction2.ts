///<reference path="fourslash.ts"/>
// @strict: true
////
//// // repro from #50818#issuecomment-1278324638
////
//// declare function func<T extends { foo: 1 }>(arg: T): void;
//// func({ foo: 1, bar/*1*/: 1 });

goTo.marker("1");
edit.insert("2");
verify.completions({ exact: undefined });
verify.noErrors();
