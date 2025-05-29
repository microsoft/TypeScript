//// [tests/cases/compiler/declarationEmitExpressionInExtends3.ts] ////

//// [declarationEmitExpressionInExtends3.ts]
export class ExportedClass<T> {
	x: T;
}

class LocalClass<T, U> {
    x: T;
    y: U;
}

export interface ExportedInterface {
    x: number;
}

interface LocalInterface {
    x: number;
}

function getLocalClass<T>(c: T) {
    return LocalClass;
}

function getExportedClass<T>(c: T) {
    return ExportedClass;
}



export class MyClass extends getLocalClass<LocalInterface>(undefined)<string, number> { // error LocalClass is inaccisible
}


export class MyClass2 extends getExportedClass<LocalInterface>(undefined)<string> { // OK
}


export class MyClass3 extends getExportedClass<LocalInterface>(undefined)<LocalInterface> { // Error LocalInterface is inaccisble
}


export class MyClass4 extends getExportedClass<LocalInterface>(undefined)<ExportedInterface> { // OK
}


//// [declarationEmitExpressionInExtends3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass4 = exports.MyClass3 = exports.MyClass2 = exports.MyClass = exports.ExportedClass = void 0;
class ExportedClass {
    x;
}
exports.ExportedClass = ExportedClass;
class LocalClass {
    x;
    y;
}
function getLocalClass(c) {
    return LocalClass;
}
function getExportedClass(c) {
    return ExportedClass;
}
class MyClass extends getLocalClass(undefined) {
}
exports.MyClass = MyClass;
class MyClass2 extends getExportedClass(undefined) {
}
exports.MyClass2 = MyClass2;
class MyClass3 extends getExportedClass(undefined) {
}
exports.MyClass3 = MyClass3;
class MyClass4 extends getExportedClass(undefined) {
}
exports.MyClass4 = MyClass4;


//// [declarationEmitExpressionInExtends3.d.ts]
export declare class ExportedClass<T> {
    x: T;
}
declare class LocalClass<T, U> {
    x: T;
    y: U;
}
export interface ExportedInterface {
    x: number;
}
interface LocalInterface {
    x: number;
}
declare const MyClass_base: typeof LocalClass;
export declare class MyClass extends MyClass_base<string, number> {
}
declare const MyClass2_base: typeof ExportedClass;
export declare class MyClass2 extends MyClass2_base<string> {
}
declare const MyClass3_base: typeof ExportedClass;
export declare class MyClass3 extends MyClass3_base<LocalInterface> {
}
declare const MyClass4_base: typeof ExportedClass;
export declare class MyClass4 extends MyClass4_base<ExportedInterface> {
}
export {};
