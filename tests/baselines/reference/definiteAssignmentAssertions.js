//// [definiteAssignmentAssertions.ts]
// Suppress strict property initialization check

class C1 {
    a!: number;
    b: string;  // Error
}

// Suppress definite assignment check in constructor

class C2 {
    a!: number;
    constructor() {
        let x = this.a;
    }
}

// Definite assignment assertion requires type annotation, no initializer, no static modifier

class C3 {
    a! = 1;
    b!: number = 1;
    static c!: number;
    d!;
}

// Definite assignment assertion not permitted in ambient context

declare class C4 {
    a!: number;
}

// Definite assignment assertion not permitted on abstract property

abstract class C5 {
    abstract a!: number;
}

// Suppress definite assignment check for variable

function f1() {
    let x!: number;
    let y = x;
    var a!: number;
    var b = a;
}

function f2() {
    let x!: string | number;
    if (typeof x === "string") {
        let s: string = x;
    }
    else {
        let n: number = x;
    }
}

function f3() {
    let x!: number;
    const g = () => {
        x = 1;
    }
    g();
    let y = x;
}

// Definite assignment assertion requires type annotation and no initializer

function f4() {
    let a!;
    let b! = 1;
    let c!: number = 1;
}

// Definite assignment assertion not permitted in ambient context

declare let v1!: number;
declare var v2!: number;

declare namespace foo {
	var v!: number;
}


//// [definiteAssignmentAssertions.js]
"use strict";
// Suppress strict property initialization check
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
// Suppress definite assignment check in constructor
var C2 = /** @class */ (function () {
    function C2() {
        var x = this.a;
    }
    return C2;
}());
// Definite assignment assertion requires type annotation, no initializer, no static modifier
var C3 = /** @class */ (function () {
    function C3() {
        this.a = 1;
        this.b = 1;
    }
    return C3;
}());
// Definite assignment assertion not permitted on abstract property
var C5 = /** @class */ (function () {
    function C5() {
    }
    return C5;
}());
// Suppress definite assignment check for variable
function f1() {
    var x;
    var y = x;
    var a;
    var b = a;
}
function f2() {
    var x;
    if (typeof x === "string") {
        var s = x;
    }
    else {
        var n = x;
    }
}
function f3() {
    var x;
    var g = function () {
        x = 1;
    };
    g();
    var y = x;
}
// Definite assignment assertion requires type annotation and no initializer
function f4() {
    var a;
    var b = 1;
    var c = 1;
}


//// [definiteAssignmentAssertions.d.ts]
declare class C1 {
    a: number;
    b: string;
}
declare class C2 {
    a: number;
    constructor();
}
declare class C3 {
    a: number;
    b: number;
    static c: number;
    d: any;
}
declare class C4 {
    a: number;
}
declare abstract class C5 {
    abstract a: number;
}
declare function f1(): void;
declare function f2(): void;
declare function f3(): void;
declare function f4(): void;
declare let v1: number;
declare var v2: number;
declare namespace foo {
    var v: number;
}
