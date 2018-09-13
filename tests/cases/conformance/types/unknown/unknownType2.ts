// @strict: true

type isUnknown<T> = unknown extends T ? true : false;
type isTrue<T extends true> = T;

type SomeResponse = 'yes' | 'no' | 'idk';
let validate: (x: unknown) => SomeResponse = x => (x === 'yes' || x === 'no') ? x : 'idk'; // No error

const u: unknown = undefined;

declare const symb: unique symbol;

if (u === 5) {
    const y = u.toString(10);
}

if (u === true || u === false) {
    const someBool: boolean = u;
}

if (u === undefined) {
    const undef: undefined = u;
}

if (u === null) {
    const someNull: null = u;
}

if (u === symb) {
    const symbolAlias: typeof symb = u;
}

if (!(u === 42)) {
    type A = isTrue<isUnknown<typeof u>>
}

if (u !== 42) {
    type B = isTrue<isUnknown<typeof u>>
}

if (u == 42) {
    type C = isTrue<isUnknown<typeof u>>
}

if (u == true) {
    type D = isTrue<isUnknown<typeof u>>
}

if (u == Object) {
    type E = isTrue<isUnknown<typeof u>>
}

declare const aString: string;
declare const aBoolean: boolean;
declare const aNumber: number;
declare const anObject: object;
declare const anObjectLiteral: { x: number };
declare const aUnion: { x: number } | { y: string };
declare const anIntersection: { x: number } & { y: string };
declare const aFunction: () => number;

if (u === aString) {
    let uString: string = u;
}

if (u === aBoolean) {
    let uString: boolean = u;
}

if (u === aNumber) {
    let uNumber: number = u;
}

if (u === anObject) {
    let uObject: object = u;
}

if (u === anObjectLiteral) {
    let uObjectLiteral: object = u;
}

if (u === aUnion) {
    type unionDoesNotNarrow = isTrue<isUnknown<typeof u>>
}

if (u === anIntersection) {
    type intersectionDoesNotNarrow = isTrue<isUnknown<typeof u>>
}

if (u === aFunction) {
    let uFunction: object = u;
}

enum NumberEnum {
    A,
    B,
    C
}

enum StringEnum {
    A = "A",
    B = "B",
    C = "C"
}

if (u === NumberEnum || u === StringEnum) {
    let enumObj: object = u;
}

if(u === NumberEnum.A) {
    let a: NumberEnum.A = u
}

if(u === StringEnum.B) {
    let b: StringEnum.B = u
}
