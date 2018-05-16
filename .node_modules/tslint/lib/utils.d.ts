/// <reference types="node" />
/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Enforces the invariant that the input is an array.
 */
export declare function arrayify<T>(arg?: T | T[]): T[];
/**
 * @deprecated (no longer used)
 * Enforces the invariant that the input is an object.
 */
export declare function objectify(arg: any): any;
export declare function hasOwnProperty(arg: {}, key: string): boolean;
/**
 * Replace hyphens in a rule name by upper-casing the letter after them.
 * E.g. "foo-bar" -> "fooBar"
 */
export declare function camelize(stringWithHyphens: string): string;
export declare function isUpperCase(str: string): boolean;
export declare function isLowerCase(str: string): boolean;
/**
 * Removes leading indents from a template string without removing all leading whitespace
 */
export declare function dedent(strings: TemplateStringsArray, ...values: any[]): string;
/**
 * Strip comments from file content.
 */
export declare function stripComments(content: string): string;
/**
 * Escapes all special characters in RegExp pattern to avoid broken regular expressions and ensure proper matches
 */
export declare function escapeRegExp(re: string): string;
/** Return true if both parameters are equal. */
export declare type Equal<T> = (a: T, b: T) => boolean;
export declare function arraysAreEqual<T>(a: ReadonlyArray<T> | undefined, b: ReadonlyArray<T> | undefined, eq: Equal<T>): boolean;
/** Returns the first non-`undefined` result. */
export declare function find<T, U>(inputs: T[], getResult: (t: T) => U | undefined): U | undefined;
/** Returns an array that is the concatenation of all output arrays. */
export declare function flatMap<T, U>(inputs: ReadonlyArray<T>, getOutputs: (input: T, index: number) => ReadonlyArray<U>): U[];
/** Returns an array of all outputs that are not `undefined`. */
export declare function mapDefined<T, U>(inputs: ReadonlyArray<T>, getOutput: (input: T) => U | undefined): U[];
export declare function readBufferWithDetectedEncoding(buffer: Buffer): string;
export declare type Encoding = "utf8" | "utf8-bom" | "utf16le" | "utf16be";
export declare function detectBufferEncoding(buffer: Buffer, length?: number): Encoding;
export declare function denormalizeWinPath(path: string): string;
