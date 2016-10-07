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
