//// [bug39372.js]
/** @typedef {ReadonlyArray<Json>} JsonArray */
/** @typedef {{ readonly [key: string]: Json }} JsonRecord */
/** @typedef {boolean | number | string | null | JsonRecord | JsonArray | readonly []} Json */

/**
 * @template T
 * @typedef {{
  $A: {
    [K in keyof T]?: XMLObject<T[K]>[]
  },
  $O: {
    [K in keyof T]?: {
      $$?: Record<string, string>
    } & (T[K] extends string ? {$:string} : XMLObject<T[K]>)
  },
  $$?: Record<string, string>,
  } & {
  [K in keyof T]?: (
    T[K] extends string ? string
      : XMLObject<T[K]>
  )
}} XMLObject<T> */

/** @type {XMLObject<{foo:string}>} */
const p = {};


//// [bug39372.js]
/** @typedef {ReadonlyArray<Json>} JsonArray */
/** @typedef {{ readonly [key: string]: Json }} JsonRecord */
/** @typedef {boolean | number | string | null | JsonRecord | JsonArray | readonly []} Json */
/**
 * @template T
 * @typedef {{
  $A: {
    [K in keyof T]?: XMLObject<T[K]>[]
  },
  $O: {
    [K in keyof T]?: {
      $$?: Record<string, string>
    } & (T[K] extends string ? {$:string} : XMLObject<T[K]>)
  },
  $$?: Record<string, string>,
  } & {
  [K in keyof T]?: (
    T[K] extends string ? string
      : XMLObject<T[K]>
  )
}} XMLObject<T> */
/** @type {XMLObject<{foo:string}>} */
var p = {};


//// [bug39372.d.ts]
/** @typedef {ReadonlyArray<Json>} JsonArray */
/** @typedef {{ readonly [key: string]: Json }} JsonRecord */
/** @typedef {boolean | number | string | null | JsonRecord | JsonArray | readonly []} Json */
/**
 * @template T
 * @typedef {{
  $A: {
    [K in keyof T]?: XMLObject<T[K]>[]
  },
  $O: {
    [K in keyof T]?: {
      $$?: Record<string, string>
    } & (T[K] extends string ? {$:string} : XMLObject<T[K]>)
  },
  $$?: Record<string, string>,
  } & {
  [K in keyof T]?: (
    T[K] extends string ? string
      : XMLObject<T[K]>
  )
}} XMLObject<T> */
/** @type {XMLObject<{foo:string}>} */
declare const p: XMLObject<{
    foo: string;
}>;
type JsonArray = ReadonlyArray<Json>;
type JsonRecord = {
    readonly [key: string]: Json;
};
type Json = boolean | number | string | null | JsonRecord | readonly Json[] | readonly [];
/**
 * <T>
 */
type XMLObject<T> = {
    $A: { [K in keyof T]?: XMLObject<T[K]>[]; };
    $O: { [K_1 in keyof T]?: {
        $$?: Record<string, string>;
    } & (T[K_1] extends string ? {
        $: string;
    } : XMLObject<T[K_1]>); };
    $$?: Record<string, string>;
} & { [K_2 in keyof T]?: T[K_2] extends string ? string : XMLObject<T[K_2]>; };
