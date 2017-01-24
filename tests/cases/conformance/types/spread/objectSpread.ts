// @target: es5
let o = { a: 1, b: 'no' }
let o2 = { b: 'yes', c: true }
let swap = { a: 'yes', b: -1 };

let addAfter: { a: number, b: string, c: boolean } =
    { ...o, c: false }
let addBefore: { a: number, b: string, c: boolean } =
    { c: false, ...o }
// Note: ignore still changes the order that properties are printed
let ignore: { a: number, b: string } =
    { b: 'ignored', ...o }
let override: { a: number, b: string } =
    { ...o, b: 'override' }
let nested: { a: number, b: boolean, c: string } =
    { ...{ a: 3, ...{ b: false, c: 'overriden' } }, c: 'whatever' }
let combined: { a: number, b: string, c: boolean } =
    { ...o, ...o2 }
let combinedBefore: { a: number, b: string, c: boolean } =
    { b: 'ok', ...o, ...o2 }
let combinedMid: { a: number, b: string, c: boolean } =
    { ...o, b: 'ok', ...o2 }
let combinedAfter: { a: number, b: string, c: boolean } =
    { ...o, ...o2, b: 'ok' }
let combinedNested: { a: number, b: boolean, c: string, d: string } =
    { ...{ a: 4, ...{ b: false, c: 'overriden' } }, d: 'actually new', ...{ a: 5, d: 'maybe new' } }
let combinedNestedChangeType: { a: number, b: boolean, c: number } =
    { ...{ a: 1, ...{ b: false, c: 'overriden' } }, c: -1 }
let propertyNested: { a: { a: number, b: string } } =
    { a: { ... o } }
// accessors don't copy the descriptor
// (which means that readonly getters become read/write properties)
let op = { get a () { return 6 } };
let getter: { a: number, c: number } =
    { ...op, c: 7 }
getter.a = 12;

// functions result in { }
let spreadFunc = { ...(function () { }) };

// any results in any
let anything: any;
let spreadAny = { ...anything };

// methods are not enumerable
class C { p = 1; m() { } }
let c: C = new C()
let spreadC: { p: number } = { ...c }

// own methods are enumerable
let cplus: { p: number, plus(): void } = { ...c, plus() { return this.p + 1; } };
cplus.plus();

// new field's type conflicting with existing field is OK
let changeTypeAfter: { a: string, b: string } =
    { ...o, a: 'wrong type?' }
let changeTypeBefore: { a: number, b: string } =
    { a: 'wrong type?', ...o };
let changeTypeBoth: { a: string, b: number } =
    { ...o, ...swap };

// optional
let definiteBoolean: { sn: boolean };
let definiteString: { sn: string };
let optionalString: { sn?: string };
let optionalNumber: { sn?: number };
let optionalUnionStops: { sn: string | number | boolean } = { ...definiteBoolean, ...definiteString, ...optionalNumber };
let optionalUnionDuplicates: { sn: string | number } = { ...definiteBoolean, ...definiteString, ...optionalString, ...optionalNumber };
let allOptional: { sn?: string | number } = { ...optionalString, ...optionalNumber };

// computed property
let computedFirst: { a: number, b: string, "before everything": number } =
    { ['before everything']: 12, ...o, b: 'yes' }
let computedMiddle: { a: number, b: string, c: boolean, "in the middle": number } =
    { ...o, ['in the middle']: 13, b: 'maybe?', ...o2 }
let computedAfter: { a: number, b: string, "at the end": number } =
    { ...o, b: 'yeah', ['at the end']: 14 }
// shortcut syntax
let a = 12;
let shortCutted: { a: number, b: string } = { ...o, a }
// non primitive
let spreadNonPrimitive = { ...<object>{}};
