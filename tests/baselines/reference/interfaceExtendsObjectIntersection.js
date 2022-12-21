//// [interfaceExtendsObjectIntersection.ts]
type T1 = { a: number };
type T2 = T1 & { b: number };
type T3 = () => void;
type T4 = new () => { a: number };
type T5 = number[];
type T6 = [string, number];
type T7 = { [P in 'a' | 'b' | 'c']: string };

interface I1 extends T1 { x: string }
interface I2 extends T2 { x: string }
interface I3 extends T3 { x: string }
interface I4 extends T4 { x: string }
interface I5 extends T5 { x: string }
interface I6 extends T6 { x: string }
interface I7 extends T7 { x: string }

type Constructor<T> = new () => T;
declare function Constructor<T>(): Constructor<T>;

class C1 extends Constructor<I1>() { x: string }
class C2 extends Constructor<I2>() { x: string }
class C3 extends Constructor<I3>() { x: string }
class C4 extends Constructor<I4>() { x: string }
class C5 extends Constructor<I5>() { x: string }
class C6 extends Constructor<I6>() { x: string }
class C7 extends Constructor<I7>() { x: string }

declare function fx(x: string): string;
declare class CX { a: number }
declare enum EX { A, B, C }
declare namespace NX { export const a = 1 }

type T10 = typeof fx;
type T11 = typeof CX;
type T12 = typeof EX;
type T13 = typeof NX;

interface I10 extends T10 { x: string }
interface I11 extends T11 { x: string }
interface I12 extends T12 { x: string }
interface I13 extends T13 { x: string }

type Identifiable<T> = { _id: string } & T;

interface I20 extends Partial<T1> { x: string }
interface I21 extends Readonly<T1> { x: string }
interface I22 extends Identifiable<T1> { x: string }
interface I23 extends Identifiable<T1 & { b: number}> { x: string }

class C20 extends Constructor<Partial<T1>>() { x: string }
class C21 extends Constructor<Readonly<T1>>() { x: string }
class C22 extends Constructor<Identifiable<T1>>() { x: string }
class C23 extends Constructor<Identifiable<T1 & { b: number}>>() { x: string }


//// [interfaceExtendsObjectIntersection.js]
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
var C6 = /** @class */ (function (_super) {
    __extends(C6, _super);
    function C6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C6;
}(Constructor()));
var C7 = /** @class */ (function (_super) {
    __extends(C7, _super);
    function C7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C7;
}(Constructor()));
var C20 = /** @class */ (function (_super) {
    __extends(C20, _super);
    function C20() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C20;
}(Constructor()));
var C21 = /** @class */ (function (_super) {
    __extends(C21, _super);
    function C21() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C21;
}(Constructor()));
var C22 = /** @class */ (function (_super) {
    __extends(C22, _super);
    function C22() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C22;
}(Constructor()));
var C23 = /** @class */ (function (_super) {
    __extends(C23, _super);
    function C23() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C23;
}(Constructor()));
