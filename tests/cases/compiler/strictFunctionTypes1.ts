// @strict: true
// @declaration: true

declare function f1<T>(f1: (x: T) => void, f2: (x: T) => void): (x: T) => void;
declare function f2<T>(obj: T, f1: (x: T) => void, f2: (x: T) => void): T;
declare function f3<T>(obj: T, f1: (x: T) => void, f2: (f: (x: T) => void) => void): T;

interface Func<T> { (x: T): void }

declare function f4<T>(f1: Func<T>, f2: Func<T>): Func<T>;

declare function fo(x: Object): void;
declare function fs(x: string): void;
declare function fx(f: (x: "def") => void): void;

const x1 = f1(fo, fs);  // (x: string) => void
const x2 = f2("abc", fo, fs);  // "abc"
const x3 = f3("abc", fo, fx);  // "abc" | "def"
const x4 = f4(fo, fs);  // Func<string>

declare const never: never;

const x10 = f2(never, fo, fs);  // string
const x11 = f3(never, fo, fx);  // "def"

// Repro from #21112

declare function foo<T>(a: ReadonlyArray<T>): T;
let x = foo([]);  // never

// Modified repros from #26127

interface A { a: string }
interface B extends A { b: string }

declare function acceptUnion(x: A | number): void;
declare function acceptA(x: A): void;

declare let a: A;
declare let b: B;

declare function coAndContra<T>(value: T, func: (t: T) => void): T;

const t1: A = coAndContra(a, acceptUnion);
const t2: B = coAndContra(b, acceptA);
const t3: A = coAndContra(never, acceptA);

declare function coAndContraArray<T>(value: T[], func: (t: T) => void): T[];

const t4: A[] = coAndContraArray([a], acceptUnion);
const t5: B[] = coAndContraArray([b], acceptA);
const t6: A[] = coAndContraArray([], acceptA);
