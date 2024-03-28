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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass4 = exports.MyClass3 = exports.MyClass2 = exports.MyClass = exports.ExportedClass = void 0;
var ExportedClass = /** @class */ (function () {
    function ExportedClass() {
    }
    return ExportedClass;
}());
exports.ExportedClass = ExportedClass;
var LocalClass = /** @class */ (function () {
    function LocalClass() {
    }
    return LocalClass;
}());
function getLocalClass(c) {
    return LocalClass;
}
function getExportedClass(c) {
    return ExportedClass;
}
var MyClass = /** @class */ (function (_super) {
    __extends(MyClass, _super);
    function MyClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyClass;
}(getLocalClass(undefined)));
exports.MyClass = MyClass;
var MyClass2 = /** @class */ (function (_super) {
    __extends(MyClass2, _super);
    function MyClass2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyClass2;
}(getExportedClass(undefined)));
exports.MyClass2 = MyClass2;
var MyClass3 = /** @class */ (function (_super) {
    __extends(MyClass3, _super);
    function MyClass3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyClass3;
}(getExportedClass(undefined)));
exports.MyClass3 = MyClass3;
var MyClass4 = /** @class */ (function (_super) {
    __extends(MyClass4, _super);
    function MyClass4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyClass4;
}(getExportedClass(undefined)));
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
