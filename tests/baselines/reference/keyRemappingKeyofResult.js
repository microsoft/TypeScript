//// [keyRemappingKeyofResult.ts]
export const sym = Symbol("")
type Orig = { [k: string]: any, str: any, [sym]: any }

type Okay = Exclude<keyof Orig, never>
// type Okay = string | number | typeof sym

type Remapped = { [K in keyof Orig as {} extends Record<K, any> ? never : K]: any }
/* type Remapped = {
    str: any;
    [sym]: any;
} */
// no string index signature, right?

type Oops = Exclude<keyof Remapped, never>
declare let x: Oops;
x = sym;
x = "str";
// type Oops = typeof sym <-- what happened to "str"?

//// [keyRemappingKeyofResult.js]
export const sym = Symbol("");
x = sym;
x = "str";
// type Oops = typeof sym <-- what happened to "str"?
