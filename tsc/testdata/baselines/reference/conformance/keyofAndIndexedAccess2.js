//// [tests/cases/conformance/types/keyof/keyofAndIndexedAccess2.ts] ////

//// [keyofAndIndexedAccess2.ts]
function f1(obj: { a: number, b: 0 | 1, c: string }, k0: 'a', k1: 'a' | 'b', k2: 'a' | 'b' | 'c') {
    obj[k0] = 1;
    obj[k0] = 2;
    obj[k0] = 'x';  // Error
    obj[k1] = 1;
    obj[k1] = 2;    // Error
    obj[k1] = 'x';  // Error
    obj[k2] = 1;    // Error
    obj[k2] = 2;    // Error
    obj[k2] = 'x';  // Error
}

function f2<T extends { [key: string]: number }>(a: { x: number, y: number }, b: { [key: string]: number }, c: T, k: keyof T) {
    a = b;  // Error, index signature in source doesn't imply properties are present
    a = c;  // Error, index signature in source doesn't imply properties are present
    b = a;
    b = c;
    c = a;  // Error, constraint on target doesn't imply any properties or signatures
    c = b;  // Error, constraint on target doesn't imply any properties or signatures
    a.x;
    b.x;
    c.x;
    c[k];
    a.x = 1;
    b.x = 1;
    c.x = 1;  // Error, cannot write to index signature through constraint
    c[k] = 1; // Error, cannot write to index signature through constraint
}

function f3<K extends string>(a: { [P in K]: number }, b: { [key: string]: number }, k: K) {
    a = b;  // Error, index signature doesn't imply properties are present
    b = a;
    a[k];
    a[k] = 1;
}

function f3b<K extends string>(a: { [P in K]: number }, b: { [P in string]: number }, k: K) {
    a = b;  // Error, index signature doesn't imply properties are present
    b = a;
}

function f4<K extends string>(a: { [key: string]: number }[K], b: number) {
  a = b;
  b = a;
}

type Item = { a: string, b: number };

function f10<T extends Item, K extends keyof T>(obj: T, k1: string, k2: keyof Item, k3: keyof T, k4: K) {
  obj[k1] = 123;  // Error
  obj[k2] = 123;  // Error
  obj[k3] = 123;  // Error
  obj[k4] = 123;  // Error
}

type Dict = Record<string, number>;

function f11<K extends keyof Dict>(obj: Dict, k1: keyof Dict, k2: K) {
  obj.foo = 123;
  obj[k1] = 123;
  obj[k2] = 123;
}

function f12<T extends Readonly<Dict>, K extends keyof T>(obj: T, k1: keyof Dict, k2: keyof T, k3: K) {
  obj.foo = 123;  // Error
  obj[k1] = 123;  // Error
  obj[k2] = 123;  // Error
  obj[k3] = 123;  // Error
}

// Repro from #27895

export interface Entity {
    id: number | string;
}

export type IdOf<E extends Entity> = E['id'];

export interface EntityState<E extends Entity> {
    ids: IdOf<E>[];
    entities: { [key: string]: E, [key: number]: E };
}


export function getAllEntities<E extends Entity>(state: EntityState<E>): E[] {
    const { ids, entities } = state;
    return ids.map(id => entities[id]);
}

export function getEntity<E extends Entity>(id: IdOf<E>, state: EntityState<E>): E | undefined {
    const { ids, entities } = state;

    if (!ids.includes(id)) {
        return undefined;
    }

    return entities[id];
}

// Repro from #30603

interface Type {
    a: 123;
    b: "some string";
}

function get123<K extends keyof Type>(): Type[K] {
    return 123;  // Error
}

// Repro from #30920

type StrictExtract<T, U> = T extends U ? U extends T ? T : never : never;
type StrictExclude<T, U> = T extends StrictExtract<T, U> ? never : T;
type A<T> = { [Q in { [P in keyof T]: P; }[keyof T]]: T[Q]; };
type B<T, V> = A<{ [Q in keyof T]: StrictExclude<B<T[Q], V>, {}>; }>;

// Repros from #30938

function fn<T extends {elements: Array<string>} | {elements: Array<number>}>(param: T, cb: (element: T['elements'][number]) => void) {
    cb(param.elements[0]);
}

function fn2<T extends Array<string>>(param: T, cb: (element: T[number]) => void) {
    cb(param[0]);
}

// Repro from #31149

function fn3<T extends ReadonlyArray<string>>(param: T, cb: (element: T[number]) => void) {
    cb(param[0]);
}

function fn4<K extends number>() {
    let x: Array<string>[K] = 'abc';
    let y: ReadonlyArray<string>[K] = 'abc';
}

// Repro from #31439 and #31691

export class c {
  [x: string]: string;
  constructor() {
    this.a = "b";
    this["a"] = "b";
  }
}

// Repro from #31385

type Foo<T> = { [key: string]: { [K in keyof T]: K }[keyof T] };

type Bar<T> = { [key: string]: { [K in keyof T]: [K] }[keyof T] };

type Baz<T, Q extends Foo<T>> = { [K in keyof Q]: T[Q[K]] };

type Qux<T, Q extends Bar<T>> = { [K in keyof Q]: T[Q[K]["0"]] };

// Repro from #32038

const actions = ['resizeTo', 'resizeBy'] as const;
for (const action of actions) {
	window[action] = (x, y) => {
		window[action](x, y);
	}
}


//// [keyofAndIndexedAccess2.js]
function f1(obj, k0, k1, k2) {
    obj[k0] = 1;
    obj[k0] = 2;
    obj[k0] = 'x'; // Error
    obj[k1] = 1;
    obj[k1] = 2; // Error
    obj[k1] = 'x'; // Error
    obj[k2] = 1; // Error
    obj[k2] = 2; // Error
    obj[k2] = 'x'; // Error
}
function f2(a, b, c, k) {
    a = b; // Error, index signature in source doesn't imply properties are present
    a = c; // Error, index signature in source doesn't imply properties are present
    b = a;
    b = c;
    c = a; // Error, constraint on target doesn't imply any properties or signatures
    c = b; // Error, constraint on target doesn't imply any properties or signatures
    a.x;
    b.x;
    c.x;
    c[k];
    a.x = 1;
    b.x = 1;
    c.x = 1; // Error, cannot write to index signature through constraint
    c[k] = 1; // Error, cannot write to index signature through constraint
}
function f3(a, b, k) {
    a = b; // Error, index signature doesn't imply properties are present
    b = a;
    a[k];
    a[k] = 1;
}
function f3b(a, b, k) {
    a = b; // Error, index signature doesn't imply properties are present
    b = a;
}
function f4(a, b) {
    a = b;
    b = a;
}
function f10(obj, k1, k2, k3, k4) {
    obj[k1] = 123; // Error
    obj[k2] = 123; // Error
    obj[k3] = 123; // Error
    obj[k4] = 123; // Error
}
function f11(obj, k1, k2) {
    obj.foo = 123;
    obj[k1] = 123;
    obj[k2] = 123;
}
function f12(obj, k1, k2, k3) {
    obj.foo = 123; // Error
    obj[k1] = 123; // Error
    obj[k2] = 123; // Error
    obj[k3] = 123; // Error
}
export function getAllEntities(state) {
    const { ids, entities } = state;
    return ids.map(id => entities[id]);
}
export function getEntity(id, state) {
    const { ids, entities } = state;
    if (!ids.includes(id)) {
        return undefined;
    }
    return entities[id];
}
function get123() {
    return 123; // Error
}
// Repros from #30938
function fn(param, cb) {
    cb(param.elements[0]);
}
function fn2(param, cb) {
    cb(param[0]);
}
// Repro from #31149
function fn3(param, cb) {
    cb(param[0]);
}
function fn4() {
    let x = 'abc';
    let y = 'abc';
}
// Repro from #31439 and #31691
export class c {
    constructor() {
        this.a = "b";
        this["a"] = "b";
    }
}
// Repro from #32038
const actions = ['resizeTo', 'resizeBy'];
for (const action of actions) {
    window[action] = (x, y) => {
        window[action](x, y);
    };
}
