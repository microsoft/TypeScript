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