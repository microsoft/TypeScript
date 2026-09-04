// @strict: true
// @noEmit: true

// The recursive getter written the several ways it comes up: as a class's static, nested inside
// another object literal, through an intermediate call, spelled out with an annotation, and twice
// over in one file. main reports TS7022/TS7023 on every one of these, and TS2502 on the annotated
// one.

interface Schema<O> {
    readonly out: O;
}
type Shape = Record<string, Schema<any>>;
declare function object<S extends Shape>(shape: S): Schema<{ [K in keyof S]: S[K]["out"] }> & { shape: S };
declare function arr<T extends Schema<any>>(t: T): Schema<T["out"][]>;
declare const leaf: Schema<string>;

class Holder {
    static readonly schema = object({
        name: leaf,
        get self() {
            return Holder.schema;
        },
    });
}
declare const fromClass: typeof Holder.schema.out;
const className: string = fromClass.name;

const nested = object({
    name: leaf,
    get inner() {
        return object({ deeper: nested });
    },
});
declare const fromNested: typeof nested.out;
const nestedName: string = fromNested.inner.deeper.name;

const viaCall = object({
    name: leaf,
    get items() {
        return arr(viaCall);
    },
});
declare const fromCall: typeof viaCall.out;
const callName: string = fromCall.items[0].items[0].name;

const annotated = object({
    name: leaf,
    get self(): typeof annotated {
        return annotated;
    },
});
declare const fromAnnotated: typeof annotated.out;
const annotatedName: string = fromAnnotated.self.self.name;

// Two independent recursive schemas must not contaminate each other.
const first = object({ a: leaf, get me() { return first; } });
const second = object({ b: leaf, get me() { return second; } });
declare const fromFirst: typeof first.out;
declare const fromSecond: typeof second.out;
const firstA: string = fromFirst.me.a;
const secondB: string = fromSecond.me.b;

// Every assertion above still passes if the type degraded to `any`. These do not; each names a key the
// schema does not have.
// @ts-expect-error
fromClass.self.missing;
// @ts-expect-error
fromNested.inner.deeper.missing;
// @ts-expect-error
fromCall.items[0].missing;
// @ts-expect-error
fromAnnotated.self.missing;
// @ts-expect-error
fromFirst.me.missing;
// @ts-expect-error
fromSecond.me.missing;
