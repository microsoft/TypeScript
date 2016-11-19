// @target: es6

var v0: null;
var v1: undefined;

function f0(): null { return null; }
function f1(): undefined { return undefined; }

var f2 = function (): null { return null; }
var f3 = function (): undefined { return undefined; }

var f4 = (): null => null;
var f5 = (): undefined => undefined;

function f6(p0: null) { }
function f7(p1: undefined) { }

var f8 = function (p2: null) { }
var f9 = function (p3: undefined) { }

var f10 = (p4: null) => { }
var f11 = (p5: undefined) => { }

class C1 {
    m0(): null { return null; }
    m1(): undefined { return undefined; }

    m3(p6: null) { }
    m4(p7: undefined) { }

    get a0(): null { return null; }
    get a1(): undefined { return undefined; }

    set a2(p8: null) { }
    set a3(p9: undefined) { }
}

class C2 { constructor(p10: null) { } }
class C3 { constructor(p11: undefined) { } }

class C4 {
    f1;
    constructor(p12: null) { }
}

class C5 {
    f2;
    constructor(p13: undefined) { }
}

var C6 = class { constructor(p12: null) { } }
var C7 = class { constructor(p13: undefined) { } }

declare function fn<T>();
fn<null>();
fn<undefined>();

declare class D<T> {}
new D<null>();
new D<undefined>();