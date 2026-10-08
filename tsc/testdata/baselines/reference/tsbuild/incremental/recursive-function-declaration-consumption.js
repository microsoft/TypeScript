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
[96mconsumer/index.ts[0m:[93m58[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m58[0m const invalid: number = arrow()()();
[7m  [0m [91m      ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m59[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m59[0m const invalidExpression: number = expression()()();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m60[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => { call: ...; }' is not assignable to type 'number'.

[7m60[0m const invalidObject: number = objectReturn().call;
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m61[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => readonly [...]' is not assignable to type 'number'.

[7m61[0m const invalidTuple: number = tupleReturn()[0];
[7m  [0m [91m      ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m62[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '(shadowed: number) => ...' is not assignable to type 'number'.

[7m62[0m const invalidShadowed: number = shadowed(1);
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m63[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m63[0m const invalidObjectValue: string = object.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m64[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'readonly [() => ...]' is not assignable to type 'number'.

[7m64[0m const invalidTupleValue: number = tuple[0]();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m65[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m65[0m const invalidSpecialized: number = specialized.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m66[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '{ next: ...; }' is not assignable to type 'number'.

[7m66[0m const invalidMapped: number = mapped.next;
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m67[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m67[0m const invalidAnnotation: number = viaAnnotation.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m68[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m68[0m const invalidLink: number = nextLink.next.value;
[7m  [0m [91m      ~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m69[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m69[0m const invalidCallable: string = nextCallable(1).link.value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m70[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m70[0m const invalidHiddenValue: number = hiddenAlias.next.next.value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m71[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)["recur"]' is not assignable to type 'number'.

[7m71[0m const invalidMethod: number = Methods.recur()();
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m72[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)[typeof key]' is not assignable to type 'number'.

[7m72[0m const invalidComputedMethod: number = Methods[key]()();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m73[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'boolean'.

[7m73[0m const invalidNestedOuter: boolean = nestedString.outer;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m74[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m74[0m const invalidNestedInner: string = nestedString.inner;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m75[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'string' is not assignable to parameter of type 'number'.

[7m75[0m nestedNumber.constrained("wrong");
[7m  [0m [91m                         ~~~~~~~[0m


Found 18 errors in the same file, starting at: consumer/index.ts[90m:58[0m

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
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
export declare const arrow: () => typeof arrow;
export declare const expression: () => typeof expression;
export declare const first: () => typeof second;
export declare const second: () => typeof first;
export declare const generic: <T>(value: T) => typeof generic;
export declare const objectReturn: () => {
    call: typeof objectReturn;
};
export declare const tupleReturn: () => readonly [typeof tupleReturn];
export declare const shadowed: (shadowed: number) => typeof import(".").shadowed;
export declare const object: {
    value: number;
    next: () => typeof object;
};
export declare const method: {
    value: number;
    next(): typeof method;
};
export declare const accessor: {
    value: number;
    readonly next: typeof accessor;
};
export declare const tuple: readonly [() => typeof tuple];
export declare const array: (() => typeof array)[];
export declare const nested: {
    inner: {
        next(): {
            next(): (typeof nested)["inner"];
        };
    };
};
export declare const memberTuple: readonly [() => (typeof memberTuple)[0]];
export declare const memberArray: (() => (typeof memberArray)[0])[];
export declare const quoted: {
    "a-b": () => (typeof quoted)["a-b"];
};
export declare const numeric: {
    0: () => (typeof numeric)[0];
};
export declare const key: unique symbol;
export declare const computed: {
    [key]: () => (typeof computed)[typeof key];
};
export declare const union: {
    next: () => typeof union;
} | undefined;
export declare const specialized: {
    value: string;
    next: () => typeof specialized;
};
export declare const indexed: {
    [key: string]: typeof indexed;
};
export declare const mapped: {
    next: typeof mapped;
};
export declare const viaAnnotation: {
    value: string;
    next: () => typeof viaAnnotation;
};
export type Link<T> = {
    value: T;
    next: Link<T>;
};
export type Callable<T> = {
    (value: T): Callable<T>;
    link: Link<T>;
};
export declare const link: Link<string>;
export declare const callable: Callable<number>;
export declare const nextLink: Link<string>;
export declare const nextCallable: Callable<number>;
export declare const hiddenAlias: {
    value: string;
    next: typeof hiddenAlias;
};
export declare const siblingHiddenAliases: {
    first: {
        value: string;
        next: (typeof siblingHiddenAliases)["first"];
    };
    second: {
        value: string;
        next: (typeof siblingHiddenAliases)["second"];
    };
};
export declare const parenthesized: () => typeof parenthesized;
export declare const asserted: () => typeof asserted;
export declare class Methods {
    static recur(): (typeof Methods)["recur"];
    static "a-b"(): (typeof Methods)["a-b"];
    static [key](): (typeof Methods)[typeof key];
    recur(): Methods["recur"];
}
export declare function overloaded(value: string): typeof overloaded;
export declare function overloaded(value: number): typeof overloaded;
export declare const nestedOwner: {
    make<T>(outer: T): {
        nested<U>(inner: U): {
            outer: T;
            inner: U;
            owner: typeof nestedOwner;
        };
        constrained<U extends T = T>(inner: U): {
            outer: T;
            inner: U;
            owner: typeof nestedOwner;
        };
        copied<U>(inner: U): {
            outer: T;
            inner: U;
            owner: typeof nestedOwner;
        };
        rest<U>(values_0: U): {
            outer: T;
            inner: U;
            owner: typeof nestedOwner;
        };
    };
};
export declare const nestedNumber: {
    nested<U>(inner: U): {
        outer: number;
        inner: U;
        owner: {
            make<T>(outer: T): {
                nested<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                constrained<U_1 extends T = T>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                copied<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                rest<U_1>(values_0: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
            };
        };
    };
    constrained<U extends number = number>(inner: U): {
        outer: number;
        inner: U;
        owner: {
            make<T>(outer: T): {
                nested<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                constrained<U_1 extends T = T>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                copied<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                rest<U_1>(values_0: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
            };
        };
    };
    copied<U>(inner: U): {
        outer: number;
        inner: U;
        owner: typeof nestedOwner;
    };
    rest<U>(values_0: U): {
        outer: number;
        inner: U;
        owner: {
            make<T>(outer: T): {
                nested<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                constrained<U_1 extends T = T>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                copied<U_1>(inner: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
                rest<U_1>(values_0: U_1): {
                    outer: T;
                    inner: U_1;
                    owner: typeof nestedOwner;
                };
            };
        };
    };
};

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
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c50047250d0afa431800786fe8ac0f71-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);","signature":"ac680f9630fda193ccd7e95d350590d1-export declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
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
      "signature": "ac680f9630fda193ccd7e95d350590d1-export declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c50047250d0afa431800786fe8ac0f71-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);",
        "signature": "ac680f9630fda193ccd7e95d350590d1-export declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 11151
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [0]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m58[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m58[0m const invalid: number = arrow()()();
[7m  [0m [91m      ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m59[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m59[0m const invalidExpression: number = expression()()();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m60[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => { call: ...; }' is not assignable to type 'number'.

[7m60[0m const invalidObject: number = objectReturn().call;
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m61[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => readonly [...]' is not assignable to type 'number'.

[7m61[0m const invalidTuple: number = tupleReturn()[0];
[7m  [0m [91m      ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m62[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '(shadowed: number) => ...' is not assignable to type 'number'.

[7m62[0m const invalidShadowed: number = shadowed(1);
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m63[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m63[0m const invalidObjectValue: string = object.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m64[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'readonly [() => ...]' is not assignable to type 'number'.

[7m64[0m const invalidTupleValue: number = tuple[0]();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m65[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m65[0m const invalidSpecialized: number = specialized.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m66[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '{ next: ...; }' is not assignable to type 'number'.

[7m66[0m const invalidMapped: number = mapped.next;
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m67[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m67[0m const invalidAnnotation: number = viaAnnotation.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m68[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m68[0m const invalidLink: number = nextLink.next.value;
[7m  [0m [91m      ~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m69[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m69[0m const invalidCallable: string = nextCallable(1).link.value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m70[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m70[0m const invalidHiddenValue: number = hiddenAlias.next.next.value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m71[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)["recur"]' is not assignable to type 'number'.

[7m71[0m const invalidMethod: number = Methods.recur()();
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m72[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)[typeof key]' is not assignable to type 'number'.

[7m72[0m const invalidComputedMethod: number = Methods[key]()();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m73[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'boolean'.

[7m73[0m const invalidNestedOuter: boolean = nestedString.outer;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m74[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m74[0m const invalidNestedInner: string = nestedString.inner;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m75[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'string' is not assignable to parameter of type 'number'.

[7m75[0m nestedNumber.constrained("wrong");
[7m  [0m [91m                         ~~~~~~~[0m


Found 18 errors in the same file, starting at: consumer/index.ts[90m:58[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
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
[96mconsumer/index.ts[0m:[93m58[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m58[0m const invalid: number = arrow()()();
[7m  [0m [91m      ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m59[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m59[0m const invalidExpression: number = expression()()();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m60[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => { call: ...; }' is not assignable to type 'number'.

[7m60[0m const invalidObject: number = objectReturn().call;
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m61[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => readonly [...]' is not assignable to type 'number'.

[7m61[0m const invalidTuple: number = tupleReturn()[0];
[7m  [0m [91m      ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m62[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '(shadowed: number) => ...' is not assignable to type 'number'.

[7m62[0m const invalidShadowed: number = shadowed(1);
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m63[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m63[0m const invalidObjectValue: string = object.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m64[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'readonly [() => ...]' is not assignable to type 'number'.

[7m64[0m const invalidTupleValue: number = tuple[0]();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m65[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m65[0m const invalidSpecialized: number = specialized.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m66[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '{ next: ...; }' is not assignable to type 'number'.

[7m66[0m const invalidMapped: number = mapped.next;
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m67[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m67[0m const invalidAnnotation: number = viaAnnotation.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m68[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m68[0m const invalidLink: number = nextLink.next.value;
[7m  [0m [91m      ~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m69[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m69[0m const invalidCallable: string = nextCallable(1).link.value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m70[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m70[0m const invalidHiddenValue: number = hiddenAlias.next.next.value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m71[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)["recur"]' is not assignable to type 'number'.

[7m71[0m const invalidMethod: number = Methods.recur()();
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m72[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)[typeof key]' is not assignable to type 'number'.

[7m72[0m const invalidComputedMethod: number = Methods[key]()();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m73[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'boolean'.

[7m73[0m const invalidNestedOuter: boolean = nestedString.outer;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m74[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m74[0m const invalidNestedInner: string = nestedString.inner;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m75[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'string' is not assignable to parameter of type 'number'.

[7m75[0m nestedNumber.constrained("wrong");
[7m  [0m [91m                         ~~~~~~~[0m


Found 18 errors in the same file, starting at: consumer/index.ts[90m:58[0m

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
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"633d60bb4cc3a6318b4832fd7a0a90fd-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\n// comment-only edit\n","signature":"ac680f9630fda193ccd7e95d350590d1-export declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./","strict":true},"latestChangedDtsFile":"./index.d.ts"}
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
      "signature": "ac680f9630fda193ccd7e95d350590d1-export declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "633d60bb4cc3a6318b4832fd7a0a90fd-export const arrow = () => arrow;\nexport const expression = function self() { return self; };\nexport const first = () => second;\nexport const second = () => first;\nexport const generic = <T>(value: T) => generic;\nexport const objectReturn = () => ({ call: objectReturn });\nexport const tupleReturn = () => [tupleReturn] as const;\nexport const shadowed = function self(shadowed: number) { return self; };\nexport const object = { value: 1, next: () => object };\nexport const method = { value: 1, next() { return method; } };\nexport const accessor = { value: 1, get next() { return accessor; } };\nexport const tuple = [() => tuple] as const;\nexport const array = [() => array];\nexport const nested = { inner: { next() { return nested.inner; } } };\nexport const memberTuple = [function self() { return self; }] as const;\nexport const memberArray = [function self() { return self; }];\nexport const quoted = { \"a-b\": function self() { return self; } };\nexport const numeric = { 0: function self() { return self; } };\nexport const key = Symbol();\nexport const computed = { [key]: function self() { return self; } };\nexport const union = true as boolean ? { next: () => union } : undefined;\nfunction create<T>(value: T) {\n    const result = { value, next: () => result };\n    return result;\n}\nexport const specialized = create(\"text\");\nfunction createIndexed() {\n    const value: { [key: string]: typeof value } = {};\n    return value;\n}\nexport const indexed = createIndexed();\nfunction createMapped<T>() {\n    const value: { [K in keyof T]: typeof value } = null!;\n    return value;\n}\nexport const mapped = createMapped<{ next: unknown }>();\nfunction createAnnotated<T>(value: T) {\n    const node: { value: T; next: () => typeof node } = { value, next: () => node };\n    return node;\n}\nexport const viaAnnotation = createAnnotated(\"text\");\nexport type Link<T> = { value: T; next: Link<T> };\nexport type Callable<T> = { (value: T): Callable<T>; link: Link<T> };\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport const nextLink = link.next;\nexport const nextCallable = callable(1);\nfunction createHidden<T>(value: T) {\n    type Hidden = { value: T; next: Hidden };\n    return null! as Hidden;\n}\nexport const hiddenAlias = createHidden(\"text\");\nexport const siblingHiddenAliases = { first: hiddenAlias, second: hiddenAlias };\nexport const parenthesized = (function self() { return self; });\nexport const asserted = (function self() { return self; }) satisfies () => unknown;\nexport class Methods {\n    static recur() { return Methods.recur; }\n    static \"a-b\"() { return Methods[\"a-b\"]; }\n    static [key]() { return Methods[key]; }\n    recur() { return this.recur; }\n}\nexport function overloaded(value: string): typeof overloaded;\nexport function overloaded(value: number): typeof overloaded;\nexport function overloaded(value: string | number) { return overloaded; }\nexport const nestedOwner = {\n    make<T>(outer: T) {\n        return {\n            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },\n            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {\n                return { outer, inner, owner: nestedOwner };\n            },\n            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },\n        };\n    },\n};\nexport const nestedNumber = nestedOwner.make(1);\n// comment-only edit\n",
        "signature": "ac680f9630fda193ccd7e95d350590d1-export declare const arrow: () => typeof arrow;\nexport declare const expression: () => typeof expression;\nexport declare const first: () => typeof second;\nexport declare const second: () => typeof first;\nexport declare const generic: <T>(value: T) => typeof generic;\nexport declare const objectReturn: () => {\n    call: typeof objectReturn;\n};\nexport declare const tupleReturn: () => readonly [typeof tupleReturn];\nexport declare const shadowed: (shadowed: number) => typeof import(\".\").shadowed;\nexport declare const object: {\n    value: number;\n    next: () => typeof object;\n};\nexport declare const method: {\n    value: number;\n    next(): typeof method;\n};\nexport declare const accessor: {\n    value: number;\n    readonly next: typeof accessor;\n};\nexport declare const tuple: readonly [() => typeof tuple];\nexport declare const array: (() => typeof array)[];\nexport declare const nested: {\n    inner: {\n        next(): {\n            next(): (typeof nested)[\"inner\"];\n        };\n    };\n};\nexport declare const memberTuple: readonly [() => (typeof memberTuple)[0]];\nexport declare const memberArray: (() => (typeof memberArray)[0])[];\nexport declare const quoted: {\n    \"a-b\": () => (typeof quoted)[\"a-b\"];\n};\nexport declare const numeric: {\n    0: () => (typeof numeric)[0];\n};\nexport declare const key: unique symbol;\nexport declare const computed: {\n    [key]: () => (typeof computed)[typeof key];\n};\nexport declare const union: {\n    next: () => typeof union;\n} | undefined;\nexport declare const specialized: {\n    value: string;\n    next: () => typeof specialized;\n};\nexport declare const indexed: {\n    [key: string]: typeof indexed;\n};\nexport declare const mapped: {\n    next: typeof mapped;\n};\nexport declare const viaAnnotation: {\n    value: string;\n    next: () => typeof viaAnnotation;\n};\nexport type Link<T> = {\n    value: T;\n    next: Link<T>;\n};\nexport type Callable<T> = {\n    (value: T): Callable<T>;\n    link: Link<T>;\n};\nexport declare const link: Link<string>;\nexport declare const callable: Callable<number>;\nexport declare const nextLink: Link<string>;\nexport declare const nextCallable: Callable<number>;\nexport declare const hiddenAlias: {\n    value: string;\n    next: typeof hiddenAlias;\n};\nexport declare const siblingHiddenAliases: {\n    first: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"first\"];\n    };\n    second: {\n        value: string;\n        next: (typeof siblingHiddenAliases)[\"second\"];\n    };\n};\nexport declare const parenthesized: () => typeof parenthesized;\nexport declare const asserted: () => typeof asserted;\nexport declare class Methods {\n    static recur(): (typeof Methods)[\"recur\"];\n    static \"a-b\"(): (typeof Methods)[\"a-b\"];\n    static [key](): (typeof Methods)[typeof key];\n    recur(): Methods[\"recur\"];\n}\nexport declare function overloaded(value: string): typeof overloaded;\nexport declare function overloaded(value: number): typeof overloaded;\nexport declare const nestedOwner: {\n    make<T>(outer: T): {\n        nested<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        constrained<U extends T = T>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        copied<U>(inner: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n        rest<U>(values_0: U): {\n            outer: T;\n            inner: U;\n            owner: typeof nestedOwner;\n        };\n    };\n};\nexport declare const nestedNumber: {\n    nested<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    constrained<U extends number = number>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n    copied<U>(inner: U): {\n        outer: number;\n        inner: U;\n        owner: typeof nestedOwner;\n    };\n    rest<U>(values_0: U): {\n        outer: number;\n        inner: U;\n        owner: {\n            make<T>(outer: T): {\n                nested<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                constrained<U_1 extends T = T>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                copied<U_1>(inner: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n                rest<U_1>(values_0: U_1): {\n                    outer: T;\n                    inner: U_1;\n                    owner: typeof nestedOwner;\n                };\n            };\n        };\n    };\n};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 11175
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/producer/index.ts

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::


Edit [2]:: no change

tsgo --build consumer
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer/index.ts[0m:[93m58[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m58[0m const invalid: number = arrow()()();
[7m  [0m [91m      ~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m59[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => ...' is not assignable to type 'number'.

[7m59[0m const invalidExpression: number = expression()()();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m60[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => { call: ...; }' is not assignable to type 'number'.

[7m60[0m const invalidObject: number = objectReturn().call;
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m61[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => readonly [...]' is not assignable to type 'number'.

[7m61[0m const invalidTuple: number = tupleReturn()[0];
[7m  [0m [91m      ~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m62[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '(shadowed: number) => ...' is not assignable to type 'number'.

[7m62[0m const invalidShadowed: number = shadowed(1);
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m63[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m63[0m const invalidObjectValue: string = object.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m64[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'readonly [() => ...]' is not assignable to type 'number'.

[7m64[0m const invalidTupleValue: number = tuple[0]();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m65[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m65[0m const invalidSpecialized: number = specialized.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m66[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '{ next: ...; }' is not assignable to type 'number'.

[7m66[0m const invalidMapped: number = mapped.next;
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m67[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m67[0m const invalidAnnotation: number = viaAnnotation.next().value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m68[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m68[0m const invalidLink: number = nextLink.next.value;
[7m  [0m [91m      ~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m69[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m69[0m const invalidCallable: string = nextCallable(1).link.value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m70[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m70[0m const invalidHiddenValue: number = hiddenAlias.next.next.value;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m71[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)["recur"]' is not assignable to type 'number'.

[7m71[0m const invalidMethod: number = Methods.recur()();
[7m  [0m [91m      ~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m72[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType '() => (typeof Methods)[typeof key]' is not assignable to type 'number'.

[7m72[0m const invalidComputedMethod: number = Methods[key]()();
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m73[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'boolean'.

[7m73[0m const invalidNestedOuter: boolean = nestedString.outer;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m74[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m74[0m const invalidNestedInner: string = nestedString.inner;
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~[0m

[96mconsumer/index.ts[0m:[93m75[0m:[93m26[0m - [91merror[0m[90m TS2345: [0mArgument of type 'string' is not assignable to parameter of type 'number'.

[7m75[0m nestedNumber.constrained("wrong");
[7m  [0m [91m                         ~~~~~~~[0m


Found 18 errors in the same file, starting at: consumer/index.ts[90m:58[0m

//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/consumer/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

consumer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/producer/dist/index.d.ts
*refresh*    /home/src/workspaces/project/consumer/index.ts
Signatures::
