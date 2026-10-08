currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/consumer/index.ts] *new* 
import { arrow, expression, first, generic, objectReturn, tupleReturn, shadowed } from "../producer/dist/index.js";
import { object, method, accessor, tuple, array, nested } from "../producer/dist/index.js";
import { memberTuple, memberArray, quoted, numeric, key, computed, union, specialized } from "../producer/dist/index.js";
import { indexed, mapped, viaAnnotation } from "../producer/dist/index.js";
import { nextLink, nextCallable, parenthesized, asserted, Methods, overloaded } from "../producer/dist/index.js";
import { hiddenAlias, siblingHiddenAliases } from "../producer/dist/index.js";
import { nestedNumber } from "../producer/dist/index.js";
const a: typeof arrow = arrow()()();
const b: typeof expression = expression()()();
const c: typeof first = first()()();
const d: typeof generic = generic(1)("text")(true);
const objectCall: typeof objectReturn = objectReturn().call().call;
const tupleCall: typeof tupleReturn = tupleReturn()[0]()[0];
const shadowedCall: typeof shadowed = shadowed(1)(2);
const objectValue: number = object.next().next().value;
const methodValue: number = method.next().next().value;
const accessorValue: number = accessor.next.next.value;
const tupleValue: typeof tuple = tuple[0]()[0]();
const arrayValue: typeof array = array[0]()[0]();
const nestedValue: typeof nested.inner = nested.inner.next().next();
const memberTupleValue: typeof memberTuple[0] = memberTuple[0]()();
const memberArrayValue: typeof memberArray[0] = memberArray[0]()();
const quotedValue: typeof quoted["a-b"] = quoted["a-b"]()();
const numericValue: typeof numeric[0] = numeric[0]()();
const computedValue: typeof computed[typeof key] = computed[key]()();
const unionValue: typeof union = union?.next()?.next();
const specializedValue: string = specialized.next().next().value;
const indexedValue: typeof indexed = indexed["next"]["next"];
const mappedValue: typeof mapped = mapped.next.next;
const annotationValue: string = viaAnnotation.next().next().value;
const linkValue: string = nextLink.next.next.value;
const callableValue: number = nextCallable(1)(2).link.next.value;
const parenthesizedValue: typeof parenthesized = parenthesized()()();
const assertedValue: typeof asserted = asserted()()();
const methodReference: typeof Methods.recur = Methods.recur()()();
const quotedMethodReference: typeof Methods["a-b"] = Methods["a-b"]()()();
const computedMethodReference: typeof Methods[typeof key] = Methods[key]()()();
const instance = new Methods();
const instanceMethodReference: typeof instance.recur = instance.recur()()();
const overloadReference: typeof overloaded = overloaded(1)("text")(2);
const hiddenValue: string = hiddenAlias.next.next.value;
const siblingHiddenValue: string = siblingHiddenAliases.second.next.next.value;
const nestedString = nestedNumber.nested(true).owner.make("text").nested(2);
const nestedBoolean = nestedString.owner.make(true).nested("inner");
const nestedStringOuter: string = nestedString.outer;
const nestedStringInner: number = nestedString.inner;
const nestedBooleanOuter: boolean = nestedBoolean.outer;
const nestedBooleanInner: string = nestedBoolean.inner;
const constrainedOuter: number = nestedNumber.constrained(2).outer;
const constrainedInner: number = nestedNumber.constrained(2).inner;
const copiedOuter: number = nestedNumber.copied("inner").outer;
const copiedInner: string = nestedNumber.copied("inner").inner;
const restOuter: number = nestedNumber.rest(true).outer;
const restInner: boolean = nestedNumber.rest(true).inner;
type IsAny<T> = 0 extends (1 & T) ? true : false;
const result = arrow()()();
const notAny: false = null as unknown as IsAny<typeof result>;
const invalid: number = arrow()()();
const invalidExpression: number = expression()()();
const invalidObject: number = objectReturn().call;
const invalidTuple: number = tupleReturn()[0];
const invalidShadowed: number = shadowed(1);
const invalidObjectValue: string = object.next().value;
const invalidTupleValue: number = tuple[0]();
const invalidSpecialized: number = specialized.next().value;
const invalidMapped: number = mapped.next;
const invalidAnnotation: number = viaAnnotation.next().value;
const invalidLink: number = nextLink.next.value;
const invalidCallable: string = nextCallable(1).link.value;
const invalidHiddenValue: number = hiddenAlias.next.next.value;
const invalidMethod: number = Methods.recur()();
const invalidComputedMethod: number = Methods[key]()();
const invalidNestedOuter: boolean = nestedString.outer;
const invalidNestedInner: string = nestedString.inner;
nestedNumber.constrained("wrong");
//// [/home/src/workspaces/project/consumer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "noEmit": true },
					"references": [{ "path": "../producer" }]
				}
//// [/home/src/workspaces/project/producer/index.ts] *new* 
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = <T>(value: T) => generic;
export const objectReturn = () => ({ call: objectReturn });
export const tupleReturn = () => [tupleReturn] as const;
export const shadowed = function self(shadowed: number) { return self; };
export const object = { value: 1, next: () => object };
export const method = { value: 1, next() { return method; } };
export const accessor = { value: 1, get next() { return accessor; } };
export const tuple = [() => tuple] as const;
export const array = [() => array];
export const nested = { inner: { next() { return nested.inner; } } };
export const memberTuple = [function self() { return self; }] as const;
export const memberArray = [function self() { return self; }];
export const quoted = { "a-b": function self() { return self; } };
export const numeric = { 0: function self() { return self; } };
export const key = Symbol();
export const computed = { [key]: function self() { return self; } };
export const union = true as boolean ? { next: () => union } : undefined;
function create<T>(value: T) {
    const result = { value, next: () => result };
    return result;
}
export const specialized = create("text");
function createIndexed() {
    const value: { [key: string]: typeof value } = {};
    return value;
}
export const indexed = createIndexed();
function createMapped<T>() {
    const value: { [K in keyof T]: typeof value } = null!;
    return value;
}
export const mapped = createMapped<{ next: unknown }>();
function createAnnotated<T>(value: T) {
    const node: { value: T; next: () => typeof node } = { value, next: () => node };
    return node;
}
export const viaAnnotation = createAnnotated("text");
export type Link<T> = { value: T; next: Link<T> };
export type Callable<T> = { (value: T): Callable<T>; link: Link<T> };
export declare const link: Link<string>;
export declare const callable: Callable<number>;
export const nextLink = link.next;
export const nextCallable = callable(1);
function createHidden<T>(value: T) {
    type Hidden = { value: T; next: Hidden };
    return null! as Hidden;
}
export const hiddenAlias = createHidden("text");
export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
export const parenthesized = (function self() { return self; });
export const asserted = (function self() { return self; }) satisfies () => unknown;
export class Methods {
    static recur() { return Methods.recur; }
    static "a-b"() { return Methods["a-b"]; }
    static [key]() { return Methods[key]; }
    recur() { return this.recur; }
}
export function overloaded(value: string): typeof overloaded;
export function overloaded(value: number): typeof overloaded;
export function overloaded(value: string | number) { return overloaded; }
export const nestedOwner = {
    make<T>(outer: T) {
        return {
            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },
            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },
            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {
                return { outer, inner, owner: nestedOwner };
            },
            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },
        };
    },
};
export const nestedNumber = nestedOwner.make(1);
//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
					"compilerOptions": { "strict": true, "composite": true, "outDir": "dist" }
				}

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'arrow' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m1[0m export const arrow = () => arrow;
[7m [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'expression' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const expression = function self() { return self; };
[7m [0m [91m             ~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m6[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'objectReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m6[0m export const objectReturn = () => ({ call: objectReturn });
[7m [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m7[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'tupleReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m7[0m export const tupleReturn = () => [tupleReturn] as const;
[7m [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m9[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'object' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m9[0m export const object = { value: 1, next: () => object };
[7m [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m10[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'method' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m10[0m export const method = { value: 1, next() { return method; } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m11[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'accessor' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m11[0m export const accessor = { value: 1, get next() { return accessor; } };
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m12[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'tuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m12[0m export const tuple = [() => tuple] as const;
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m13[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'array' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m13[0m export const array = [() => array];
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m14[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nested' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m14[0m export const nested = { inner: { next() { return nested.inner; } } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m15[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'memberTuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m15[0m export const memberTuple = [function self() { return self; }] as const;
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m16[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'memberArray' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m16[0m export const memberArray = [function self() { return self; }];
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m17[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'quoted' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m17[0m export const quoted = { "a-b": function self() { return self; } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m18[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'numeric' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m18[0m export const numeric = { 0: function self() { return self; } };
[7m  [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m20[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'computed' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m20[0m export const computed = { [key]: function self() { return self; } };
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m21[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'union' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m21[0m export const union = true as boolean ? { next: () => union } : undefined;
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m26[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'specialized' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m26[0m export const specialized = create("text");
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m31[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'indexed' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m31[0m export const indexed = createIndexed();
[7m  [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m36[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mapped' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m36[0m export const mapped = createMapped<{ next: unknown }>();
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m41[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'viaAnnotation' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m41[0m export const viaAnnotation = createAnnotated("text");
[7m  [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m52[0m:[93m14[0m - [91merror[0m[90m TS4025: [0mExported variable 'hiddenAlias' has or is using private name 'Hidden'.

[7m52[0m export const hiddenAlias = createHidden("text");
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m53[0m:[93m14[0m - [91merror[0m[90m TS4025: [0mExported variable 'siblingHiddenAliases' has or is using private name 'Hidden'.

[7m53[0m export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
[7m  [0m [91m             ~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m54[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'parenthesized' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m54[0m export const parenthesized = (function self() { return self; });
[7m  [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m55[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'asserted' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m55[0m export const asserted = (function self() { return self; }) satisfies () => unknown;
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m58[0m:[93m12[0m - [91merror[0m[90m TS5088: [0mThe inferred type of '"a-b"' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m58[0m     static "a-b"() { return Methods["a-b"]; }
[7m  [0m [91m           ~~~~~[0m

[96mproducer/index.ts[0m:[93m59[0m:[93m12[0m - [91merror[0m[90m TS5088: [0mThe inferred type of '[key]' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m59[0m     static [key]() { return Methods[key]; }
[7m  [0m [91m           ~~~~~[0m

[96mproducer/index.ts[0m:[93m60[0m:[93m5[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'recur' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m60[0m     recur() { return this.recur; }
[7m  [0m [91m    ~~~~~[0m

[96mproducer/index.ts[0m:[93m65[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedOwner' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m65[0m export const nestedOwner = {
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m77[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedNumber' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m77[0m export const nestedNumber = nestedOwner.make(1);
[7m  [0m [91m             ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m88[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { arrow, expression, first, generic, objectReturn, tupleReturn, shadowed } from "../producer/dist/index.js";
[7m [0m [91m                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m2[0m:[93m64[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m2[0m import { object, method, accessor, tuple, array, nested } from "../producer/dist/index.js";
[7m [0m [91m                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m3[0m:[93m94[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m3[0m import { memberTuple, memberArray, quoted, numeric, key, computed, union, specialized } from "../producer/dist/index.js";
[7m [0m [91m                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m4[0m:[93m48[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m4[0m import { indexed, mapped, viaAnnotation } from "../producer/dist/index.js";
[7m [0m [91m                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m5[0m:[93m86[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m5[0m import { nextLink, nextCallable, parenthesized, asserted, Methods, overloaded } from "../producer/dist/index.js";
[7m [0m [91m                                                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m6[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m6[0m import { hiddenAlias, siblingHiddenAliases } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m7[0m:[93m30[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m7[0m import { nestedNumber } from "../producer/dist/index.js";
[7m [0m [91m                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 36 errors in 2 files.

Errors  Files
     7  consumer/index.ts[90m:1[0m
    29  producer/index.ts[90m:1[0m

//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./index.ts"],"semanticErrors":true}
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": "./index.ts"
    }
  ],
  "size": 71,
  "semanticErrors": true
}
//// [/home/src/workspaces/project/producer/dist/index.js] *new* 
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = (value) => generic;
export const objectReturn = () => ({ call: objectReturn });
export const tupleReturn = () => [tupleReturn];
export const shadowed = function self(shadowed) { return self; };
export const object = { value: 1, next: () => object };
export const method = { value: 1, next() { return method; } };
export const accessor = { value: 1, get next() { return accessor; } };
export const tuple = [() => tuple];
export const array = [() => array];
export const nested = { inner: { next() { return nested.inner; } } };
export const memberTuple = [function self() { return self; }];
export const memberArray = [function self() { return self; }];
export const quoted = { "a-b": function self() { return self; } };
export const numeric = { 0: function self() { return self; } };
export const key = Symbol();
export const computed = { [key]: function self() { return self; } };
export const union = true ? { next: () => union } : undefined;
function create(value) {
    const result = { value, next: () => result };
    return result;
}
export const specialized = create("text");
function createIndexed() {
    const value = {};
    return value;
}
export const indexed = createIndexed();
function createMapped() {
    const value = null;
    return value;
}
export const mapped = createMapped();
function createAnnotated(value) {
    const node = { value, next: () => node };
    return node;
}
export const viaAnnotation = createAnnotated("text");
export const nextLink = link.next;
export const nextCallable = callable(1);
function createHidden(value) {
    return null;
}
export const hiddenAlias = createHidden("text");
export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
export const parenthesized = (function self() { return self; });
export const asserted = (function self() { return self; });
export class Methods {
    static recur() { return Methods.recur; }
    static "a-b"() { return Methods["a-b"]; }
    static [key]() { return Methods[key]; }
    recur() { return this.recur; }
}
export function overloaded(value) { return overloaded; }
export const nestedOwner = {
    make(outer) {
        return {
            nested(inner) { return { outer, inner, owner: nestedOwner }; },
            constrained(inner) { return { outer, inner, owner: nestedOwner }; },
            copied(inner) {
                return { outer, inner, owner: nestedOwner };
            },
            rest(...values) { return { outer, inner: values[0], owner: nestedOwner }; },
        };
    },
};
export const nestedNumber = nestedOwner.make(1);

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"c50047250d0afa431800786fe8ac0f71-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);"],"options":{"composite":true,"outDir":"./","strict":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":18,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["arrow"]},{"pos":47,"end":57,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["expression"]},{"pos":226,"end":238,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["objectReturn"]},{"pos":286,"end":297,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["tupleReturn"]},{"pos":417,"end":423,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["object"]},{"pos":473,"end":479,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["method"]},{"pos":536,"end":544,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["accessor"]},{"pos":607,"end":612,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["tuple"]},{"pos":652,"end":657,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["array"]},{"pos":688,"end":694,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nested"]},{"pos":758,"end":769,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["memberTuple"]},{"pos":830,"end":841,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["memberArray"]},{"pos":893,"end":899,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["quoted"]},{"pos":960,"end":967,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["numeric"]},{"pos":1053,"end":1061,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["computed"]},{"pos":1122,"end":1127,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["union"]},{"pos":1298,"end":1309,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["specialized"]},{"pos":1443,"end":1450,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["indexed"]},{"pos":1591,"end":1597,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mapped"]},{"pos":1792,"end":1805,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["viaAnnotation"]},{"pos":2246,"end":2257,"code":4025,"category":1,"messageKey":"Exported_variable_0_has_or_is_using_private_name_1_4025","messageArgs":["hiddenAlias","Hidden",""]},{"pos":2295,"end":2315,"code":4025,"category":1,"messageKey":"Exported_variable_0_has_or_is_using_private_name_1_4025","messageArgs":["siblingHiddenAliases","Hidden",""]},{"pos":2376,"end":2389,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["parenthesized"]},{"pos":2441,"end":2449,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["asserted"]},{"pos":2591,"end":2596,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["\"a-b\""]},{"pos":2637,"end":2642,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["[key]"]},{"pos":2674,"end":2679,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["recur"]},{"pos":2918,"end":2929,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nestedOwner"]},{"pos":3450,"end":3462,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nestedNumber"]}]]],"emitSignatures":[2]}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "c50047250d0afa431800786fe8ac0f71-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);",
      "signature": "c50047250d0afa431800786fe8ac0f71-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "emitDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 13,
          "end": 18,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "arrow"
          ]
        },
        {
          "pos": 47,
          "end": 57,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "expression"
          ]
        },
        {
          "pos": 226,
          "end": 238,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "objectReturn"
          ]
        },
        {
          "pos": 286,
          "end": 297,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "tupleReturn"
          ]
        },
        {
          "pos": 417,
          "end": 423,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "object"
          ]
        },
        {
          "pos": 473,
          "end": 479,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "method"
          ]
        },
        {
          "pos": 536,
          "end": 544,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "accessor"
          ]
        },
        {
          "pos": 607,
          "end": 612,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "tuple"
          ]
        },
        {
          "pos": 652,
          "end": 657,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "array"
          ]
        },
        {
          "pos": 688,
          "end": 694,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nested"
          ]
        },
        {
          "pos": 758,
          "end": 769,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "memberTuple"
          ]
        },
        {
          "pos": 830,
          "end": 841,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "memberArray"
          ]
        },
        {
          "pos": 893,
          "end": 899,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "quoted"
          ]
        },
        {
          "pos": 960,
          "end": 967,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "numeric"
          ]
        },
        {
          "pos": 1053,
          "end": 1061,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "computed"
          ]
        },
        {
          "pos": 1122,
          "end": 1127,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "union"
          ]
        },
        {
          "pos": 1298,
          "end": 1309,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "specialized"
          ]
        },
        {
          "pos": 1443,
          "end": 1450,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "indexed"
          ]
        },
        {
          "pos": 1591,
          "end": 1597,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mapped"
          ]
        },
        {
          "pos": 1792,
          "end": 1805,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "viaAnnotation"
          ]
        },
        {
          "pos": 2246,
          "end": 2257,
          "code": 4025,
          "category": 1,
          "messageKey": "Exported_variable_0_has_or_is_using_private_name_1_4025",
          "messageArgs": [
            "hiddenAlias",
            "Hidden",
            ""
          ]
        },
        {
          "pos": 2295,
          "end": 2315,
          "code": 4025,
          "category": 1,
          "messageKey": "Exported_variable_0_has_or_is_using_private_name_1_4025",
          "messageArgs": [
            "siblingHiddenAliases",
            "Hidden",
            ""
          ]
        },
        {
          "pos": 2376,
          "end": 2389,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "parenthesized"
          ]
        },
        {
          "pos": 2441,
          "end": 2449,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "asserted"
          ]
        },
        {
          "pos": 2591,
          "end": 2596,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "\"a-b\""
          ]
        },
        {
          "pos": 2637,
          "end": 2642,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "[key]"
          ]
        },
        {
          "pos": 2674,
          "end": 2679,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "recur"
          ]
        },
        {
          "pos": 2918,
          "end": 2929,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nestedOwner"
          ]
        },
        {
          "pos": 3450,
          "end": 3462,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nestedNumber"
          ]
        }
      ]
    ]
  ],
  "emitSignatures": [
    {
      "file": "../index.ts",
      "original": 2
    }
  ],
  "size": 10217
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [0]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'arrow' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m1[0m export const arrow = () => arrow;
[7m [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'expression' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const expression = function self() { return self; };
[7m [0m [91m             ~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m6[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'objectReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m6[0m export const objectReturn = () => ({ call: objectReturn });
[7m [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m7[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'tupleReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m7[0m export const tupleReturn = () => [tupleReturn] as const;
[7m [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m9[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'object' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m9[0m export const object = { value: 1, next: () => object };
[7m [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m10[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'method' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m10[0m export const method = { value: 1, next() { return method; } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m11[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'accessor' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m11[0m export const accessor = { value: 1, get next() { return accessor; } };
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m12[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'tuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m12[0m export const tuple = [() => tuple] as const;
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m13[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'array' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m13[0m export const array = [() => array];
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m14[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nested' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m14[0m export const nested = { inner: { next() { return nested.inner; } } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m15[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'memberTuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m15[0m export const memberTuple = [function self() { return self; }] as const;
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m16[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'memberArray' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m16[0m export const memberArray = [function self() { return self; }];
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m17[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'quoted' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m17[0m export const quoted = { "a-b": function self() { return self; } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m18[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'numeric' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m18[0m export const numeric = { 0: function self() { return self; } };
[7m  [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m20[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'computed' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m20[0m export const computed = { [key]: function self() { return self; } };
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m21[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'union' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m21[0m export const union = true as boolean ? { next: () => union } : undefined;
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m26[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'specialized' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m26[0m export const specialized = create("text");
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m31[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'indexed' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m31[0m export const indexed = createIndexed();
[7m  [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m36[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mapped' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m36[0m export const mapped = createMapped<{ next: unknown }>();
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m41[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'viaAnnotation' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m41[0m export const viaAnnotation = createAnnotated("text");
[7m  [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m52[0m:[93m14[0m - [91merror[0m[90m TS4025: [0mExported variable 'hiddenAlias' has or is using private name 'Hidden'.

[7m52[0m export const hiddenAlias = createHidden("text");
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m53[0m:[93m14[0m - [91merror[0m[90m TS4025: [0mExported variable 'siblingHiddenAliases' has or is using private name 'Hidden'.

[7m53[0m export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
[7m  [0m [91m             ~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m54[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'parenthesized' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m54[0m export const parenthesized = (function self() { return self; });
[7m  [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m55[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'asserted' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m55[0m export const asserted = (function self() { return self; }) satisfies () => unknown;
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m58[0m:[93m12[0m - [91merror[0m[90m TS5088: [0mThe inferred type of '"a-b"' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m58[0m     static "a-b"() { return Methods["a-b"]; }
[7m  [0m [91m           ~~~~~[0m

[96mproducer/index.ts[0m:[93m59[0m:[93m12[0m - [91merror[0m[90m TS5088: [0mThe inferred type of '[key]' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m59[0m     static [key]() { return Methods[key]; }
[7m  [0m [91m           ~~~~~[0m

[96mproducer/index.ts[0m:[93m60[0m:[93m5[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'recur' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m60[0m     recur() { return this.recur; }
[7m  [0m [91m    ~~~~~[0m

[96mproducer/index.ts[0m:[93m65[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedOwner' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m65[0m export const nestedOwner = {
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m77[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedNumber' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m77[0m export const nestedNumber = nestedOwner.make(1);
[7m  [0m [91m             ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m88[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { arrow, expression, first, generic, objectReturn, tupleReturn, shadowed } from "../producer/dist/index.js";
[7m [0m [91m                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m2[0m:[93m64[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m2[0m import { object, method, accessor, tuple, array, nested } from "../producer/dist/index.js";
[7m [0m [91m                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m3[0m:[93m94[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m3[0m import { memberTuple, memberArray, quoted, numeric, key, computed, union, specialized } from "../producer/dist/index.js";
[7m [0m [91m                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m4[0m:[93m48[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m4[0m import { indexed, mapped, viaAnnotation } from "../producer/dist/index.js";
[7m [0m [91m                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m5[0m:[93m86[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m5[0m import { nextLink, nextCallable, parenthesized, asserted, Methods, overloaded } from "../producer/dist/index.js";
[7m [0m [91m                                                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m6[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m6[0m import { hiddenAlias, siblingHiddenAliases } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m7[0m:[93m30[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m7[0m import { nestedNumber } from "../producer/dist/index.js";
[7m [0m [91m                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 36 errors in 2 files.

Errors  Files
     7  consumer/index.ts[90m:1[0m
    29  producer/index.ts[90m:1[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [1]:: add a comment to the producer
//// [/home/src/workspaces/project/producer/index.ts] *modified* 
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = <T>(value: T) => generic;
export const objectReturn = () => ({ call: objectReturn });
export const tupleReturn = () => [tupleReturn] as const;
export const shadowed = function self(shadowed: number) { return self; };
export const object = { value: 1, next: () => object };
export const method = { value: 1, next() { return method; } };
export const accessor = { value: 1, get next() { return accessor; } };
export const tuple = [() => tuple] as const;
export const array = [() => array];
export const nested = { inner: { next() { return nested.inner; } } };
export const memberTuple = [function self() { return self; }] as const;
export const memberArray = [function self() { return self; }];
export const quoted = { "a-b": function self() { return self; } };
export const numeric = { 0: function self() { return self; } };
export const key = Symbol();
export const computed = { [key]: function self() { return self; } };
export const union = true as boolean ? { next: () => union } : undefined;
function create<T>(value: T) {
    const result = { value, next: () => result };
    return result;
}
export const specialized = create("text");
function createIndexed() {
    const value: { [key: string]: typeof value } = {};
    return value;
}
export const indexed = createIndexed();
function createMapped<T>() {
    const value: { [K in keyof T]: typeof value } = null!;
    return value;
}
export const mapped = createMapped<{ next: unknown }>();
function createAnnotated<T>(value: T) {
    const node: { value: T; next: () => typeof node } = { value, next: () => node };
    return node;
}
export const viaAnnotation = createAnnotated("text");
export type Link<T> = { value: T; next: Link<T> };
export type Callable<T> = { (value: T): Callable<T>; link: Link<T> };
export declare const link: Link<string>;
export declare const callable: Callable<number>;
export const nextLink = link.next;
export const nextCallable = callable(1);
function createHidden<T>(value: T) {
    type Hidden = { value: T; next: Hidden };
    return null! as Hidden;
}
export const hiddenAlias = createHidden("text");
export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
export const parenthesized = (function self() { return self; });
export const asserted = (function self() { return self; }) satisfies () => unknown;
export class Methods {
    static recur() { return Methods.recur; }
    static "a-b"() { return Methods["a-b"]; }
    static [key]() { return Methods[key]; }
    recur() { return this.recur; }
}
export function overloaded(value: string): typeof overloaded;
export function overloaded(value: number): typeof overloaded;
export function overloaded(value: string | number) { return overloaded; }
export const nestedOwner = {
    make<T>(outer: T) {
        return {
            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },
            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },
            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {
                return { outer, inner, owner: nestedOwner };
            },
            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },
        };
    },
};
export const nestedNumber = nestedOwner.make(1);
// comment-only edit


tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'arrow' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m1[0m export const arrow = () => arrow;
[7m [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'expression' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const expression = function self() { return self; };
[7m [0m [91m             ~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m6[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'objectReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m6[0m export const objectReturn = () => ({ call: objectReturn });
[7m [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m7[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'tupleReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m7[0m export const tupleReturn = () => [tupleReturn] as const;
[7m [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m9[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'object' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m9[0m export const object = { value: 1, next: () => object };
[7m [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m10[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'method' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m10[0m export const method = { value: 1, next() { return method; } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m11[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'accessor' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m11[0m export const accessor = { value: 1, get next() { return accessor; } };
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m12[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'tuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m12[0m export const tuple = [() => tuple] as const;
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m13[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'array' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m13[0m export const array = [() => array];
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m14[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nested' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m14[0m export const nested = { inner: { next() { return nested.inner; } } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m15[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'memberTuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m15[0m export const memberTuple = [function self() { return self; }] as const;
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m16[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'memberArray' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m16[0m export const memberArray = [function self() { return self; }];
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m17[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'quoted' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m17[0m export const quoted = { "a-b": function self() { return self; } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m18[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'numeric' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m18[0m export const numeric = { 0: function self() { return self; } };
[7m  [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m20[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'computed' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m20[0m export const computed = { [key]: function self() { return self; } };
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m21[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'union' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m21[0m export const union = true as boolean ? { next: () => union } : undefined;
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m26[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'specialized' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m26[0m export const specialized = create("text");
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m31[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'indexed' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m31[0m export const indexed = createIndexed();
[7m  [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m36[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mapped' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m36[0m export const mapped = createMapped<{ next: unknown }>();
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m41[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'viaAnnotation' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m41[0m export const viaAnnotation = createAnnotated("text");
[7m  [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m52[0m:[93m14[0m - [91merror[0m[90m TS4025: [0mExported variable 'hiddenAlias' has or is using private name 'Hidden'.

[7m52[0m export const hiddenAlias = createHidden("text");
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m53[0m:[93m14[0m - [91merror[0m[90m TS4025: [0mExported variable 'siblingHiddenAliases' has or is using private name 'Hidden'.

[7m53[0m export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
[7m  [0m [91m             ~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m54[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'parenthesized' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m54[0m export const parenthesized = (function self() { return self; });
[7m  [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m55[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'asserted' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m55[0m export const asserted = (function self() { return self; }) satisfies () => unknown;
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m58[0m:[93m12[0m - [91merror[0m[90m TS5088: [0mThe inferred type of '"a-b"' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m58[0m     static "a-b"() { return Methods["a-b"]; }
[7m  [0m [91m           ~~~~~[0m

[96mproducer/index.ts[0m:[93m59[0m:[93m12[0m - [91merror[0m[90m TS5088: [0mThe inferred type of '[key]' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m59[0m     static [key]() { return Methods[key]; }
[7m  [0m [91m           ~~~~~[0m

[96mproducer/index.ts[0m:[93m60[0m:[93m5[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'recur' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m60[0m     recur() { return this.recur; }
[7m  [0m [91m    ~~~~~[0m

[96mproducer/index.ts[0m:[93m65[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedOwner' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m65[0m export const nestedOwner = {
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m77[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedNumber' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m77[0m export const nestedNumber = nestedOwner.make(1);
[7m  [0m [91m             ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m88[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { arrow, expression, first, generic, objectReturn, tupleReturn, shadowed } from "../producer/dist/index.js";
[7m [0m [91m                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m2[0m:[93m64[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m2[0m import { object, method, accessor, tuple, array, nested } from "../producer/dist/index.js";
[7m [0m [91m                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m3[0m:[93m94[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m3[0m import { memberTuple, memberArray, quoted, numeric, key, computed, union, specialized } from "../producer/dist/index.js";
[7m [0m [91m                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m4[0m:[93m48[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m4[0m import { indexed, mapped, viaAnnotation } from "../producer/dist/index.js";
[7m [0m [91m                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m5[0m:[93m86[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m5[0m import { nextLink, nextCallable, parenthesized, asserted, Methods, overloaded } from "../producer/dist/index.js";
[7m [0m [91m                                                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m6[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m6[0m import { hiddenAlias, siblingHiddenAliases } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m7[0m:[93m30[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m7[0m import { nestedNumber } from "../producer/dist/index.js";
[7m [0m [91m                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 36 errors in 2 files.

Errors  Files
     7  consumer/index.ts[90m:1[0m
    29  producer/index.ts[90m:1[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/index.js] *modified* 
export const arrow = () => arrow;
export const expression = function self() { return self; };
export const first = () => second;
export const second = () => first;
export const generic = (value) => generic;
export const objectReturn = () => ({ call: objectReturn });
export const tupleReturn = () => [tupleReturn];
export const shadowed = function self(shadowed) { return self; };
export const object = { value: 1, next: () => object };
export const method = { value: 1, next() { return method; } };
export const accessor = { value: 1, get next() { return accessor; } };
export const tuple = [() => tuple];
export const array = [() => array];
export const nested = { inner: { next() { return nested.inner; } } };
export const memberTuple = [function self() { return self; }];
export const memberArray = [function self() { return self; }];
export const quoted = { "a-b": function self() { return self; } };
export const numeric = { 0: function self() { return self; } };
export const key = Symbol();
export const computed = { [key]: function self() { return self; } };
export const union = true ? { next: () => union } : undefined;
function create(value) {
    const result = { value, next: () => result };
    return result;
}
export const specialized = create("text");
function createIndexed() {
    const value = {};
    return value;
}
export const indexed = createIndexed();
function createMapped() {
    const value = null;
    return value;
}
export const mapped = createMapped();
function createAnnotated(value) {
    const node = { value, next: () => node };
    return node;
}
export const viaAnnotation = createAnnotated("text");
export const nextLink = link.next;
export const nextCallable = callable(1);
function createHidden(value) {
    return null;
}
export const hiddenAlias = createHidden("text");
export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
export const parenthesized = (function self() { return self; });
export const asserted = (function self() { return self; });
export class Methods {
    static recur() { return Methods.recur; }
    static "a-b"() { return Methods["a-b"]; }
    static [key]() { return Methods[key]; }
    recur() { return this.recur; }
}
export function overloaded(value) { return overloaded; }
export const nestedOwner = {
    make(outer) {
        return {
            nested(inner) { return { outer, inner, owner: nestedOwner }; },
            constrained(inner) { return { outer, inner, owner: nestedOwner }; },
            copied(inner) {
                return { outer, inner, owner: nestedOwner };
            },
            rest(...values) { return { outer, inner: values[0], owner: nestedOwner }; },
        };
    },
};
export const nestedNumber = nestedOwner.make(1);
// comment-only edit

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"633d60bb4cc3a6318b4832fd7a0a90fd-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\n// comment-only edit\n","signature":"87d31630156adc6eff09ac6a0e92ce90-export declare const arrow: any;\nexport declare const expression: any;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: any;\nexport declare const tupleReturn: any;\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: any;\nexport declare const method: any;\nexport declare const accessor: any;\nexport declare const tuple: any;\nexport declare const array: any;\nexport declare const nested: any;\nexport declare const memberTuple: any;\nexport declare const memberArray: any;\nexport declare const quoted: any;\nexport declare const numeric: any;\nexport declare const key: unique symbol;\nexport declare const computed: any;\nexport declare const union: any;\nexport declare const specialized: any;\nexport declare const indexed: any;\nexport declare const mapped: any;\nexport declare const viaAnnotation: any;\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: Hidden;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: Hidden;\n    };\n    second: {\n        value: string;\n        next: Hidden;\n    };\n};\nexport declare const parenthesized: any;\nexport declare const asserted: any;\nexport declare class Methods {\n    static recur(): typeof Methods.recur;\n    static \"a-b\"(): any;\n    static [key](): any;\n    recur(): any;\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: any;\nexport declare const nestedNumber: any;\n\n(13,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\narrow\n\n(47,10): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nexpression\n\n(226,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nobjectReturn\n\n(286,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ntupleReturn\n\n(417,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nobject\n\n(473,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmethod\n\n(536,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\naccessor\n\n(607,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ntuple\n\n(652,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\narray\n\n(688,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnested\n\n(758,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmemberTuple\n\n(830,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmemberArray\n\n(893,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nquoted\n\n(960,7): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnumeric\n\n(1053,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncomputed\n\n(1122,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nunion\n\n(1298,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nspecialized\n\n(1443,7): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nindexed\n\n(1591,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmapped\n\n(1792,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nviaAnnotation\n\n(2246,11): error4025: Exported_variable_0_has_or_is_using_private_name_1_4025\nhiddenAlias\nHidden\n\n\n(2295,20): error4025: Exported_variable_0_has_or_is_using_private_name_1_4025\nsiblingHiddenAliases\nHidden\n\n\n(2376,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nparenthesized\n\n(2441,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nasserted\n\n(2591,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\n\"a-b\"\n\n(2637,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\n[key]\n\n(2674,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nrecur\n\n(2918,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedOwner\n\n(3450,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedNumber\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"emitDiagnosticsPerFile":[[2,[{"pos":13,"end":18,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["arrow"]},{"pos":47,"end":57,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["expression"]},{"pos":226,"end":238,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["objectReturn"]},{"pos":286,"end":297,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["tupleReturn"]},{"pos":417,"end":423,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["object"]},{"pos":473,"end":479,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["method"]},{"pos":536,"end":544,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["accessor"]},{"pos":607,"end":612,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["tuple"]},{"pos":652,"end":657,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["array"]},{"pos":688,"end":694,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nested"]},{"pos":758,"end":769,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["memberTuple"]},{"pos":830,"end":841,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["memberArray"]},{"pos":893,"end":899,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["quoted"]},{"pos":960,"end":967,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["numeric"]},{"pos":1053,"end":1061,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["computed"]},{"pos":1122,"end":1127,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["union"]},{"pos":1298,"end":1309,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["specialized"]},{"pos":1443,"end":1450,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["indexed"]},{"pos":1591,"end":1597,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["mapped"]},{"pos":1792,"end":1805,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["viaAnnotation"]},{"pos":2246,"end":2257,"code":4025,"category":1,"messageKey":"Exported_variable_0_has_or_is_using_private_name_1_4025","messageArgs":["hiddenAlias","Hidden",""]},{"pos":2295,"end":2315,"code":4025,"category":1,"messageKey":"Exported_variable_0_has_or_is_using_private_name_1_4025","messageArgs":["siblingHiddenAliases","Hidden",""]},{"pos":2376,"end":2389,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["parenthesized"]},{"pos":2441,"end":2449,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["asserted"]},{"pos":2591,"end":2596,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["\"a-b\""]},{"pos":2637,"end":2642,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["[key]"]},{"pos":2674,"end":2679,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["recur"]},{"pos":2918,"end":2929,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nestedOwner"]},{"pos":3450,"end":3462,"code":5088,"category":1,"messageKey":"The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088","messageArgs":["nestedNumber"]}]]],"emitSignatures":[2]}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "633d60bb4cc3a6318b4832fd7a0a90fd-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\n// comment-only edit\n",
      "signature": "87d31630156adc6eff09ac6a0e92ce90-export declare const arrow: any;\nexport declare const expression: any;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: any;\nexport declare const tupleReturn: any;\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: any;\nexport declare const method: any;\nexport declare const accessor: any;\nexport declare const tuple: any;\nexport declare const array: any;\nexport declare const nested: any;\nexport declare const memberTuple: any;\nexport declare const memberArray: any;\nexport declare const quoted: any;\nexport declare const numeric: any;\nexport declare const key: unique symbol;\nexport declare const computed: any;\nexport declare const union: any;\nexport declare const specialized: any;\nexport declare const indexed: any;\nexport declare const mapped: any;\nexport declare const viaAnnotation: any;\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: Hidden;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: Hidden;\n    };\n    second: {\n        value: string;\n        next: Hidden;\n    };\n};\nexport declare const parenthesized: any;\nexport declare const asserted: any;\nexport declare class Methods {\n    static recur(): typeof Methods.recur;\n    static \"a-b\"(): any;\n    static [key](): any;\n    recur(): any;\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: any;\nexport declare const nestedNumber: any;\n\n(13,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\narrow\n\n(47,10): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nexpression\n\n(226,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nobjectReturn\n\n(286,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ntupleReturn\n\n(417,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nobject\n\n(473,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmethod\n\n(536,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\naccessor\n\n(607,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ntuple\n\n(652,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\narray\n\n(688,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnested\n\n(758,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmemberTuple\n\n(830,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmemberArray\n\n(893,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nquoted\n\n(960,7): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnumeric\n\n(1053,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncomputed\n\n(1122,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nunion\n\n(1298,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nspecialized\n\n(1443,7): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nindexed\n\n(1591,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmapped\n\n(1792,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nviaAnnotation\n\n(2246,11): error4025: Exported_variable_0_has_or_is_using_private_name_1_4025\nhiddenAlias\nHidden\n\n\n(2295,20): error4025: Exported_variable_0_has_or_is_using_private_name_1_4025\nsiblingHiddenAliases\nHidden\n\n\n(2376,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nparenthesized\n\n(2441,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nasserted\n\n(2591,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\n\"a-b\"\n\n(2637,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\n[key]\n\n(2674,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nrecur\n\n(2918,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedOwner\n\n(3450,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedNumber\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "633d60bb4cc3a6318b4832fd7a0a90fd-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\n// comment-only edit\n",
        "signature": "87d31630156adc6eff09ac6a0e92ce90-export declare const arrow: any;\nexport declare const expression: any;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: any;\nexport declare const tupleReturn: any;\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: any;\nexport declare const method: any;\nexport declare const accessor: any;\nexport declare const tuple: any;\nexport declare const array: any;\nexport declare const nested: any;\nexport declare const memberTuple: any;\nexport declare const memberArray: any;\nexport declare const quoted: any;\nexport declare const numeric: any;\nexport declare const key: unique symbol;\nexport declare const computed: any;\nexport declare const union: any;\nexport declare const specialized: any;\nexport declare const indexed: any;\nexport declare const mapped: any;\nexport declare const viaAnnotation: any;\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: Hidden;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: Hidden;\n    };\n    second: {\n        value: string;\n        next: Hidden;\n    };\n};\nexport declare const parenthesized: any;\nexport declare const asserted: any;\nexport declare class Methods {\n    static recur(): typeof Methods.recur;\n    static \"a-b\"(): any;\n    static [key](): any;\n    recur(): any;\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: any;\nexport declare const nestedNumber: any;\n\n(13,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\narrow\n\n(47,10): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nexpression\n\n(226,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nobjectReturn\n\n(286,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ntupleReturn\n\n(417,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nobject\n\n(473,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmethod\n\n(536,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\naccessor\n\n(607,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ntuple\n\n(652,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\narray\n\n(688,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnested\n\n(758,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmemberTuple\n\n(830,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmemberArray\n\n(893,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nquoted\n\n(960,7): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnumeric\n\n(1053,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\ncomputed\n\n(1122,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nunion\n\n(1298,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nspecialized\n\n(1443,7): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nindexed\n\n(1591,6): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nmapped\n\n(1792,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nviaAnnotation\n\n(2246,11): error4025: Exported_variable_0_has_or_is_using_private_name_1_4025\nhiddenAlias\nHidden\n\n\n(2295,20): error4025: Exported_variable_0_has_or_is_using_private_name_1_4025\nsiblingHiddenAliases\nHidden\n\n\n(2376,13): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nparenthesized\n\n(2441,8): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nasserted\n\n(2591,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\n\"a-b\"\n\n(2637,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\n[key]\n\n(2674,5): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nrecur\n\n(2918,11): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedOwner\n\n(3450,12): error5088: The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088\nnestedNumber\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "emitDiagnosticsPerFile": [
    [
      "../index.ts",
      [
        {
          "pos": 13,
          "end": 18,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "arrow"
          ]
        },
        {
          "pos": 47,
          "end": 57,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "expression"
          ]
        },
        {
          "pos": 226,
          "end": 238,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "objectReturn"
          ]
        },
        {
          "pos": 286,
          "end": 297,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "tupleReturn"
          ]
        },
        {
          "pos": 417,
          "end": 423,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "object"
          ]
        },
        {
          "pos": 473,
          "end": 479,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "method"
          ]
        },
        {
          "pos": 536,
          "end": 544,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "accessor"
          ]
        },
        {
          "pos": 607,
          "end": 612,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "tuple"
          ]
        },
        {
          "pos": 652,
          "end": 657,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "array"
          ]
        },
        {
          "pos": 688,
          "end": 694,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nested"
          ]
        },
        {
          "pos": 758,
          "end": 769,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "memberTuple"
          ]
        },
        {
          "pos": 830,
          "end": 841,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "memberArray"
          ]
        },
        {
          "pos": 893,
          "end": 899,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "quoted"
          ]
        },
        {
          "pos": 960,
          "end": 967,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "numeric"
          ]
        },
        {
          "pos": 1053,
          "end": 1061,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "computed"
          ]
        },
        {
          "pos": 1122,
          "end": 1127,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "union"
          ]
        },
        {
          "pos": 1298,
          "end": 1309,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "specialized"
          ]
        },
        {
          "pos": 1443,
          "end": 1450,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "indexed"
          ]
        },
        {
          "pos": 1591,
          "end": 1597,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "mapped"
          ]
        },
        {
          "pos": 1792,
          "end": 1805,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "viaAnnotation"
          ]
        },
        {
          "pos": 2246,
          "end": 2257,
          "code": 4025,
          "category": 1,
          "messageKey": "Exported_variable_0_has_or_is_using_private_name_1_4025",
          "messageArgs": [
            "hiddenAlias",
            "Hidden",
            ""
          ]
        },
        {
          "pos": 2295,
          "end": 2315,
          "code": 4025,
          "category": 1,
          "messageKey": "Exported_variable_0_has_or_is_using_private_name_1_4025",
          "messageArgs": [
            "siblingHiddenAliases",
            "Hidden",
            ""
          ]
        },
        {
          "pos": 2376,
          "end": 2389,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "parenthesized"
          ]
        },
        {
          "pos": 2441,
          "end": 2449,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "asserted"
          ]
        },
        {
          "pos": 2591,
          "end": 2596,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "\"a-b\""
          ]
        },
        {
          "pos": 2637,
          "end": 2642,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "[key]"
          ]
        },
        {
          "pos": 2674,
          "end": 2679,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "recur"
          ]
        },
        {
          "pos": 2918,
          "end": 2929,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nestedOwner"
          ]
        },
        {
          "pos": 3450,
          "end": 3462,
          "code": 5088,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialize_5088",
          "messageArgs": [
            "nestedNumber"
          ]
        }
      ]
    ]
  ],
  "emitSignatures": [
    {
      "file": "../index.ts",
      "original": 2
    }
  ],
  "size": 16409
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [2]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mproducer/index.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'arrow' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m1[0m export const arrow = () => arrow;
[7m [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'expression' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m2[0m export const expression = function self() { return self; };
[7m [0m [91m             ~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m6[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'objectReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m6[0m export const objectReturn = () => ({ call: objectReturn });
[7m [0m [91m             ~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m7[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'tupleReturn' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m7[0m export const tupleReturn = () => [tupleReturn] as const;
[7m [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m9[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'object' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m9[0m export const object = { value: 1, next: () => object };
[7m [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m10[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'method' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m10[0m export const method = { value: 1, next() { return method; } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m11[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'accessor' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m11[0m export const accessor = { value: 1, get next() { return accessor; } };
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m12[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'tuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m12[0m export const tuple = [() => tuple] as const;
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m13[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'array' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m13[0m export const array = [() => array];
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m14[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nested' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m14[0m export const nested = { inner: { next() { return nested.inner; } } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m15[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'memberTuple' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m15[0m export const memberTuple = [function self() { return self; }] as const;
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m16[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'memberArray' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m16[0m export const memberArray = [function self() { return self; }];
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m17[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'quoted' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m17[0m export const quoted = { "a-b": function self() { return self; } };
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m18[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'numeric' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m18[0m export const numeric = { 0: function self() { return self; } };
[7m  [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m20[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'computed' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m20[0m export const computed = { [key]: function self() { return self; } };
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m21[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'union' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m21[0m export const union = true as boolean ? { next: () => union } : undefined;
[7m  [0m [91m             ~~~~~[0m

[96mproducer/index.ts[0m:[93m26[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'specialized' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m26[0m export const specialized = create("text");
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m31[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'indexed' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m31[0m export const indexed = createIndexed();
[7m  [0m [91m             ~~~~~~~[0m

[96mproducer/index.ts[0m:[93m36[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'mapped' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m36[0m export const mapped = createMapped<{ next: unknown }>();
[7m  [0m [91m             ~~~~~~[0m

[96mproducer/index.ts[0m:[93m41[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'viaAnnotation' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m41[0m export const viaAnnotation = createAnnotated("text");
[7m  [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m52[0m:[93m14[0m - [91merror[0m[90m TS4025: [0mExported variable 'hiddenAlias' has or is using private name 'Hidden'.

[7m52[0m export const hiddenAlias = createHidden("text");
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m53[0m:[93m14[0m - [91merror[0m[90m TS4025: [0mExported variable 'siblingHiddenAliases' has or is using private name 'Hidden'.

[7m53[0m export const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };
[7m  [0m [91m             ~~~~~~~~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m54[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'parenthesized' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m54[0m export const parenthesized = (function self() { return self; });
[7m  [0m [91m             ~~~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m55[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'asserted' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m55[0m export const asserted = (function self() { return self; }) satisfies () => unknown;
[7m  [0m [91m             ~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m58[0m:[93m12[0m - [91merror[0m[90m TS5088: [0mThe inferred type of '"a-b"' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m58[0m     static "a-b"() { return Methods["a-b"]; }
[7m  [0m [91m           ~~~~~[0m

[96mproducer/index.ts[0m:[93m59[0m:[93m12[0m - [91merror[0m[90m TS5088: [0mThe inferred type of '[key]' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m59[0m     static [key]() { return Methods[key]; }
[7m  [0m [91m           ~~~~~[0m

[96mproducer/index.ts[0m:[93m60[0m:[93m5[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'recur' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m60[0m     recur() { return this.recur; }
[7m  [0m [91m    ~~~~~[0m

[96mproducer/index.ts[0m:[93m65[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedOwner' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m65[0m export const nestedOwner = {
[7m  [0m [91m             ~~~~~~~~~~~[0m

[96mproducer/index.ts[0m:[93m77[0m:[93m14[0m - [91merror[0m[90m TS5088: [0mThe inferred type of 'nestedNumber' references a type with a cyclic structure which cannot be trivially serialized. A type annotation is necessary.

[7m77[0m export const nestedNumber = nestedOwner.make(1);
[7m  [0m [91m             ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m1[0m:[93m88[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m1[0m import { arrow, expression, first, generic, objectReturn, tupleReturn, shadowed } from "../producer/dist/index.js";
[7m [0m [91m                                                                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m2[0m:[93m64[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m2[0m import { object, method, accessor, tuple, array, nested } from "../producer/dist/index.js";
[7m [0m [91m                                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m3[0m:[93m94[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m3[0m import { memberTuple, memberArray, quoted, numeric, key, computed, union, specialized } from "../producer/dist/index.js";
[7m [0m [91m                                                                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m4[0m:[93m48[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m4[0m import { indexed, mapped, viaAnnotation } from "../producer/dist/index.js";
[7m [0m [91m                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m5[0m:[93m86[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m5[0m import { nextLink, nextCallable, parenthesized, asserted, Methods, overloaded } from "../producer/dist/index.js";
[7m [0m [91m                                                                                     ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m6[0m:[93m51[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m6[0m import { hiddenAlias, siblingHiddenAliases } from "../producer/dist/index.js";
[7m [0m [91m                                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m7[0m:[93m30[0m - [91merror[0m[90m TS7016: [0mCould not find a declaration file for module '../producer/dist/index.js'. '/home/src/workspaces/project/producer/dist/index.js' implicitly has an 'any' type.

[7m7[0m import { nestedNumber } from "../producer/dist/index.js";
[7m [0m [91m                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 36 errors in 2 files.

Errors  Files
     7  consumer/index.ts[90m:1[0m
    29  producer/index.ts[90m:1[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
