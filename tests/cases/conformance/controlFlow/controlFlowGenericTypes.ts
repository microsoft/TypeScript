// @strict: true

function f1<T extends string | undefined>(x: T, y: { a: T }, z: [T]): string {
    if (x) {
        x;
        x.length;
        return x;
    }
    if (y.a) {
        y.a.length;
        return y.a;
    }
    if (z[0]) {
        z[0].length;
        return z[0];
    }
    return "hello";
}

function f2<T>(x: Extract<T, string | undefined> | null): string {
    if (x) {
        x;
        x.length;
        return x;
    }
    return "hello";
}

interface Box<T> {
    item: T;
}

declare function isBox(x: any): x is Box<unknown>;
declare function isUndefined(x: unknown): x is undefined;
declare function unbox<T>(x: Box<T>): T;

function g1<T extends Box<T> | undefined>(x: T) {
    if (isBox(x)) {
        unbox(x);
    }
}

function g2<T extends Box<T> | undefined>(x: T) {
    if (!isUndefined(x)) {
        unbox(x);
    }
}

function g3<T extends Box<T> | undefined>(x: T) {
    if (!isBox(x)) {
        unbox(x);  // Error
    }
}

function g4<T extends Box<T> | undefined>(x: T) {
    if (isUndefined(x)) {
        unbox(x);  // Error
    }
}

// Repro from #13995

declare function takeA(val: 'A'): void;
export function bounceAndTakeIfA<AB extends 'A' | 'B'>(value: AB): AB {
    if (value === 'A') {
        takeA(value);
        return value;
    }
    else {
        return value;
    }
}

// Repro from #13995

type Common = { id: number };
type AA = { tag: 'A', id: number };
type BB = { tag: 'B', id: number, foo: number };

type MyUnion = AA | BB;

const fn = (value: MyUnion) => {
    value.foo;  // Error
    if ('foo' in value) {
        value.foo;
    }
    if (value.tag === 'B') {
        value.foo;
    }
};

const fn2 = <T extends MyUnion>(value: T): MyUnion => {
    value.foo;  // Error
    if ('foo' in value) {
        value.foo;
    }
    if (value.tag === 'B') {
        value.foo;
    }
};

// Repro from #13995

type A1 = {
    testable: true
    doTest: () => void
}
type B1 = {
    testable: false
};

type Union = A1 | B1

function notWorking<T extends Union>(object: T) {
    if (!object.testable) return;
    object.doTest();
}

// Repro from #42939

interface A {
    a: number | null;
};

function get<K extends keyof A>(key: K, obj: A): number {
    const value = obj[key];
    if (value !== null) {
        return value;
    }
    return 0;
};

// Repro from #44093

class EventEmitter<ET> {
    off<K extends keyof ET>(...args: [K, number] | [unknown, string]):void {}
}
function once<ET, T extends EventEmitter<ET>>(emittingObject: T, eventName: keyof ET): void {
    emittingObject.off(eventName, 0);
    emittingObject.off(eventName as typeof eventName, 0);
}

// In an element access obj[key], we consider obj to be in a constraint position, except when
// obj and key both have generic types. When obj and key are of generic types T and K, we want
// the resulting type to be T[K].

function fx1<T, K extends keyof T>(obj: T, key: K) {
    const x1 = obj[key];
    const x2 = obj && obj[key];
    const x3 = obj?.[key];
}

function fx2<T extends Record<keyof T, string>, K extends keyof T>(obj: T, key: K) {
    const x1 = obj[key];
    const x2 = obj && obj[key];
    const x3 = obj?.[key];
}

function fx3<T extends Record<keyof T, string> | undefined, K extends keyof T>(obj: T, key: K) {
    const x1 = obj[key];
    const x2 = obj && obj[key];
    const x3 = obj?.[key];
}

function fx4<T extends unknown, K extends keyof T>(obj: T, key: K) {
    const x1 = obj[key];
    const x2 = obj && obj[key];
    const x3 = obj?.[key];
}

function fx5<T extends {} | null | undefined, K extends keyof T>(obj: T, key: K) {
    const x1 = obj[key];
    const x2 = obj && obj[key];
    const x3 = obj?.[key];
}

function fx6<T, K extends keyof T>(obj: T | null | undefined, key: K) {
    const x1 = obj[key];  // Error
    const x2 = obj && obj[key];
    const x3 = obj?.[key];
}

function fx7<T, K extends keyof T>(obj: { x: T } | null | undefined, key: K) {
    const x1 = obj.x[key];  // Error
    const x2 = obj && obj.x[key];
    const x3 = obj?.x[key];
}

// Repro from #44166

class TableBaseEnum<
    PublicSpec extends Record<keyof InternalSpec, any>,
    InternalSpec extends Record<keyof PublicSpec, any>  | undefined = undefined> {
    m() {
        let iSpec = null! as InternalSpec;
        iSpec[null! as keyof InternalSpec];
        iSpec[null! as keyof PublicSpec];    // Error
        if (iSpec === undefined) {
            return;
        }
        iSpec[null! as keyof InternalSpec];
        iSpec[null! as keyof PublicSpec];
    }
}

// Repros from #45145

function f10<T extends { a: string } | undefined>(x: T, y: Partial<T>) {
    y = x;
}

type SqlInsertSet<T> = T extends undefined ? object : { [P in keyof T]: unknown };

class SqlTable<T> {
    protected validateRow(_row: Partial<SqlInsertSet<T>>): void {
    }
    public insertRow(row: SqlInsertSet<T>) {
        this.validateRow(row);
    }
}

// Repro from #46495

interface Button {
    type: "button";
    text: string;
}

interface Checkbox {
    type: "checkbox";
    isChecked: boolean;
}

type Control = Button | Checkbox;

function update<T extends Control, K extends keyof T>(control : T | undefined, key: K, value: T[K]): void {
    if (control !== undefined) {
        control[key] = value;
    }
}

// Repro from #50465

type Column<T> = (keyof T extends never ? { id?: number | string } : { id: T }) & { title?: string; }

function getColumnProperty<T>(column: Column<T>, key: keyof Column<T>) {
  return column[key];
}
