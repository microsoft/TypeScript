// @target: es6
const sym = Symbol("")
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

// equivalently, with an unresolved generic (no `exclude` shenanigans, since conditions won't execute):
function f<T>() {
    type Orig = { [k: string]: any, str: any, [sym]: any } & T;
    
    type Okay = keyof Orig;
    let a: Okay;
    a = "str";
    a = sym;
    a = "whatever";
    // type Okay = string | number | typeof sym
    
    type Remapped = { [K in keyof Orig as {} extends Record<K, any> ? never : K]: any }
    /* type Remapped = {
        str: any;
        [sym]: any;
    } */
    // no string index signature, right?
    
    type Oops = keyof Remapped;
    let x: Oops;
    x = sym;
    x = "str";
}

// and another generic case with a _distributive_ mapping, to trigger a different branch in `getIndexType`
function g<T>() {
    type Orig = { [k: string]: any, str: any, [sym]: any } & T;
    
    type Okay = keyof Orig;
    let a: Okay;
    a = "str";
    a = sym;
    a = "whatever";
    // type Okay = string | number | typeof sym

    type NonIndex<T extends PropertyKey> = {} extends Record<T, any> ? never : T;
    type DistributiveNonIndex<T extends PropertyKey> = T extends unknown ? NonIndex<T> : never;
    
    type Remapped = { [K in keyof Orig as DistributiveNonIndex<K>]: any }
    /* type Remapped = {
        str: any;
        [sym]: any;
    } */
    // no string index signature, right?
    
    type Oops = keyof Remapped;
    let x: Oops;
    x = sym;
    x = "str";
}

export {};