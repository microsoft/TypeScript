/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export type A = number;
////export const A = 42;
////export type B = number;
////export const B = 42;
////
////type C = number;
////const C = 42;
////export type { C };
////type D = number;
////const D = 42;
////export { type D ];

// @Filename: /b.ts
////import type { A/*1*/ } from './a';
////import { type B/*2*/ } from './a';
////import { C/*3*/, D/*4*/ } from './a';
////export type { A/*5*/ } from './a';
////export { type B/*6*/ } from './a';
////export { C/*7*/, D/*8*/ } from './a';

verify.quickInfoAt("1", [
  "(alias) type A = number",
  "(alias) const A: 42",
  "import A",
].join("\n"));

verify.quickInfoAt("2", [
  "(alias) type B = number",
  "(alias) const B: 42",
  "import B",
].join("\n"));

verify.quickInfoAt("3", [
  "(alias) type C = number",
  "(alias) const C: 42",
  "import C",
].join("\n"));

verify.quickInfoAt("4", [
  "(alias) type D = number",
  "(alias) const D: 42",
  "import D",
].join("\n"));

verify.quickInfoAt("5", [
  "(alias) type A = number",
  "(alias) const A: 42",
  "export A",
].join("\n"));

verify.quickInfoAt("6", [
  "(alias) type B = number",
  "(alias) const B: 42",
  "export B",
].join("\n"));

verify.quickInfoAt("7", [
  "(alias) type C = number",
  "(alias) const C: 42",
  "export C",
].join("\n"));

verify.quickInfoAt("8", [
  "(alias) type D = number",
  "(alias) const D: 42",
  "export D",
].join("\n"));

