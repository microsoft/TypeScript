//// [covariantCallbacks.ts]
// Test that callback parameters are related covariantly

interface P<T> {
    then(cb: (value: T) => void): void;
};

interface A { a: string }
interface B extends A { b: string }

function f1(a: P<A>, b: P<B>) {
    a = b;
    b = a;  // Error
}

function f2(a: Promise<A>, b: Promise<B>) {
    a = b;
    b = a;  // Error
}

interface AList1 {
    forEach(cb: (item: A) => void): void;
}

interface BList1 {
    forEach(cb: (item: B) => void): void;
}

function f11(a: AList1, b: BList1) {
    a = b;
    b = a;  // Error
}

interface AList2 {
    forEach(cb: (item: A) => boolean): void;
}

interface BList2 {
    forEach(cb: (item: A) => void): void;
}

function f12(a: AList2, b: BList2) {
    a = b;
    b = a;  // Error
}

interface AList3 {
    forEach(cb: (item: A) => void): void;
}

interface BList3 {
    forEach(cb: (item: A, context: any) => void): void;
}

function f13(a: AList3, b: BList3) {
    a = b;
    b = a;  // Error
}

interface AList4 {
    forEach(cb: (item: A) => A): void;
}

interface BList4 {
    forEach(cb: (item: B) => B): void;
}

function f14(a: AList4, b: BList4) {
    a = b;
    b = a;  // Error
}


//// [covariantCallbacks.js]
"use strict";
// Test that callback parameters are related covariantly
;
function f1(a, b) {
    a = b;
    b = a; // Error
}
function f2(a, b) {
    a = b;
    b = a; // Error
}
function f11(a, b) {
    a = b;
    b = a; // Error
}
function f12(a, b) {
    a = b;
    b = a; // Error
}
function f13(a, b) {
    a = b;
    b = a; // Error
}
function f14(a, b) {
    a = b;
    b = a; // Error
}
