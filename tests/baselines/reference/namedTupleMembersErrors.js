//// [namedTupleMembersErrors.ts]
export type Segment1 = [length: number, number]; // partially named, disallowed

export type List = [item: any, ...any];  // partially named, disallowed

export type Pair = [item: any, any?];  // partially named, disallowed

export type Opt = [element: string?]; // question mark on element disallowed

export type Trailing = [first: string, rest: ...string[]]; // dots on element disallowed

export type OptTrailing = [first: string, rest: ...string[]?]; // dots+question on element disallowed

export type OptRest = [first: string, ...rest?: string[]]; // rest+optional disallowed

export type NonArrayRest = [first: string, ...rest: number]; // non-arraylike rest, disallowed


//// [namedTupleMembersErrors.js]
"use strict";
exports.__esModule = true;


//// [namedTupleMembersErrors.d.ts]
export declare type Segment1 = [length: number, number];
export declare type List = [item: any, ...any];
export declare type Pair = [item: any, any?];
export declare type Opt = [element: string?];
export declare type Trailing = [first: string, rest: ...string[]];
export declare type OptTrailing = [first: string, rest: ...?string[]];
export declare type OptRest = [first: string, ...rest?: string[]];
export declare type NonArrayRest = [first: string, ...rest: number];
