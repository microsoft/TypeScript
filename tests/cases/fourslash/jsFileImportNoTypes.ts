/// <reference path="fourslash.ts" />

// @allowJs: true

// @filename: /declarations.ts
//// export class TestClass {}
//// export const testValue = {};
//// export enum TestEnum {}
//// export function testFunction() {}
//// export interface testInterface {}
//// export namespace TestNamespaceEmpty {}
//// export namespace TestNamespaceWithType {
////   export type testTypeInner = boolean;
//// }
//// export namespace TestNamespaceWithValue {
////   export const testValueInner = true;
//// }
//// export type testType = {};
////
//// export interface TestInterfaceMerged {}
//// export interface TestInterfaceMerged {}
////
//// export interface TestClassInterfaceMerged {}
//// export class TestClassInterfaceMerged {}
////
//// export declare const declaredVariable: number;
//// export declare class DeclaredClass {}
//// export declare interface DeclaredInterface {}
//// export declare type DeclaredType = {};

// @filename: /a.js
////import { /**/ } from './declarations.ts'

verify.baselineCompletions();
