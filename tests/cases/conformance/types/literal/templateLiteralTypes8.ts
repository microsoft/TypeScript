// @strict: true
// @noEmit: true

const enum E {
  a = "a",
  b = "b",
}

type Stringify<T extends string> = `${T}`;

let z1: `${E}` = "a";
let z2: Stringify<E> = "a";