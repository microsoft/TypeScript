/// <reference path="fourslash.ts" />
// @target: esnext

// @Filename: /a.ts
/////**
//// * A function that gets the length of an array.
//// * @param testParam
//// * @deprecated Use the new method instead.
//// */
////export function getArrayLength(arr: string[]): number;
////export function getArrayLength(arr: boolean[]): number;

// @Filename: /b.ts
////import { getArrayLength } from "/a";
/////*1*/getArrayLength(["hello"]);
/////*2*/getArrayLength([true]);
/////*3*/getArrayLength(["hello"]);


goTo.file("/b.ts");
goTo.marker("1")
verify.quickInfoIs("(alias) getArrayLength(arr: string[]): number (+1 overload)\nimport getArrayLength", "A function that gets the length of an array.", [{name: "param", text: "testParam"}, {name: "deprecated", text: "Use the new method instead."}])
goTo.marker("2")
verify.quickInfoIs("(alias) getArrayLength(arr: boolean[]): number (+1 overload)\nimport getArrayLength", "A function that gets the length of an array.", [{name: "param", text: "testParam"}])
goTo.marker("3")
verify.quickInfoIs("(alias) getArrayLength(arr: string[]): number (+1 overload)\nimport getArrayLength", "A function that gets the length of an array.", [{name: "param", text: "testParam"}, {name: "deprecated", text: "Use the new method instead."}])