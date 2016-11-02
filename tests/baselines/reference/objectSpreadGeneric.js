//// [objectSpreadGeneric.ts]
function f<T, U, V>(t: T, u: U, v: V): void {
    let o: { ...T, ...U, ...V };
    let uus: { ...U, ...U};
    let us: { ...U };
    const same: { ...T, ...U, ...V } = o; // ok
    uus = us; // ok, multiple spreads are equivalent to a single one
    us = uus; // ok, multiple spreads are equivalent to a single one
    us = u;   // ok, type has at least all the properties of the spread
    u = us;   // error, might be missing a ton of stuff
    const reversed: { ...V, ...U, ...T } = o; // error, reversed
    const reversed2: { ...U, ...T, ...V } = o; // error, U and T are still reversed
    const missingT: { ...U, ...V } = o; // error, missing T
    const missingU: { ...T, ...V } = o; // error, missing U
    const missingV: { ...T, ...U } = o; // error, missing V
    const atEnd: { ...T, ...U, second: string } = { ...t, ...u, second: 'foo' }; // ok
    const atBeginning: { first: string, ...T, ...U, } = { first: 'foo', ...t, ...u }; // error, not assignable

    const emptyTarget: { } = { ...t, ...u } // ok
    const emptySource: { ...T, ...U } = { }; // error, {} is not assignable to U (or T)

    // error, { sn?: boolean } ...T ... { sn?: number | string } is not assignable to
    //        T ... { sn?: number | string | boolean }
    let optionalNumber: { sn?: number };
    let optionalString: { sn?: string };
    let optionalBoolean: { sn?: boolean };
    const unionCutoff: { ...T, sn?: number | string | boolean } =
        { ...optionalBoolean, ...t, ...optionalString, ...optionalNumber }
    unionCutoff.sn; // ok
    const optionalCutoff = { ...t, ...optionalNumber }; // ok
    optionalCutoff.sn; // ok

    const interspersed: { first: string, ...T, second: string, ...U, third: string } =
        { first: '1', ...t, second: '2', ...u, third: '3' }; // error, not assignable
    const interspersedMissingU: { first: string, second: string, ...T, third: string } =
        { first: '1', ...t, second: '2', ...u, third: '3' }; // error, 'U' is missing
    const interspersedOrder1: { first: string, ...T, second: string, ...U, third: string, secondsecond: string } =
        { first: '1', ...t, second: '2', ...u, third: '3', secondsecond: 'false' }; // error, not assignable
    const interspersedOrder2: { first: string, second: string, secondsecond: string, third: string, ...T, ...U } =
        { first: '1', ...t, second: '2', ...u, third: '3', secondsecond: 'false' }; // error, not assignable


    const mismatchFirst: { first: string, ...T, second: string, ...U, third: string } =
        { firrrrrrst: '1', ...t, second: '2', ...u, third: '3' }; // error, not assignable
    const mismatchSecond: { first: string, ...T, second: string, ...U, third: string } =
        { first: '1', ...t, ssssssssecond: '2', ...u, third: '3' }; // error, not assignable
    const mismatchLast: { first: string, ...T, second: string, ...U, third: string } =
        { first: '1', ...t, second: '2', ...u, thirrrrrrrd: '3' }; // error, not assignable
}

function indexAccessedTest<T, K extends keyof T, U, J extends keyof U>(t: T, u: U, key1: K, key2: J) {
    let k1: { ...keyof T };
    let k2: { ...keyof U };
    let k3: { ...K };
    let k4: { ...J };
    k1 = k1; // ok
    k2 = k2; // ok
    k1 = k2; // error
    k2 = k1; // error
    k3 = k3; // ok
    k4 = k4; // ok
    k1 = k3; // error
    k3 = k1; // error
    k2 = k4; // error
    k4 = k2; // error

    let i1: { ...T[K] };
    let i2: { ...U[J] };
    i1 = i1; // ok
    i2 = i2; // ok
    i1 = i2; // error
    i2 = i1; // error
}


//// [objectSpreadGeneric.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function f(t, u, v) {
    var o;
    var uus;
    var us;
    var same = o; // ok
    uus = us; // ok, multiple spreads are equivalent to a single one
    us = uus; // ok, multiple spreads are equivalent to a single one
    us = u; // ok, type has at least all the properties of the spread
    u = us; // error, might be missing a ton of stuff
    var reversed = o; // error, reversed
    var reversed2 = o; // error, U and T are still reversed
    var missingT = o; // error, missing T
    var missingU = o; // error, missing U
    var missingV = o; // error, missing V
    var atEnd = __assign({}, t, u, { second: 'foo' }); // ok
    var atBeginning = __assign({ first: 'foo' }, t, u); // error, not assignable
    var emptyTarget = __assign({}, t, u); // ok
    var emptySource = {}; // error, {} is not assignable to U (or T)
    // error, { sn?: boolean } ...T ... { sn?: number | string } is not assignable to
    //        T ... { sn?: number | string | boolean }
    var optionalNumber;
    var optionalString;
    var optionalBoolean;
    var unionCutoff = __assign({}, optionalBoolean, t, optionalString, optionalNumber);
    unionCutoff.sn; // ok
    var optionalCutoff = __assign({}, t, optionalNumber); // ok
    optionalCutoff.sn; // ok
    var interspersed = __assign({ first: '1' }, t, { second: '2' }, u, { third: '3' }); // error, not assignable
    var interspersedMissingU = __assign({ first: '1' }, t, { second: '2' }, u, { third: '3' }); // error, 'U' is missing
    var interspersedOrder1 = __assign({ first: '1' }, t, { second: '2' }, u, { third: '3', secondsecond: 'false' }); // error, not assignable
    var interspersedOrder2 = __assign({ first: '1' }, t, { second: '2' }, u, { third: '3', secondsecond: 'false' }); // error, not assignable
    var mismatchFirst = __assign({ firrrrrrst: '1' }, t, { second: '2' }, u, { third: '3' }); // error, not assignable
    var mismatchSecond = __assign({ first: '1' }, t, { ssssssssecond: '2' }, u, { third: '3' }); // error, not assignable
    var mismatchLast = __assign({ first: '1' }, t, { second: '2' }, u, { thirrrrrrrd: '3' }); // error, not assignable
}
function indexAccessedTest(t, u, key1, key2) {
    var k1;
    var k2;
    var k3;
    var k4;
    k1 = k1; // ok
    k2 = k2; // ok
    k1 = k2; // error
    k2 = k1; // error
    k3 = k3; // ok
    k4 = k4; // ok
    k1 = k3; // error
    k3 = k1; // error
    k2 = k4; // error
    k4 = k2; // error
    var i1;
    var i2;
    i1 = i1; // ok
    i2 = i2; // ok
    i1 = i2; // error
    i2 = i1; // error
}
