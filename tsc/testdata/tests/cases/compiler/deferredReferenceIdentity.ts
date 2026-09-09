// @strict: true
// @noEmit: true

interface Box<T> { value: T; }
interface DerivedBox<T> extends Box<T> { extra: true; }
interface WrongBox<T> { value: T; extra: false; }
type Value<T> = T extends { value: unknown } ? T["value"] : never;
type Wrapped<T> = Box<Value<T>>;
type Derived<T> = DerivedBox<Value<T>>;
type Wrong<T> = WrongBox<Value<T>>;
interface NumberValue { value: number; }
interface StringValue { value: string; }

declare function wrapped<T>(): Wrapped<T>;
declare function derived<T>(): Derived<T>;
declare function wrong<T>(): Wrong<T>;

const same: Wrapped<NumberValue> = wrapped<NumberValue>();
const inherited: Wrapped<NumberValue> = derived<NumberValue>();
const different: Wrapped<NumberValue> = wrapped<StringValue>();
const differentInherited: Wrapped<NumberValue> = derived<StringValue>();
const missing: Derived<NumberValue> = wrapped<NumberValue>();
const wrongMember: Derived<NumberValue> = wrong<NumberValue>();

interface Pair { left: number; right: string; }
type Left<T extends Pair> = Box<T["left"]>;
type Right<T extends Pair> = Box<T["right"]>;
declare function left<T extends Pair>(): Left<T>;
declare function right<T extends Pair>(): Right<T>;
const sameIndex: Left<Pair> = left<Pair>();
const differentIndex: Left<Pair> = right<Pair>();

interface FieldBox<T extends { field: unknown }> { value: T["field"]; }
interface NumberBox<T> { value: number; tag?: T; }
interface StringField { field: string; }
type Field<T extends { field: unknown }> = FieldBox<T>;
type NumberField<T> = NumberBox<T>;
declare function numberField<T>(): NumberField<T>;
const incompatibleConstraint: Field<StringField> = numberField<StringField>();

function outer<T>(value: T) {
    interface Inner<U> { outer: T; inner: U; }
    type Deferred<U> = Inner<U>;
    return null! as Deferred<number>;
}
const differentOuter: ReturnType<typeof outer<string>> = outer(123);

function annotationCycles<T extends { value: unknown }>() {
    let direct: Array<typeof direct>;
    let withIndex: Array<T["value"] | typeof withIndex>;
    let tuple: [typeof tuple, T["value"]];
}

export {};
