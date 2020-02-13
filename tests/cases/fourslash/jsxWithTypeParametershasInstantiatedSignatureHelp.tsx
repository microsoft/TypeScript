/// <reference path="./fourslash.ts" />

//// declare namespace JSX {
////     interface Element {
////         render(): Element | string | false;
////     }
//// }
////
//// function SFC<T>(_props: Record<string, T>) {
////     return '';
//// }
////
//// (</*1*/SFC/>);
//// (</*2*/SFC<string>/>);

goTo.marker("1");
verify.signatureHelp({ text: "SFC(_props: Record<string, unknown>): string" });
goTo.marker("2");
verify.signatureHelp({ text: "SFC(_props: Record<string, string>): string" });
