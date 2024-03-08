//// [tests/cases/compiler/recursiveTypeAliasWithSpreadConditionalReturnNotCircular.ts] ////

//// [recursiveTypeAliasWithSpreadConditionalReturnNotCircular.ts]
export {}
export interface Option<T> {
	zip1<O extends Array<Option<any>>>(...others: O): Option<[T, ...UnzipOptionArray1<O>]>;

	zip2<O extends Array<Option<any>>>(...others: O): Option<[T, ...UnzipOptionArray2<O>]>;

	zip3<O extends Array<Option<any>>>(...others: O): Option<[T, ...UnzipOptionArray3<O>]>;
}

type UnzipOption<T> = T extends Option<infer V> ? V : never;

/// This doesn't work
type UnzipOptionArray1<T> = { [k in keyof T]: T[k] extends Option<any> ? UnzipOption<T[k]> : never };

/// But these work
type UnzipOptionArray2<T> = { [k in keyof T]: UnzipOption<T[k]> };
type UnzipOptionArray3<T> = { [k in keyof T]: T[k] extends Option<infer V> ? V : never };

declare const opt1: Option<number>;
declare const opt2: Option<string>;
declare const opt3: Option<boolean>;

const zipped1 = opt1.zip1(opt2, opt3);
const zipped2 = opt1.zip2(opt2, opt3);
const zipped3 = opt1.zip3(opt2, opt3);

//// [recursiveTypeAliasWithSpreadConditionalReturnNotCircular.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zipped1 = opt1.zip1(opt2, opt3);
var zipped2 = opt1.zip2(opt2, opt3);
var zipped3 = opt1.zip3(opt2, opt3);
