/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /node_modules/@types/abs/index.d.ts
////declare function abs(str: string): string;
////export = abs;

// @Filename: /a.js
////import * as abs from "abs";
////abs/**/;

goTo.marker();
edit.insert('(');
verify.signatureHelp({ text: "abs(str: string): string" });
