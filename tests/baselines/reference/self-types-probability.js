//// [self-types-probability.ts]
let t0: Probability = 0.5
let t1: Probability = 0
let t2: Probability = 1
let t3: Probability = 1.5
let t4: Probability = -0.5
let t5: Probability = 0 as number
let t6: number = 0.5 as Probability
let t7: Probability = t0 + t1
let t8: number = t0 + t1

declare const f: (x: number) => void
f(t0)

type F<T extends number> = T
type T0 = F<Probability>

// TODO: this should compile
type T1 = Assert<Probability extends number ? true : false>

type Probability =
  self extends number
    ? IsProbability<self> extends true
      ? self
      : Never<`Type '${Print<self>}' is not assignable to type 'Probability'`>
    : number

type IsProbability<T extends number> =
  `${T}` extends `${infer H}${infer R}`
      ? H extends "0" ? true :
        H extends "1" ? R extends "" ? true : false :
        false
      : false

type Assert<T extends true> = T

export {}

//// [self-types-probability.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t0 = 0.5;
var t1 = 0;
var t2 = 1;
var t3 = 1.5;
var t4 = -0.5;
var t5 = 0;
var t6 = 0.5;
var t7 = t0 + t1;
var t8 = t0 + t1;
f(t0);
