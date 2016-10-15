//// [transformsElideNullUndefinedType.ts]

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

class C<T> {
    m0(): null { return null; }
    m1(): undefined { return undefined; }

    get a0(): null { return null; }
    get a1(): undefined { return undefined; }
}

declare function fn<T>();

fn<null>();
fn<undefined>();

new C<null>();
new C<undefined>();

//// [transformsElideNullUndefinedType.js]
var v0;
var v1;
function f0() { return null; }
function f1() { return undefined; }
var f2 = function () { return null; };
var f3 = function () { return undefined; };
var f4 = () => null;
var f5 = () => undefined;
function f6(p0) { }
function f7(p1) { }
class C {
    m0() { return null; }
    m1() { return undefined; }
    get a0() { return null; }
    get a1() { return undefined; }
}
fn();
fn();
new C();
new C();
