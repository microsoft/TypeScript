//// [objectSpreadGeneric.ts]
function f<T, U, V>(t: T, u: U, v: V): void {
    let o: { ...T, ...U, ...V };
    const same: { ...T, ...U, ...V } = o; // ok
    const reversed: { ...V, ...U, ...T } = o; // error, reversed
    const reversed2: { ...U, ...T, ...V } = o; // error, U and T are still reversed
    const missingT: { ...U, ...V } = o; // error, missing T
    const missingU: { ...T, ...V } = o; // error, missing U
    const missingV: { ...T, ...U } = o; // error, missing V
    const atEnd: { ...T, ...U, second: string } = { ...t, ...u, second: 'foo' }; // ok
    const atBeginning: { first: string, ...T, ...U, } = { first: 'foo', ...t, ...u }; // ok

    const emptyTarget: { } = { ...t, ...u } // ok
    const emptySource: { ...T, ...U } = { }; // error, {} is not assignable to U (or T)

    let optionalNumber: { sn?: number };
    let optionalString: { sn?: string };
    let optionalBoolean: { sn?: boolean };
    const unionCutoff: { ...T, sn?: number | string | boolean } =
        { ...optionalBoolean, ...t, ...optionalString, ...optionalNumber } // ok
    unionCutoff.sn; // ok
    const optionalCutoff = { ...t, ...optionalNumber }; // ok
    optionalCutoff.sn; // ok

    const interspersed: { first: string, ...T, second: string, ...U, third: string } =
        { first: '1', ...t, second: '2', ...u, third: '3' }; // ok
    const interspersedMissingU: { first: string, second: string, ...T, third: string } =
        { first: '1', ...t, second: '2', ...u, third: '3' }; // error, 'U' is missing
    const interspersedOrder1: { first: string, ...T, second: string, ...U, third: string, secondsecond: string } =
        { first: '1', ...t, second: '2', ...u, third: '3', secondsecond: 'false' }; // ok
    const interspersedOrder2: { first: string, second: string, secondsecond: string, third: string, ...T, ...U } =
        { first: '1', ...t, second: '2', ...u, third: '3', secondsecond: 'false' }; // ok


    const mismatchFirst: { first: string, ...T, second: string, ...U, third: string } =
        { firrrrrrst: '1', ...t, second: '2', ...u, third: '3' }; // error, 'first' not found
    const mismatchSecond: { first: string, ...T, second: string, ...U, third: string } =
        { first: '1', ...t, ssssssssecond: '2', ...u, third: '3' }; // error, 'second' not found
    const mismatchLast: { first: string, ...T, second: string, ...U, third: string } =
        { first: '1', ...t, second: '2', ...u, thirrrrrrrd: '3' }; // error, 'third' not found
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
    var same = o; // ok
    var reversed = o; // error, reversed
    var reversed2 = o; // error, U and T are still reversed
    var missingT = o; // error, missing T
    var missingU = o; // error, missing U
    var missingV = o; // error, missing V
    var atEnd = __assign({}, t, u, { second: 'foo' }); // ok
    var atBeginning = __assign({ first: 'foo' }, t, u); // ok
    var emptyTarget = __assign({}, t, u); // ok
    var emptySource = {}; // error, {} is not assignable to U (or T)
    var optionalNumber;
    var optionalString;
    var optionalBoolean;
    var unionCutoff = __assign({}, optionalBoolean, t, optionalString, optionalNumber); // ok
    unionCutoff.sn; // ok
    var optionalCutoff = __assign({}, t, optionalNumber); // ok
    optionalCutoff.sn; // ok
    var interspersed = __assign({ first: '1' }, t, { second: '2' }, u, { third: '3' }); // ok
    var interspersedMissingU = __assign({ first: '1' }, t, { second: '2' }, u, { third: '3' }); // error, 'U' is missing
    var interspersedOrder1 = __assign({ first: '1' }, t, { second: '2' }, u, { third: '3', secondsecond: 'false' }); // ok
    var interspersedOrder2 = __assign({ first: '1' }, t, { second: '2' }, u, { third: '3', secondsecond: 'false' }); // ok
    var mismatchFirst = __assign({ firrrrrrst: '1' }, t, { second: '2' }, u, { third: '3' }); // error, 'first' not found
    var mismatchSecond = __assign({ first: '1' }, t, { ssssssssecond: '2' }, u, { third: '3' }); // error, 'second' not found
    var mismatchLast = __assign({ first: '1' }, t, { second: '2' }, u, { thirrrrrrrd: '3' }); // error, 'third' not found
}
