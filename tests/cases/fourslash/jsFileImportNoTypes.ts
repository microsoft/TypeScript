/// <reference path="fourslash.ts" />

// @allowJs: true

// @filename: /declarations.ts
//// export class TestClass {}
//// export const testValue = {};
//// export enum TestEnum {}
//// export function testFunction() {}
//// export interface testInterface {}
//// export namespace TestNamespace {}
//// export type testType = {};
////
//// export interface TestInterfaceMerged {}
//// export interface TestInterfaceMerged {}
////
//// export interface TestClassInterfaceMerged {}
//// export class TestClassInterfaceMerged {}

// @filename: /a.js
////import { /**/ } from './declarations.ts'

verify.baselineCompletions();
