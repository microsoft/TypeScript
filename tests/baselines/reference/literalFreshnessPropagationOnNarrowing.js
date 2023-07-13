//// [tests/cases/compiler/literalFreshnessPropagationOnNarrowing.ts] ////

//// [literalFreshnessPropagationOnNarrowing.ts]
function f1() {
    let b = true;
    let obj = { b };
    // Desired: OK
    // 3.0: OK
    // 3.1 as-is: OK
    // 3.1 minus widening propagation: error
    obj.b = false;
}

function f2() {
    type Element = (string | false);
    type ElementOrArray = Element | Element[]; 
    let el: Element = null as any;
    let arr: Element[] = null as any;
    let elOrA: ElementOrArray = null as any;

    // Desired/actual: All OK
    let a1: ElementOrArray = el;
    let a2: ElementOrArray = arr;
    let a3: ElementOrArray = [el];
    let a4: ElementOrArray = Array.isArray(elOrA) ? elOrA : [elOrA];

    // Desired: OK
    // 3.0: Error
    // 3.1: OK
    let a5: ElementOrArray = [...Array.isArray(elOrA) ? elOrA : [elOrA]];
}

function f3() {
    type XY = 'x' | 'y';
    const x: XY = 'x';
    let x2 = x;
    // Desired: OK (up for debate?)
    // 3.0: Error
    // 3.1 as-is: OK
    x2 = 'y';

    // Desired/actual: All OK
    let x3: XY = x;
    x3 = 'y';
}

function f4() {
    const x: boolean = true;
    let x1 = x;
    // Desired: OK
    // 3.0: OK
    // 3.1: OK
    // 3.1 minus widening propagation: error
    x1 = false;
}

function f5() {
    type XY = 'x' | 'y';
    let arr: XY[] = ['x'];
    arr = ['y'];
    // Desired: OK
    // Error in all extant branches
    arr = [...['y']];
}

//// [literalFreshnessPropagationOnNarrowing.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function f1() {
    var b = true;
    var obj = { b: b };
    // Desired: OK
    // 3.0: OK
    // 3.1 as-is: OK
    // 3.1 minus widening propagation: error
    obj.b = false;
}
function f2() {
    var el = null;
    var arr = null;
    var elOrA = null;
    // Desired/actual: All OK
    var a1 = el;
    var a2 = arr;
    var a3 = [el];
    var a4 = Array.isArray(elOrA) ? elOrA : [elOrA];
    // Desired: OK
    // 3.0: Error
    // 3.1: OK
    var a5 = __spreadArray([], Array.isArray(elOrA) ? elOrA : [elOrA], true);
}
function f3() {
    var x = 'x';
    var x2 = x;
    // Desired: OK (up for debate?)
    // 3.0: Error
    // 3.1 as-is: OK
    x2 = 'y';
    // Desired/actual: All OK
    var x3 = x;
    x3 = 'y';
}
function f4() {
    var x = true;
    var x1 = x;
    // Desired: OK
    // 3.0: OK
    // 3.1: OK
    // 3.1 minus widening propagation: error
    x1 = false;
}
function f5() {
    var arr = ['x'];
    arr = ['y'];
    // Desired: OK
    // Error in all extant branches
    arr = ['y'];
}
