currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *new* 
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
interface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }
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
//// [/home/src/workspaces/project/index.ts] *new* 
type Json = string | Json[];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function wrap<T>(value: T): Parsed<T>;
export const value = wrap({ items: [] as Json[] });
const items: Json[] = value.items;
value.items[0] = ["ok"];
value.items[0] = 123;

type Mutable<T> = { -readonly [K in keyof T]: Parsed<T[K]> };
type Immutable<T> = { readonly [K in keyof T]: Parsed<T[K]> };
type Optional<T> = { [K in keyof T]?: Parsed<T[K]> };
type Required<T> = { [K in keyof T]-?: Parsed<T[K]> };
declare const mutable: Mutable<readonly Json[]>;
declare const immutable: Immutable<Json[]>;
declare const optional: Optional<Json[]>;
declare const required: Required<(Json | undefined)[]>;
mutable[0] = ["ok"];
immutable[0] = "error";
optional[0] = undefined;
required[0] = undefined;

function convert<T>(value: T[]): Parsed<T[]> {
    return wrap(value);
}
const converted: Json[] = convert<Json>(["ok"]);
type Tuple = string | [Tuple];
type ReadonlyTuple = string | readonly [ReadonlyTuple];
type OptionalTuple = string | [OptionalTuple?];
type RestTuple = string | [head: RestTuple, ...tail: RestTuple[]];
type LeadingRestTuple = string | [...head: LeadingRestTuple[], tail: LeadingRestTuple];
declare const tuple: Parsed<[Tuple]>;
declare const readonlyTuple: Parsed<readonly [ReadonlyTuple]>;
declare const optionalTuple: Parsed<[OptionalTuple?]>;
declare const restTuple: Parsed<[head: RestTuple, ...tail: RestTuple[]]>;
declare const leadingRestTuple: Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>;
const tupleItem: Tuple = tuple[0];
const optionalItem: OptionalTuple | undefined = optionalTuple[0];
const restItem: RestTuple = restTuple[1];
const leadingRestItem: LeadingRestTuple = leadingRestTuple[0];
tuple[0] = ["ok"];
tuple[0] = 123;
readonlyTuple[0] = "error";
optionalTuple[0] = undefined;
optionalTuple[0] = 123;
restTuple[1] = 123;
leadingRestTuple[0] = 123;

declare const optionalRest: Optional<[...items: Json[], last: Json]>;
const optionalRestItems: (Json | undefined)[] = optionalRest;
type DeepOptional<T> = T extends object ? { [K in keyof T]?: DeepOptional<T[K]> } : T;
declare const deepOptionalRest: DeepOptional<[...items: LeadingRestTuple[], last: LeadingRestTuple]>;
const emptyOptionalRest: typeof deepOptionalRest = [];
deepOptionalRest[0] = undefined;
deepOptionalRest[0] = 123;
declare const requiredTuple: Required<[item?: Json]>;
requiredTuple[0] = undefined;
function convertTuple<T extends unknown[]>(value: [string, ...T]): Parsed<[string, ...T]> {
    return wrap(value);
}
const convertedTuple: [string, [Tuple], number] = convertTuple(["ok", ["nested"] as [Tuple], 1]);
declare const variadicUnion: Parsed<[string, ...([Tuple] | [Tuple, Tuple])]>;
const mappedUnion: [string, Tuple] | [string, Tuple, Tuple] = variadicUnion;
declare const intersection: Parsed<Json[] & readonly Json[]>;
intersection[0] = 123;
type First = string | [Second];
type Second = string | First[];
declare const mutual: Parsed<[First, Second]>;
const mutualItems: [First, Second] = mutual;
mutual[0] = 123;
type Endless<T> = T extends string ? Endless<T> : never;
type NonTerminating = Endless<string>;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions": {"strict": true, "declaration": true, "incremental": true}}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.ts[0m:[93m7[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<Json[]>'.

[7m7[0m value.items[0] = 123;
[7m [0m [91m~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m18[0m:[93m1[0m - [91merror[0m[90m TS2542: [0mIndex signature in type 'Immutable<Json[]>' only permits reading.

[7m18[0m immutable[0] = "error";
[7m  [0m [91m~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m20[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type 'string | Parsed<Json[]>'.

[7m20[0m required[0] = undefined;
[7m  [0m [91m~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m41[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[Tuple]>'.

[7m41[0m tuple[0] = 123;
[7m  [0m [91m~~~~~~~~[0m

[96mindex.ts[0m:[93m42[0m:[93m15[0m - [91merror[0m[90m TS2540: [0mCannot assign to '0' because it is a read-only property.

[7m42[0m readonlyTuple[0] = "error";
[7m  [0m [91m              ~[0m

[96mindex.ts[0m:[93m44[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType '123' is not assignable to type 'string | Parsed<[(OptionalTuple | undefined)?]> | undefined'.

[7m44[0m optionalTuple[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m45[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[head: RestTuple, ...tail: RestTuple[]]>'.

[7m45[0m restTuple[1] = 123;
[7m  [0m [91m~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m46[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>'.

[7m46[0m leadingRestTuple[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m54[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType '123' is not assignable to type 'string | DeepOptional<[...head: LeadingRestTuple[], tail: LeadingRestTuple]> | undefined'.

[7m54[0m deepOptionalRest[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m56[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type 'string | Parsed<Json[]>'.

[7m56[0m requiredTuple[0] = undefined;
[7m  [0m [91m~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m64[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<Json[]>'.

[7m64[0m intersection[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m69[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[Second]>'.

[7m69[0m mutual[0] = 123;
[7m  [0m [91m~~~~~~~~~[0m

[96mindex.ts[0m:[93m71[0m:[93m23[0m - [91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

[7m71[0m type NonTerminating = Endless<string>;
[7m  [0m [91m                      ~~~~~~~~~~~~~~~[0m


Found 13 errors in the same file, starting at: index.ts[90m:7[0m

//// [/home/src/workspaces/project/index.d.ts] *new* 
type Json = string | Json[];
type Parsed<T> = T extends object ? {
    [K in keyof T]: Parsed<T[K]>;
} : T;
export declare const value: {
    items: Parsed<Json[]>;
};
export {};

//// [/home/src/workspaces/project/index.js] *new* 
export const value = wrap({ items: [] });
const items = value.items;
value.items[0] = ["ok"];
value.items[0] = 123;
mutable[0] = ["ok"];
immutable[0] = "error";
optional[0] = undefined;
required[0] = undefined;
function convert(value) {
    return wrap(value);
}
const converted = convert(["ok"]);
const tupleItem = tuple[0];
const optionalItem = optionalTuple[0];
const restItem = restTuple[1];
const leadingRestItem = leadingRestTuple[0];
tuple[0] = ["ok"];
tuple[0] = 123;
readonlyTuple[0] = "error";
optionalTuple[0] = undefined;
optionalTuple[0] = 123;
restTuple[1] = 123;
leadingRestTuple[0] = 123;
const optionalRestItems = optionalRest;
const emptyOptionalRest = [];
deepOptionalRest[0] = undefined;
deepOptionalRest[0] = 123;
requiredTuple[0] = undefined;
function convertTuple(value) {
    return wrap(value);
}
const convertedTuple = convertTuple(["ok", ["nested"], 1]);
const mappedUnion = variadicUnion;
intersection[0] = 123;
const mutualItems = mutual;
mutual[0] = 123;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","./index.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"5bac20740fac0047dd901a8d727d5bd4-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\nconst items: Json[] = value.items;\nvalue.items[0] = [\"ok\"];\nvalue.items[0] = 123;\n\ntype Mutable<T> = { -readonly [K in keyof T]: Parsed<T[K]> };\ntype Immutable<T> = { readonly [K in keyof T]: Parsed<T[K]> };\ntype Optional<T> = { [K in keyof T]?: Parsed<T[K]> };\ntype Required<T> = { [K in keyof T]-?: Parsed<T[K]> };\ndeclare const mutable: Mutable<readonly Json[]>;\ndeclare const immutable: Immutable<Json[]>;\ndeclare const optional: Optional<Json[]>;\ndeclare const required: Required<(Json | undefined)[]>;\nmutable[0] = [\"ok\"];\nimmutable[0] = \"error\";\noptional[0] = undefined;\nrequired[0] = undefined;\n\nfunction convert<T>(value: T[]): Parsed<T[]> {\n    return wrap(value);\n}\nconst converted: Json[] = convert<Json>([\"ok\"]);\ntype Tuple = string | [Tuple];\ntype ReadonlyTuple = string | readonly [ReadonlyTuple];\ntype OptionalTuple = string | [OptionalTuple?];\ntype RestTuple = string | [head: RestTuple, ...tail: RestTuple[]];\ntype LeadingRestTuple = string | [...head: LeadingRestTuple[], tail: LeadingRestTuple];\ndeclare const tuple: Parsed<[Tuple]>;\ndeclare const readonlyTuple: Parsed<readonly [ReadonlyTuple]>;\ndeclare const optionalTuple: Parsed<[OptionalTuple?]>;\ndeclare const restTuple: Parsed<[head: RestTuple, ...tail: RestTuple[]]>;\ndeclare const leadingRestTuple: Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>;\nconst tupleItem: Tuple = tuple[0];\nconst optionalItem: OptionalTuple | undefined = optionalTuple[0];\nconst restItem: RestTuple = restTuple[1];\nconst leadingRestItem: LeadingRestTuple = leadingRestTuple[0];\ntuple[0] = [\"ok\"];\ntuple[0] = 123;\nreadonlyTuple[0] = \"error\";\noptionalTuple[0] = undefined;\noptionalTuple[0] = 123;\nrestTuple[1] = 123;\nleadingRestTuple[0] = 123;\n\ndeclare const optionalRest: Optional<[...items: Json[], last: Json]>;\nconst optionalRestItems: (Json | undefined)[] = optionalRest;\ntype DeepOptional<T> = T extends object ? { [K in keyof T]?: DeepOptional<T[K]> } : T;\ndeclare const deepOptionalRest: DeepOptional<[...items: LeadingRestTuple[], last: LeadingRestTuple]>;\nconst emptyOptionalRest: typeof deepOptionalRest = [];\ndeepOptionalRest[0] = undefined;\ndeepOptionalRest[0] = 123;\ndeclare const requiredTuple: Required<[item?: Json]>;\nrequiredTuple[0] = undefined;\nfunction convertTuple<T extends unknown[]>(value: [string, ...T]): Parsed<[string, ...T]> {\n    return wrap(value);\n}\nconst convertedTuple: [string, [Tuple], number] = convertTuple([\"ok\", [\"nested\"] as [Tuple], 1]);\ndeclare const variadicUnion: Parsed<[string, ...([Tuple] | [Tuple, Tuple])]>;\nconst mappedUnion: [string, Tuple] | [string, Tuple, Tuple] = variadicUnion;\ndeclare const intersection: Parsed<Json[] & readonly Json[]>;\nintersection[0] = 123;\ntype First = string | [Second];\ntype Second = string | First[];\ndeclare const mutual: Parsed<[First, Second]>;\nconst mutualItems: [First, Second] = mutual;\nmutual[0] = 123;\ntype Endless<T> = T extends string ? Endless<T> : never;\ntype NonTerminating = Endless<string>;","signature":"fcde39c2b051f56c2bdf4ff787c0b50e-type Json = string | Json[];\ntype Parsed<T> = T extends object ? {\n    [K in keyof T]: Parsed<T[K]>;\n} : T;\nexport declare const value: {\n    items: Parsed<Json[]>;\n};\nexport {};\n","impliedNodeFormat":1}],"options":{"declaration":true,"strict":true},"semanticDiagnosticsPerFile":[[2,[{"pos":262,"end":276,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<Json[]>"]},{"pos":731,"end":743,"code":2542,"category":1,"messageKey":"Index_signature_in_type_0_only_permits_reading_2542","messageArgs":["Immutable<Json[]>"]},{"pos":780,"end":791,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["undefined","string | Parsed<Json[]>"]},{"pos":1768,"end":1776,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<[Tuple]>"]},{"pos":1798,"end":1799,"code":2540,"category":1,"messageKey":"Cannot_assign_to_0_because_it_is_a_read_only_property_2540","messageArgs":["0"]},{"pos":1842,"end":1858,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["123","string | Parsed<[(OptionalTuple | undefined)?]> | undefined"]},{"pos":1866,"end":1878,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<[head: RestTuple, ...tail: RestTuple[]]>"]},{"pos":1886,"end":1905,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>"]},{"pos":2323,"end":2342,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["123","string | DeepOptional<[...head: LeadingRestTuple[], tail: LeadingRestTuple]> | undefined"]},{"pos":2404,"end":2420,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["undefined","string | Parsed<Json[]>"]},{"pos":2867,"end":2882,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<Json[]>"]},{"pos":3046,"end":3055,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<[Second]>"]},{"pos":3142,"end":3157,"code":2589,"category":1,"messageKey":"Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
      "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "5bac20740fac0047dd901a8d727d5bd4-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\nconst items: Json[] = value.items;\nvalue.items[0] = [\"ok\"];\nvalue.items[0] = 123;\n\ntype Mutable<T> = { -readonly [K in keyof T]: Parsed<T[K]> };\ntype Immutable<T> = { readonly [K in keyof T]: Parsed<T[K]> };\ntype Optional<T> = { [K in keyof T]?: Parsed<T[K]> };\ntype Required<T> = { [K in keyof T]-?: Parsed<T[K]> };\ndeclare const mutable: Mutable<readonly Json[]>;\ndeclare const immutable: Immutable<Json[]>;\ndeclare const optional: Optional<Json[]>;\ndeclare const required: Required<(Json | undefined)[]>;\nmutable[0] = [\"ok\"];\nimmutable[0] = \"error\";\noptional[0] = undefined;\nrequired[0] = undefined;\n\nfunction convert<T>(value: T[]): Parsed<T[]> {\n    return wrap(value);\n}\nconst converted: Json[] = convert<Json>([\"ok\"]);\ntype Tuple = string | [Tuple];\ntype ReadonlyTuple = string | readonly [ReadonlyTuple];\ntype OptionalTuple = string | [OptionalTuple?];\ntype RestTuple = string | [head: RestTuple, ...tail: RestTuple[]];\ntype LeadingRestTuple = string | [...head: LeadingRestTuple[], tail: LeadingRestTuple];\ndeclare const tuple: Parsed<[Tuple]>;\ndeclare const readonlyTuple: Parsed<readonly [ReadonlyTuple]>;\ndeclare const optionalTuple: Parsed<[OptionalTuple?]>;\ndeclare const restTuple: Parsed<[head: RestTuple, ...tail: RestTuple[]]>;\ndeclare const leadingRestTuple: Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>;\nconst tupleItem: Tuple = tuple[0];\nconst optionalItem: OptionalTuple | undefined = optionalTuple[0];\nconst restItem: RestTuple = restTuple[1];\nconst leadingRestItem: LeadingRestTuple = leadingRestTuple[0];\ntuple[0] = [\"ok\"];\ntuple[0] = 123;\nreadonlyTuple[0] = \"error\";\noptionalTuple[0] = undefined;\noptionalTuple[0] = 123;\nrestTuple[1] = 123;\nleadingRestTuple[0] = 123;\n\ndeclare const optionalRest: Optional<[...items: Json[], last: Json]>;\nconst optionalRestItems: (Json | undefined)[] = optionalRest;\ntype DeepOptional<T> = T extends object ? { [K in keyof T]?: DeepOptional<T[K]> } : T;\ndeclare const deepOptionalRest: DeepOptional<[...items: LeadingRestTuple[], last: LeadingRestTuple]>;\nconst emptyOptionalRest: typeof deepOptionalRest = [];\ndeepOptionalRest[0] = undefined;\ndeepOptionalRest[0] = 123;\ndeclare const requiredTuple: Required<[item?: Json]>;\nrequiredTuple[0] = undefined;\nfunction convertTuple<T extends unknown[]>(value: [string, ...T]): Parsed<[string, ...T]> {\n    return wrap(value);\n}\nconst convertedTuple: [string, [Tuple], number] = convertTuple([\"ok\", [\"nested\"] as [Tuple], 1]);\ndeclare const variadicUnion: Parsed<[string, ...([Tuple] | [Tuple, Tuple])]>;\nconst mappedUnion: [string, Tuple] | [string, Tuple, Tuple] = variadicUnion;\ndeclare const intersection: Parsed<Json[] & readonly Json[]>;\nintersection[0] = 123;\ntype First = string | [Second];\ntype Second = string | First[];\ndeclare const mutual: Parsed<[First, Second]>;\nconst mutualItems: [First, Second] = mutual;\nmutual[0] = 123;\ntype Endless<T> = T extends string ? Endless<T> : never;\ntype NonTerminating = Endless<string>;",
      "signature": "fcde39c2b051f56c2bdf4ff787c0b50e-type Json = string | Json[];\ntype Parsed<T> = T extends object ? {\n    [K in keyof T]: Parsed<T[K]>;\n} : T;\nexport declare const value: {\n    items: Parsed<Json[]>;\n};\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5bac20740fac0047dd901a8d727d5bd4-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\nconst items: Json[] = value.items;\nvalue.items[0] = [\"ok\"];\nvalue.items[0] = 123;\n\ntype Mutable<T> = { -readonly [K in keyof T]: Parsed<T[K]> };\ntype Immutable<T> = { readonly [K in keyof T]: Parsed<T[K]> };\ntype Optional<T> = { [K in keyof T]?: Parsed<T[K]> };\ntype Required<T> = { [K in keyof T]-?: Parsed<T[K]> };\ndeclare const mutable: Mutable<readonly Json[]>;\ndeclare const immutable: Immutable<Json[]>;\ndeclare const optional: Optional<Json[]>;\ndeclare const required: Required<(Json | undefined)[]>;\nmutable[0] = [\"ok\"];\nimmutable[0] = \"error\";\noptional[0] = undefined;\nrequired[0] = undefined;\n\nfunction convert<T>(value: T[]): Parsed<T[]> {\n    return wrap(value);\n}\nconst converted: Json[] = convert<Json>([\"ok\"]);\ntype Tuple = string | [Tuple];\ntype ReadonlyTuple = string | readonly [ReadonlyTuple];\ntype OptionalTuple = string | [OptionalTuple?];\ntype RestTuple = string | [head: RestTuple, ...tail: RestTuple[]];\ntype LeadingRestTuple = string | [...head: LeadingRestTuple[], tail: LeadingRestTuple];\ndeclare const tuple: Parsed<[Tuple]>;\ndeclare const readonlyTuple: Parsed<readonly [ReadonlyTuple]>;\ndeclare const optionalTuple: Parsed<[OptionalTuple?]>;\ndeclare const restTuple: Parsed<[head: RestTuple, ...tail: RestTuple[]]>;\ndeclare const leadingRestTuple: Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>;\nconst tupleItem: Tuple = tuple[0];\nconst optionalItem: OptionalTuple | undefined = optionalTuple[0];\nconst restItem: RestTuple = restTuple[1];\nconst leadingRestItem: LeadingRestTuple = leadingRestTuple[0];\ntuple[0] = [\"ok\"];\ntuple[0] = 123;\nreadonlyTuple[0] = \"error\";\noptionalTuple[0] = undefined;\noptionalTuple[0] = 123;\nrestTuple[1] = 123;\nleadingRestTuple[0] = 123;\n\ndeclare const optionalRest: Optional<[...items: Json[], last: Json]>;\nconst optionalRestItems: (Json | undefined)[] = optionalRest;\ntype DeepOptional<T> = T extends object ? { [K in keyof T]?: DeepOptional<T[K]> } : T;\ndeclare const deepOptionalRest: DeepOptional<[...items: LeadingRestTuple[], last: LeadingRestTuple]>;\nconst emptyOptionalRest: typeof deepOptionalRest = [];\ndeepOptionalRest[0] = undefined;\ndeepOptionalRest[0] = 123;\ndeclare const requiredTuple: Required<[item?: Json]>;\nrequiredTuple[0] = undefined;\nfunction convertTuple<T extends unknown[]>(value: [string, ...T]): Parsed<[string, ...T]> {\n    return wrap(value);\n}\nconst convertedTuple: [string, [Tuple], number] = convertTuple([\"ok\", [\"nested\"] as [Tuple], 1]);\ndeclare const variadicUnion: Parsed<[string, ...([Tuple] | [Tuple, Tuple])]>;\nconst mappedUnion: [string, Tuple] | [string, Tuple, Tuple] = variadicUnion;\ndeclare const intersection: Parsed<Json[] & readonly Json[]>;\nintersection[0] = 123;\ntype First = string | [Second];\ntype Second = string | First[];\ndeclare const mutual: Parsed<[First, Second]>;\nconst mutualItems: [First, Second] = mutual;\nmutual[0] = 123;\ntype Endless<T> = T extends string ? Endless<T> : never;\ntype NonTerminating = Endless<string>;",
        "signature": "fcde39c2b051f56c2bdf4ff787c0b50e-type Json = string | Json[];\ntype Parsed<T> = T extends object ? {\n    [K in keyof T]: Parsed<T[K]>;\n} : T;\nexport declare const value: {\n    items: Parsed<Json[]>;\n};\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true,
    "strict": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "pos": 262,
          "end": 276,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<Json[]>"
          ]
        },
        {
          "pos": 731,
          "end": 743,
          "code": 2542,
          "category": 1,
          "messageKey": "Index_signature_in_type_0_only_permits_reading_2542",
          "messageArgs": [
            "Immutable<Json[]>"
          ]
        },
        {
          "pos": 780,
          "end": 791,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "undefined",
            "string | Parsed<Json[]>"
          ]
        },
        {
          "pos": 1768,
          "end": 1776,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<[Tuple]>"
          ]
        },
        {
          "pos": 1798,
          "end": 1799,
          "code": 2540,
          "category": 1,
          "messageKey": "Cannot_assign_to_0_because_it_is_a_read_only_property_2540",
          "messageArgs": [
            "0"
          ]
        },
        {
          "pos": 1842,
          "end": 1858,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "123",
            "string | Parsed<[(OptionalTuple | undefined)?]> | undefined"
          ]
        },
        {
          "pos": 1866,
          "end": 1878,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<[head: RestTuple, ...tail: RestTuple[]]>"
          ]
        },
        {
          "pos": 1886,
          "end": 1905,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>"
          ]
        },
        {
          "pos": 2323,
          "end": 2342,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "123",
            "string | DeepOptional<[...head: LeadingRestTuple[], tail: LeadingRestTuple]> | undefined"
          ]
        },
        {
          "pos": 2404,
          "end": 2420,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "undefined",
            "string | Parsed<Json[]>"
          ]
        },
        {
          "pos": 2867,
          "end": 2882,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<Json[]>"
          ]
        },
        {
          "pos": 3046,
          "end": 3055,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<[Second]>"
          ]
        },
        {
          "pos": 3142,
          "end": 3157,
          "code": 2589,
          "category": 1,
          "messageKey": "Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"
        }
      ]
    ]
  ],
  "size": 6707
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/index.ts


Edit [0]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.ts[0m:[93m7[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<Json[]>'.

[7m7[0m value.items[0] = 123;
[7m [0m [91m~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m18[0m:[93m1[0m - [91merror[0m[90m TS2542: [0mIndex signature in type 'Immutable<Json[]>' only permits reading.

[7m18[0m immutable[0] = "error";
[7m  [0m [91m~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m20[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type 'string | Parsed<Json[]>'.

[7m20[0m required[0] = undefined;
[7m  [0m [91m~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m41[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[Tuple]>'.

[7m41[0m tuple[0] = 123;
[7m  [0m [91m~~~~~~~~[0m

[96mindex.ts[0m:[93m42[0m:[93m15[0m - [91merror[0m[90m TS2540: [0mCannot assign to '0' because it is a read-only property.

[7m42[0m readonlyTuple[0] = "error";
[7m  [0m [91m              ~[0m

[96mindex.ts[0m:[93m44[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType '123' is not assignable to type 'string | Parsed<[(OptionalTuple | undefined)?]> | undefined'.

[7m44[0m optionalTuple[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m45[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[head: RestTuple, ...tail: RestTuple[]]>'.

[7m45[0m restTuple[1] = 123;
[7m  [0m [91m~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m46[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>'.

[7m46[0m leadingRestTuple[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m54[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType '123' is not assignable to type 'string | DeepOptional<[...head: LeadingRestTuple[], tail: LeadingRestTuple]> | undefined'.

[7m54[0m deepOptionalRest[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m56[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type 'string | Parsed<Json[]>'.

[7m56[0m requiredTuple[0] = undefined;
[7m  [0m [91m~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m64[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<Json[]>'.

[7m64[0m intersection[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m69[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[Second]>'.

[7m69[0m mutual[0] = 123;
[7m  [0m [91m~~~~~~~~~[0m

[96mindex.ts[0m:[93m71[0m:[93m23[0m - [91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

[7m71[0m type NonTerminating = Endless<string>;
[7m  [0m [91m                      ~~~~~~~~~~~~~~~[0m


Found 13 errors in the same file, starting at: index.ts[90m:7[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: add a comment
//// [/home/src/workspaces/project/index.ts] *modified* 
type Json = string | Json[];
type Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;
declare function wrap<T>(value: T): Parsed<T>;
export const value = wrap({ items: [] as Json[] });
const items: Json[] = value.items;
value.items[0] = ["ok"];
value.items[0] = 123;

type Mutable<T> = { -readonly [K in keyof T]: Parsed<T[K]> };
type Immutable<T> = { readonly [K in keyof T]: Parsed<T[K]> };
type Optional<T> = { [K in keyof T]?: Parsed<T[K]> };
type Required<T> = { [K in keyof T]-?: Parsed<T[K]> };
declare const mutable: Mutable<readonly Json[]>;
declare const immutable: Immutable<Json[]>;
declare const optional: Optional<Json[]>;
declare const required: Required<(Json | undefined)[]>;
mutable[0] = ["ok"];
immutable[0] = "error";
optional[0] = undefined;
required[0] = undefined;

function convert<T>(value: T[]): Parsed<T[]> {
    return wrap(value);
}
const converted: Json[] = convert<Json>(["ok"]);
type Tuple = string | [Tuple];
type ReadonlyTuple = string | readonly [ReadonlyTuple];
type OptionalTuple = string | [OptionalTuple?];
type RestTuple = string | [head: RestTuple, ...tail: RestTuple[]];
type LeadingRestTuple = string | [...head: LeadingRestTuple[], tail: LeadingRestTuple];
declare const tuple: Parsed<[Tuple]>;
declare const readonlyTuple: Parsed<readonly [ReadonlyTuple]>;
declare const optionalTuple: Parsed<[OptionalTuple?]>;
declare const restTuple: Parsed<[head: RestTuple, ...tail: RestTuple[]]>;
declare const leadingRestTuple: Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>;
const tupleItem: Tuple = tuple[0];
const optionalItem: OptionalTuple | undefined = optionalTuple[0];
const restItem: RestTuple = restTuple[1];
const leadingRestItem: LeadingRestTuple = leadingRestTuple[0];
tuple[0] = ["ok"];
tuple[0] = 123;
readonlyTuple[0] = "error";
optionalTuple[0] = undefined;
optionalTuple[0] = 123;
restTuple[1] = 123;
leadingRestTuple[0] = 123;

declare const optionalRest: Optional<[...items: Json[], last: Json]>;
const optionalRestItems: (Json | undefined)[] = optionalRest;
type DeepOptional<T> = T extends object ? { [K in keyof T]?: DeepOptional<T[K]> } : T;
declare const deepOptionalRest: DeepOptional<[...items: LeadingRestTuple[], last: LeadingRestTuple]>;
const emptyOptionalRest: typeof deepOptionalRest = [];
deepOptionalRest[0] = undefined;
deepOptionalRest[0] = 123;
declare const requiredTuple: Required<[item?: Json]>;
requiredTuple[0] = undefined;
function convertTuple<T extends unknown[]>(value: [string, ...T]): Parsed<[string, ...T]> {
    return wrap(value);
}
const convertedTuple: [string, [Tuple], number] = convertTuple(["ok", ["nested"] as [Tuple], 1]);
declare const variadicUnion: Parsed<[string, ...([Tuple] | [Tuple, Tuple])]>;
const mappedUnion: [string, Tuple] | [string, Tuple, Tuple] = variadicUnion;
declare const intersection: Parsed<Json[] & readonly Json[]>;
intersection[0] = 123;
type First = string | [Second];
type Second = string | First[];
declare const mutual: Parsed<[First, Second]>;
const mutualItems: [First, Second] = mutual;
mutual[0] = 123;
type Endless<T> = T extends string ? Endless<T> : never;
type NonTerminating = Endless<string>;
// comment-only edit


tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.ts[0m:[93m7[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<Json[]>'.

[7m7[0m value.items[0] = 123;
[7m [0m [91m~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m18[0m:[93m1[0m - [91merror[0m[90m TS2542: [0mIndex signature in type 'Immutable<Json[]>' only permits reading.

[7m18[0m immutable[0] = "error";
[7m  [0m [91m~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m20[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type 'string | Parsed<Json[]>'.

[7m20[0m required[0] = undefined;
[7m  [0m [91m~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m41[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[Tuple]>'.

[7m41[0m tuple[0] = 123;
[7m  [0m [91m~~~~~~~~[0m

[96mindex.ts[0m:[93m42[0m:[93m15[0m - [91merror[0m[90m TS2540: [0mCannot assign to '0' because it is a read-only property.

[7m42[0m readonlyTuple[0] = "error";
[7m  [0m [91m              ~[0m

[96mindex.ts[0m:[93m44[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType '123' is not assignable to type 'string | Parsed<[(OptionalTuple | undefined)?]> | undefined'.

[7m44[0m optionalTuple[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m45[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[head: RestTuple, ...tail: RestTuple[]]>'.

[7m45[0m restTuple[1] = 123;
[7m  [0m [91m~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m46[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>'.

[7m46[0m leadingRestTuple[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m54[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType '123' is not assignable to type 'string | DeepOptional<[...head: LeadingRestTuple[], tail: LeadingRestTuple]> | undefined'.

[7m54[0m deepOptionalRest[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m56[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type 'string | Parsed<Json[]>'.

[7m56[0m requiredTuple[0] = undefined;
[7m  [0m [91m~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m64[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<Json[]>'.

[7m64[0m intersection[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m69[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[Second]>'.

[7m69[0m mutual[0] = 123;
[7m  [0m [91m~~~~~~~~~[0m

[96mindex.ts[0m:[93m71[0m:[93m23[0m - [91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

[7m71[0m type NonTerminating = Endless<string>;
[7m  [0m [91m                      ~~~~~~~~~~~~~~~[0m


Found 13 errors in the same file, starting at: index.ts[90m:7[0m

//// [/home/src/workspaces/project/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/index.js] *modified* 
export const value = wrap({ items: [] });
const items = value.items;
value.items[0] = ["ok"];
value.items[0] = 123;
mutable[0] = ["ok"];
immutable[0] = "error";
optional[0] = undefined;
required[0] = undefined;
function convert(value) {
    return wrap(value);
}
const converted = convert(["ok"]);
const tupleItem = tuple[0];
const optionalItem = optionalTuple[0];
const restItem = restTuple[1];
const leadingRestItem = leadingRestTuple[0];
tuple[0] = ["ok"];
tuple[0] = 123;
readonlyTuple[0] = "error";
optionalTuple[0] = undefined;
optionalTuple[0] = 123;
restTuple[1] = 123;
leadingRestTuple[0] = 123;
const optionalRestItems = optionalRest;
const emptyOptionalRest = [];
deepOptionalRest[0] = undefined;
deepOptionalRest[0] = 123;
requiredTuple[0] = undefined;
function convertTuple(value) {
    return wrap(value);
}
const convertedTuple = convertTuple(["ok", ["nested"], 1]);
const mappedUnion = variadicUnion;
intersection[0] = 123;
const mutualItems = mutual;
mutual[0] = 123;
// comment-only edit

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","./index.ts"],"fileInfos":[{"version":"0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"953936a7d2e44e8d543bdcdc4ae0637f-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\nconst items: Json[] = value.items;\nvalue.items[0] = [\"ok\"];\nvalue.items[0] = 123;\n\ntype Mutable<T> = { -readonly [K in keyof T]: Parsed<T[K]> };\ntype Immutable<T> = { readonly [K in keyof T]: Parsed<T[K]> };\ntype Optional<T> = { [K in keyof T]?: Parsed<T[K]> };\ntype Required<T> = { [K in keyof T]-?: Parsed<T[K]> };\ndeclare const mutable: Mutable<readonly Json[]>;\ndeclare const immutable: Immutable<Json[]>;\ndeclare const optional: Optional<Json[]>;\ndeclare const required: Required<(Json | undefined)[]>;\nmutable[0] = [\"ok\"];\nimmutable[0] = \"error\";\noptional[0] = undefined;\nrequired[0] = undefined;\n\nfunction convert<T>(value: T[]): Parsed<T[]> {\n    return wrap(value);\n}\nconst converted: Json[] = convert<Json>([\"ok\"]);\ntype Tuple = string | [Tuple];\ntype ReadonlyTuple = string | readonly [ReadonlyTuple];\ntype OptionalTuple = string | [OptionalTuple?];\ntype RestTuple = string | [head: RestTuple, ...tail: RestTuple[]];\ntype LeadingRestTuple = string | [...head: LeadingRestTuple[], tail: LeadingRestTuple];\ndeclare const tuple: Parsed<[Tuple]>;\ndeclare const readonlyTuple: Parsed<readonly [ReadonlyTuple]>;\ndeclare const optionalTuple: Parsed<[OptionalTuple?]>;\ndeclare const restTuple: Parsed<[head: RestTuple, ...tail: RestTuple[]]>;\ndeclare const leadingRestTuple: Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>;\nconst tupleItem: Tuple = tuple[0];\nconst optionalItem: OptionalTuple | undefined = optionalTuple[0];\nconst restItem: RestTuple = restTuple[1];\nconst leadingRestItem: LeadingRestTuple = leadingRestTuple[0];\ntuple[0] = [\"ok\"];\ntuple[0] = 123;\nreadonlyTuple[0] = \"error\";\noptionalTuple[0] = undefined;\noptionalTuple[0] = 123;\nrestTuple[1] = 123;\nleadingRestTuple[0] = 123;\n\ndeclare const optionalRest: Optional<[...items: Json[], last: Json]>;\nconst optionalRestItems: (Json | undefined)[] = optionalRest;\ntype DeepOptional<T> = T extends object ? { [K in keyof T]?: DeepOptional<T[K]> } : T;\ndeclare const deepOptionalRest: DeepOptional<[...items: LeadingRestTuple[], last: LeadingRestTuple]>;\nconst emptyOptionalRest: typeof deepOptionalRest = [];\ndeepOptionalRest[0] = undefined;\ndeepOptionalRest[0] = 123;\ndeclare const requiredTuple: Required<[item?: Json]>;\nrequiredTuple[0] = undefined;\nfunction convertTuple<T extends unknown[]>(value: [string, ...T]): Parsed<[string, ...T]> {\n    return wrap(value);\n}\nconst convertedTuple: [string, [Tuple], number] = convertTuple([\"ok\", [\"nested\"] as [Tuple], 1]);\ndeclare const variadicUnion: Parsed<[string, ...([Tuple] | [Tuple, Tuple])]>;\nconst mappedUnion: [string, Tuple] | [string, Tuple, Tuple] = variadicUnion;\ndeclare const intersection: Parsed<Json[] & readonly Json[]>;\nintersection[0] = 123;\ntype First = string | [Second];\ntype Second = string | First[];\ndeclare const mutual: Parsed<[First, Second]>;\nconst mutualItems: [First, Second] = mutual;\nmutual[0] = 123;\ntype Endless<T> = T extends string ? Endless<T> : never;\ntype NonTerminating = Endless<string>;\n// comment-only edit\n","signature":"fcde39c2b051f56c2bdf4ff787c0b50e-type Json = string | Json[];\ntype Parsed<T> = T extends object ? {\n    [K in keyof T]: Parsed<T[K]>;\n} : T;\nexport declare const value: {\n    items: Parsed<Json[]>;\n};\nexport {};\n","impliedNodeFormat":1}],"options":{"declaration":true,"strict":true},"semanticDiagnosticsPerFile":[[2,[{"pos":262,"end":276,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<Json[]>"]},{"pos":731,"end":743,"code":2542,"category":1,"messageKey":"Index_signature_in_type_0_only_permits_reading_2542","messageArgs":["Immutable<Json[]>"]},{"pos":780,"end":791,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["undefined","string | Parsed<Json[]>"]},{"pos":1768,"end":1776,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<[Tuple]>"]},{"pos":1798,"end":1799,"code":2540,"category":1,"messageKey":"Cannot_assign_to_0_because_it_is_a_read_only_property_2540","messageArgs":["0"]},{"pos":1842,"end":1858,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["123","string | Parsed<[(OptionalTuple | undefined)?]> | undefined"]},{"pos":1866,"end":1878,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<[head: RestTuple, ...tail: RestTuple[]]>"]},{"pos":1886,"end":1905,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>"]},{"pos":2323,"end":2342,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["123","string | DeepOptional<[...head: LeadingRestTuple[], tail: LeadingRestTuple]> | undefined"]},{"pos":2404,"end":2420,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["undefined","string | Parsed<Json[]>"]},{"pos":2867,"end":2882,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<Json[]>"]},{"pos":3046,"end":3055,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string | Parsed<[Second]>"]},{"pos":3142,"end":3157,"code":2589,"category":1,"messageKey":"Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
      "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0e330bc1e98a7e2601e4b38548df5e2b-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [n: number]: T; }\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "953936a7d2e44e8d543bdcdc4ae0637f-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\nconst items: Json[] = value.items;\nvalue.items[0] = [\"ok\"];\nvalue.items[0] = 123;\n\ntype Mutable<T> = { -readonly [K in keyof T]: Parsed<T[K]> };\ntype Immutable<T> = { readonly [K in keyof T]: Parsed<T[K]> };\ntype Optional<T> = { [K in keyof T]?: Parsed<T[K]> };\ntype Required<T> = { [K in keyof T]-?: Parsed<T[K]> };\ndeclare const mutable: Mutable<readonly Json[]>;\ndeclare const immutable: Immutable<Json[]>;\ndeclare const optional: Optional<Json[]>;\ndeclare const required: Required<(Json | undefined)[]>;\nmutable[0] = [\"ok\"];\nimmutable[0] = \"error\";\noptional[0] = undefined;\nrequired[0] = undefined;\n\nfunction convert<T>(value: T[]): Parsed<T[]> {\n    return wrap(value);\n}\nconst converted: Json[] = convert<Json>([\"ok\"]);\ntype Tuple = string | [Tuple];\ntype ReadonlyTuple = string | readonly [ReadonlyTuple];\ntype OptionalTuple = string | [OptionalTuple?];\ntype RestTuple = string | [head: RestTuple, ...tail: RestTuple[]];\ntype LeadingRestTuple = string | [...head: LeadingRestTuple[], tail: LeadingRestTuple];\ndeclare const tuple: Parsed<[Tuple]>;\ndeclare const readonlyTuple: Parsed<readonly [ReadonlyTuple]>;\ndeclare const optionalTuple: Parsed<[OptionalTuple?]>;\ndeclare const restTuple: Parsed<[head: RestTuple, ...tail: RestTuple[]]>;\ndeclare const leadingRestTuple: Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>;\nconst tupleItem: Tuple = tuple[0];\nconst optionalItem: OptionalTuple | undefined = optionalTuple[0];\nconst restItem: RestTuple = restTuple[1];\nconst leadingRestItem: LeadingRestTuple = leadingRestTuple[0];\ntuple[0] = [\"ok\"];\ntuple[0] = 123;\nreadonlyTuple[0] = \"error\";\noptionalTuple[0] = undefined;\noptionalTuple[0] = 123;\nrestTuple[1] = 123;\nleadingRestTuple[0] = 123;\n\ndeclare const optionalRest: Optional<[...items: Json[], last: Json]>;\nconst optionalRestItems: (Json | undefined)[] = optionalRest;\ntype DeepOptional<T> = T extends object ? { [K in keyof T]?: DeepOptional<T[K]> } : T;\ndeclare const deepOptionalRest: DeepOptional<[...items: LeadingRestTuple[], last: LeadingRestTuple]>;\nconst emptyOptionalRest: typeof deepOptionalRest = [];\ndeepOptionalRest[0] = undefined;\ndeepOptionalRest[0] = 123;\ndeclare const requiredTuple: Required<[item?: Json]>;\nrequiredTuple[0] = undefined;\nfunction convertTuple<T extends unknown[]>(value: [string, ...T]): Parsed<[string, ...T]> {\n    return wrap(value);\n}\nconst convertedTuple: [string, [Tuple], number] = convertTuple([\"ok\", [\"nested\"] as [Tuple], 1]);\ndeclare const variadicUnion: Parsed<[string, ...([Tuple] | [Tuple, Tuple])]>;\nconst mappedUnion: [string, Tuple] | [string, Tuple, Tuple] = variadicUnion;\ndeclare const intersection: Parsed<Json[] & readonly Json[]>;\nintersection[0] = 123;\ntype First = string | [Second];\ntype Second = string | First[];\ndeclare const mutual: Parsed<[First, Second]>;\nconst mutualItems: [First, Second] = mutual;\nmutual[0] = 123;\ntype Endless<T> = T extends string ? Endless<T> : never;\ntype NonTerminating = Endless<string>;\n// comment-only edit\n",
      "signature": "fcde39c2b051f56c2bdf4ff787c0b50e-type Json = string | Json[];\ntype Parsed<T> = T extends object ? {\n    [K in keyof T]: Parsed<T[K]>;\n} : T;\nexport declare const value: {\n    items: Parsed<Json[]>;\n};\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "953936a7d2e44e8d543bdcdc4ae0637f-type Json = string | Json[];\ntype Parsed<T> = T extends object ? { [K in keyof T]: Parsed<T[K]> } : T;\ndeclare function wrap<T>(value: T): Parsed<T>;\nexport const value = wrap({ items: [] as Json[] });\nconst items: Json[] = value.items;\nvalue.items[0] = [\"ok\"];\nvalue.items[0] = 123;\n\ntype Mutable<T> = { -readonly [K in keyof T]: Parsed<T[K]> };\ntype Immutable<T> = { readonly [K in keyof T]: Parsed<T[K]> };\ntype Optional<T> = { [K in keyof T]?: Parsed<T[K]> };\ntype Required<T> = { [K in keyof T]-?: Parsed<T[K]> };\ndeclare const mutable: Mutable<readonly Json[]>;\ndeclare const immutable: Immutable<Json[]>;\ndeclare const optional: Optional<Json[]>;\ndeclare const required: Required<(Json | undefined)[]>;\nmutable[0] = [\"ok\"];\nimmutable[0] = \"error\";\noptional[0] = undefined;\nrequired[0] = undefined;\n\nfunction convert<T>(value: T[]): Parsed<T[]> {\n    return wrap(value);\n}\nconst converted: Json[] = convert<Json>([\"ok\"]);\ntype Tuple = string | [Tuple];\ntype ReadonlyTuple = string | readonly [ReadonlyTuple];\ntype OptionalTuple = string | [OptionalTuple?];\ntype RestTuple = string | [head: RestTuple, ...tail: RestTuple[]];\ntype LeadingRestTuple = string | [...head: LeadingRestTuple[], tail: LeadingRestTuple];\ndeclare const tuple: Parsed<[Tuple]>;\ndeclare const readonlyTuple: Parsed<readonly [ReadonlyTuple]>;\ndeclare const optionalTuple: Parsed<[OptionalTuple?]>;\ndeclare const restTuple: Parsed<[head: RestTuple, ...tail: RestTuple[]]>;\ndeclare const leadingRestTuple: Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>;\nconst tupleItem: Tuple = tuple[0];\nconst optionalItem: OptionalTuple | undefined = optionalTuple[0];\nconst restItem: RestTuple = restTuple[1];\nconst leadingRestItem: LeadingRestTuple = leadingRestTuple[0];\ntuple[0] = [\"ok\"];\ntuple[0] = 123;\nreadonlyTuple[0] = \"error\";\noptionalTuple[0] = undefined;\noptionalTuple[0] = 123;\nrestTuple[1] = 123;\nleadingRestTuple[0] = 123;\n\ndeclare const optionalRest: Optional<[...items: Json[], last: Json]>;\nconst optionalRestItems: (Json | undefined)[] = optionalRest;\ntype DeepOptional<T> = T extends object ? { [K in keyof T]?: DeepOptional<T[K]> } : T;\ndeclare const deepOptionalRest: DeepOptional<[...items: LeadingRestTuple[], last: LeadingRestTuple]>;\nconst emptyOptionalRest: typeof deepOptionalRest = [];\ndeepOptionalRest[0] = undefined;\ndeepOptionalRest[0] = 123;\ndeclare const requiredTuple: Required<[item?: Json]>;\nrequiredTuple[0] = undefined;\nfunction convertTuple<T extends unknown[]>(value: [string, ...T]): Parsed<[string, ...T]> {\n    return wrap(value);\n}\nconst convertedTuple: [string, [Tuple], number] = convertTuple([\"ok\", [\"nested\"] as [Tuple], 1]);\ndeclare const variadicUnion: Parsed<[string, ...([Tuple] | [Tuple, Tuple])]>;\nconst mappedUnion: [string, Tuple] | [string, Tuple, Tuple] = variadicUnion;\ndeclare const intersection: Parsed<Json[] & readonly Json[]>;\nintersection[0] = 123;\ntype First = string | [Second];\ntype Second = string | First[];\ndeclare const mutual: Parsed<[First, Second]>;\nconst mutualItems: [First, Second] = mutual;\nmutual[0] = 123;\ntype Endless<T> = T extends string ? Endless<T> : never;\ntype NonTerminating = Endless<string>;\n// comment-only edit\n",
        "signature": "fcde39c2b051f56c2bdf4ff787c0b50e-type Json = string | Json[];\ntype Parsed<T> = T extends object ? {\n    [K in keyof T]: Parsed<T[K]>;\n} : T;\nexport declare const value: {\n    items: Parsed<Json[]>;\n};\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "declaration": true,
    "strict": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "pos": 262,
          "end": 276,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<Json[]>"
          ]
        },
        {
          "pos": 731,
          "end": 743,
          "code": 2542,
          "category": 1,
          "messageKey": "Index_signature_in_type_0_only_permits_reading_2542",
          "messageArgs": [
            "Immutable<Json[]>"
          ]
        },
        {
          "pos": 780,
          "end": 791,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "undefined",
            "string | Parsed<Json[]>"
          ]
        },
        {
          "pos": 1768,
          "end": 1776,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<[Tuple]>"
          ]
        },
        {
          "pos": 1798,
          "end": 1799,
          "code": 2540,
          "category": 1,
          "messageKey": "Cannot_assign_to_0_because_it_is_a_read_only_property_2540",
          "messageArgs": [
            "0"
          ]
        },
        {
          "pos": 1842,
          "end": 1858,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "123",
            "string | Parsed<[(OptionalTuple | undefined)?]> | undefined"
          ]
        },
        {
          "pos": 1866,
          "end": 1878,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<[head: RestTuple, ...tail: RestTuple[]]>"
          ]
        },
        {
          "pos": 1886,
          "end": 1905,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>"
          ]
        },
        {
          "pos": 2323,
          "end": 2342,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "123",
            "string | DeepOptional<[...head: LeadingRestTuple[], tail: LeadingRestTuple]> | undefined"
          ]
        },
        {
          "pos": 2404,
          "end": 2420,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "undefined",
            "string | Parsed<Json[]>"
          ]
        },
        {
          "pos": 2867,
          "end": 2882,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<Json[]>"
          ]
        },
        {
          "pos": 3046,
          "end": 3055,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string | Parsed<[Second]>"
          ]
        },
        {
          "pos": 3142,
          "end": 3157,
          "code": 2589,
          "category": 1,
          "messageKey": "Type_instantiation_is_excessively_deep_and_possibly_infinite_2589"
        }
      ]
    ]
  ],
  "size": 6731
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/index.ts


Edit [2]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.ts[0m:[93m7[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<Json[]>'.

[7m7[0m value.items[0] = 123;
[7m [0m [91m~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m18[0m:[93m1[0m - [91merror[0m[90m TS2542: [0mIndex signature in type 'Immutable<Json[]>' only permits reading.

[7m18[0m immutable[0] = "error";
[7m  [0m [91m~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m20[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type 'string | Parsed<Json[]>'.

[7m20[0m required[0] = undefined;
[7m  [0m [91m~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m41[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[Tuple]>'.

[7m41[0m tuple[0] = 123;
[7m  [0m [91m~~~~~~~~[0m

[96mindex.ts[0m:[93m42[0m:[93m15[0m - [91merror[0m[90m TS2540: [0mCannot assign to '0' because it is a read-only property.

[7m42[0m readonlyTuple[0] = "error";
[7m  [0m [91m              ~[0m

[96mindex.ts[0m:[93m44[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType '123' is not assignable to type 'string | Parsed<[(OptionalTuple | undefined)?]> | undefined'.

[7m44[0m optionalTuple[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m45[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[head: RestTuple, ...tail: RestTuple[]]>'.

[7m45[0m restTuple[1] = 123;
[7m  [0m [91m~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m46[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[...head: LeadingRestTuple[], tail: LeadingRestTuple]>'.

[7m46[0m leadingRestTuple[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m54[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType '123' is not assignable to type 'string | DeepOptional<[...head: LeadingRestTuple[], tail: LeadingRestTuple]> | undefined'.

[7m54[0m deepOptionalRest[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m56[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'undefined' is not assignable to type 'string | Parsed<Json[]>'.

[7m56[0m requiredTuple[0] = undefined;
[7m  [0m [91m~~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m64[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<Json[]>'.

[7m64[0m intersection[0] = 123;
[7m  [0m [91m~~~~~~~~~~~~~~~[0m

[96mindex.ts[0m:[93m69[0m:[93m1[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string | Parsed<[Second]>'.

[7m69[0m mutual[0] = 123;
[7m  [0m [91m~~~~~~~~~[0m

[96mindex.ts[0m:[93m71[0m:[93m23[0m - [91merror[0m[90m TS2589: [0mType instantiation is excessively deep and possibly infinite.

[7m71[0m type NonTerminating = Endless<string>;
[7m  [0m [91m                      ~~~~~~~~~~~~~~~[0m


Found 13 errors in the same file, starting at: index.ts[90m:7[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
