//// [interfaceExtendsObjectIntersectionErrors.ts]
type T1 = { a: number };
type T2 = T1 & { b: number };
type T3 = number[];
type T4 = [string, number];
type T5 = { [P in 'a' | 'b' | 'c']: string };

interface I1 extends T1 { a: string }
interface I2 extends T2 { b: string }
interface I3 extends T3 { length: string }
interface I4 extends T4 { 0: number }
interface I5 extends T5 { c: number }

type Constructor<T> = new () => T;
declare function Constructor<T>(): Constructor<T>;

class C1 extends Constructor<T1>() { a: string }
class C2 extends Constructor<T2>() { b: string }
class C3 extends Constructor<T3>() { length: string }
class C4 extends Constructor<T4>() { 0: number }
class C5 extends Constructor<T5>() { c: number }

declare class CX { static a: string }
declare enum EX { A, B, C }
declare namespace NX { export const a = "hello" }

type TCX = typeof CX;
type TEX = typeof EX;
type TNX = typeof NX;

interface I10 extends TCX { a: number }
interface I11 extends TEX { C: string }
interface I12 extends TNX { a: number }
interface I14 extends TCX { [x: string]: number }
interface I15 extends TEX { [x: string]: number }
interface I16 extends TNX { [x: string]: number }

type Identifiable<T> = { _id: string } & T;

interface I20 extends Partial<T1> { a: string }
interface I21 extends Readonly<T1> { a: string }
interface I22 extends Identifiable<T1> { a: string }
interface I23 extends Identifiable<T1 & { b: number}> { a: string }

type U = { a: number } | { b: string };

interface I30 extends U { x: string }
interface I31<T> extends T { x: string }


//// [interfaceExtendsObjectIntersectionErrors.js]
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
var C1 = /** @class */ (function (_super) {
    __extends(C1, _super);
    function C1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C1;
}(Constructor()));
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}(Constructor()));
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C3;
}(Constructor()));
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C4;
}(Constructor()));
var C5 = /** @class */ (function (_super) {
    __extends(C5, _super);
    function C5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C5;
}(Constructor()));
