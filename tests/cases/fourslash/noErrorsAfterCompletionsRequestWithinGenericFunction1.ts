///<reference path="fourslash.ts"/>
// @strict: true
////
//// declare function func<T extends { foo: 1 }>(arg: T): void;
//// func({ foo: 1, bar/*1*/: 1 });

goTo.marker("1");
verify.completions({ exact: undefined });
verify.noErrors();
