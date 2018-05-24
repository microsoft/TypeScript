/// <reference path='fourslash.ts'/>

// @checkJs: true
// @allowJs: true

// @Filename: main.js
////function allOptional() { arguments; }
////allOptional(/*1*/);
////allOptional(1, 2, 3);
////function someOptional(x, y) { arguments; }
////someOptional(/*2*/);
////someOptional(1, 2, 3);
////someOptional(); // no error here; x and y are optional in JS

verify.noErrors();
verify.signatureHelp(
    {
        marker: "1",
        text: "allOptional(...args: any[]): void",
        parameterCount: 1,
        parameterName: "args",
        parameterSpan: "...args: any[]",
        isVariadic: true,
    },
    {
        marker: "2",
        text: "someOptional(x: any, y: any, ...args: any[]): void",
        parameterCount: 3,
        parameterName: "x",
        parameterSpan: "x: any",
        isVariadic: true,
    });
