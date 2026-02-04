//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsInvalid.ts] ////

//// [for-inStatementsInvalid.ts]
var aNumber: number;
for (aNumber in {}) { }

var aBoolean: boolean;
for (aBoolean in {}) { }

var aRegExp: RegExp;
for (aRegExp in {}) { }

for (var idx : number in {}) { }

function fn(): void { }
for (var x in fn()) { }

declare var c : string, d:string, e: any;

for (var x in c || d) { }
for (var x in e ? c : d) { }
for (var x in 42 ? c : d) { }
for (var x in '' ? c : d) { }
for (var x in 42 ? d[x] : c[x]) { }
for (var x in c[23]) { }

for (var x in (<T>(x: T) => x)) { }
for (var x in function (x: string, y: number) { return x + y }) { }

class A {
    biz() : number{
        for (var x in this.biz()) { }
        for (var x in this.biz) { }
        for (var x in this) { }
        return null;
    }

    static baz() : number {
        for (var x in this) { }
        for (var x in this.baz) { }
        for (var x in this.baz()) { }

        return null;
    }
}

class B extends A {
    boz() {
        for (var x in this.biz()) { }
        for (var x in this.biz) { }
        for (var x in this) { }

        for (var x in super.biz) { }
        for (var x in super.biz()) { }
        return null;
    }
}

interface I {
    id: number;
    [idx: number]: number;
}
declare var i: I;

for (var x in i[42]) { } 


//// [for-inStatementsInvalid.js]
"use strict";
var aNumber;
for (aNumber in {}) { }
var aBoolean;
for (aBoolean in {}) { }
var aRegExp;
for (aRegExp in {}) { }
for (var idx in {}) { }
function fn() { }
for (var x in fn()) { }
for (var x in c || d) { }
for (var x in e ? c : d) { }
for (var x in 42 ? c : d) { }
for (var x in '' ? c : d) { }
for (var x in 42 ? d[x] : c[x]) { }
for (var x in c[23]) { }
for (var x in ((x) => x)) { }
for (var x in function (x, y) { return x + y; }) { }
class A {
    biz() {
        for (var x in this.biz()) { }
        for (var x in this.biz) { }
        for (var x in this) { }
        return null;
    }
    static baz() {
        for (var x in this) { }
        for (var x in this.baz) { }
        for (var x in this.baz()) { }
        return null;
    }
}
class B extends A {
    boz() {
        for (var x in this.biz()) { }
        for (var x in this.biz) { }
        for (var x in this) { }
        for (var x in super.biz) { }
        for (var x in super.biz()) { }
        return null;
    }
}
for (var x in i[42]) { }
