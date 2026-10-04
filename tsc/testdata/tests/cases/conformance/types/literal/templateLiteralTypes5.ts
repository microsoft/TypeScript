// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55364
interface TypeMap {
  a: "A";
  b: "B";
}
declare const f: <T0 extends "a" | "b">(x: `${T0}`) => TypeMap[T0];
type F1 = <T1 extends "a" | "b">(x: `${T1}`) => TypeMap[T1];
const f1: F1 = f; 
type F2 = <T2 extends 'a' | 'b'>(x: `${T2}`) => TypeMap[`${T2}`]
const f2: F2 = f

function f3<T3 extends "a" | "b">(x: T3) {
    const test1: `${T3}` = x    
    const test2: T3 = "" as `${T3}`;    
}
