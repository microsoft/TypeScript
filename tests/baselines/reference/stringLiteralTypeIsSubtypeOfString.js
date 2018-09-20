//// [stringLiteralTypeIsSubtypeOfString.ts]
// string literal types are subtypes of string, any

// ok
function f1(x: 'a');
function f1(x: string);
function f1(x: string) { }

// ok
function f2(x: 'a');
function f2(x: any);
function f2(x: any) { }

// errors
function f3(x: 'a');
function f3(x: Object);
function f3(x: any) { }

function f4(x: 'a');
function f4(x: {});
function f4(x: any) { }

function f5(x: 'a');
function f5(x: number);
function f5(x: any) { }

function f6(x: 'a');
function f6(x: boolean);
function f6(x: any) { }

function f7(x: 'a');
function f7(x: Date);
function f7(x: any) { }

function f8(x: 'a');
function f8(x: RegExp);
function f8(x: any) { }

function f9(x: 'a');
function f9(x: () => {});
function f9(x: any) { }

class C implements String {
    toString(): string { return null; }
    charAt(pos: number): string { return null; }
    charCodeAt(index: number): number { return null; }
    concat(...strings: string[]): string { return null; }
    indexOf(searchString: string, position?: number): number { return null; }
    lastIndexOf(searchString: string, position?: number): number { return null; }
    localeCompare(that: string): number { return null; }
    match(regexp: any): string[] { return null; }
    replace(searchValue: any, replaceValue: any): string { return null; }
    search(regexp: any): number { return null; }
    slice(start?: number, end?: number): string { return null; }
    split(separator: any, limit?: number): string[] { return null; }
    substring(start: number, end?: number): string { return null; }
    toLowerCase(): string { return null; }
    toLocaleLowerCase(): string { return null; }
    toUpperCase(): string { return null; }
    toLocaleUpperCase(): string { return null; }
    trim(): string { return null; }
    length: number;
    substr(from: number, length?: number): string { return null; }
    valueOf(): string { return null; }
    [index: number]: string;
}
 
// BUG 831846
function f10(x: 'a');
function f10(x: C);
function f10(x: any) { }

interface I extends String {
    foo: string;
}

// BUG 831846
function f11(x: 'a');
function f11(x: I);
function f11(x: any) { }

function f12<T>(x: 'a');
function f12<T>(x: T);
function f12<T>(x: any) { }

function f13<T extends String>(x: 'a');
function f13<T extends String>(x: T);
function f13<T extends String>(x: any) { }

enum E { A }
function f14(x: 'a');
function f14(x: E);
function f14(x: any) { }

function f15<T, U extends T>(x: 'a');
function f15<T, U extends T>(x: U);
function f15<T, U extends T>(x: any) { }

function f16<T extends String, U extends T>(x: 'a');
function f16<T extends String, U extends T>(x: U);
function f16<T extends String, U extends T>(x: any) { }

//// [stringLiteralTypeIsSubtypeOfString.js]
// string literal types are subtypes of string, any
function f1(x) { }
function f2(x) { }
function f3(x) { }
function f4(x) { }
function f5(x) { }
function f6(x) { }
function f7(x) { }
function f8(x) { }
function f9(x) { }
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.toString = function () { return null; };
    C.prototype.charAt = function (pos) { return null; };
    C.prototype.charCodeAt = function (index) { return null; };
    C.prototype.concat = function () {
        var strings = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            strings[_i] = arguments[_i];
        }
        return null;
    };
    C.prototype.indexOf = function (searchString, position) { return null; };
    C.prototype.lastIndexOf = function (searchString, position) { return null; };
    C.prototype.localeCompare = function (that) { return null; };
    C.prototype.match = function (regexp) { return null; };
    C.prototype.replace = function (searchValue, replaceValue) { return null; };
    C.prototype.search = function (regexp) { return null; };
    C.prototype.slice = function (start, end) { return null; };
    C.prototype.split = function (separator, limit) { return null; };
    C.prototype.substring = function (start, end) { return null; };
    C.prototype.toLowerCase = function () { return null; };
    C.prototype.toLocaleLowerCase = function () { return null; };
    C.prototype.toUpperCase = function () { return null; };
    C.prototype.toLocaleUpperCase = function () { return null; };
    C.prototype.trim = function () { return null; };
    C.prototype.substr = function (from, length) { return null; };
    C.prototype.valueOf = function () { return null; };
    return C;
}());
function f10(x) { }
function f11(x) { }
function f12(x) { }
function f13(x) { }
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
function f14(x) { }
function f15(x) { }
function f16(x) { }
