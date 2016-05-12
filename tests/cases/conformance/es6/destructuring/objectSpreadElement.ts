// @target: es5
let o = { a: 1, b: 'no' }
let o2 = { b: 'yes', c: true }
let addAfter = { ...o, c: false }
let addBefore = { c: false, ...o }
// Note: ignore still changes the order that properties are printed
let ignore = { b: 'ignored', ...o }
let override = { ...o, b: 'override' }
let nested = { ...{ a: 3, ...{ b: false, c: 'overriden' } }, c: 'whatever' }
let combined = { ...o, ...o2 }
let combinedBefore = { b: 'ok', ...o, ...o2 }
let combinedMid = { ...o, b: 'ok', ...o2 }
let combinedAfter = { ...o, ...o2, b: 'ok' }
let combinedNested = {
    ...{ a: 4, ...{ b: false, c: 'overriden' } },
    d: 'actually new',
    ...{ a: 5, d: 'maybe new' },
}
// accessors don't copy the descriptor
// (which means that readonly getters become read/write)
let op = { get a () { return 6 } };
let getter = { ...op, c: 7 }

// null and undefined are just skipped
let spreadNull = { ...null }
let spreadUndefined = { ...undefined }

// methods are not enumerable
class C { p = 1; m() { } };
let c: C = new C();
let spreadC = {...c};

// computed property
let computedFirst = {
    ['before everything']: 12,
    ...o,
    b: 'yes'
}
let computedMiddle = {
    ...o,
    ['in the middle']: 13,
    b: 'maybe?',
    ...o2
}
let computedAfter = {
    ...o,
    b: 'yeah',
    ['at the end']: 14
}

// generics
function f<T, U>(t: T, u: U) {
    return { id: 'id', ...t, ...u };
}
let exclusive: { id: string, a: number, b: string, c: string, d: boolean } =
    f({ a: 1, b: 'yes' }, { c: 'no', d: false });
let overlap: { id: string, a: number, b: string } =
    f({ a: 1 }, { a: 2, b: 'extra' });
let overlapConflict: { id:string, a: number & string } =
    f({ a: 1 }, { a: 'mismatch' });
let overwriteId: { id: string, a: number, d: string } =
    f({ a: 1, id: 'overwritten' }, { c: 1, d: 'no' });

class D { m() { }; q = 2; }
let classesAreWrong: /*{ id: string, ...C., ...D }*/ =
    f(new C(), new D());
