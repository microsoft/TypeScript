// @strict: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/1020

// This tests ensures the change also works for discriminated unions with more than 10 cases

type Thing =
  | { str: "a", num: 0 }
  | { str: "b" }
  | { str: "c" }
  | { str: "d" }
  | { str: "e" }
  | { str: "f" }
  | { str: "g" }
  | { str: "h" }
  | { str: "i" }
  | { str: "j" }
  | { str: "k" }
  | { str: "l" }
  | { str: "m" }
  | { str: "n" }
  | { str: "o" }
  | { num: 1 }

const thing1: Thing = { str: "a", num: 0 }
const thing2: Thing = { str: "b", num: 1 } // Shouldn't be error
const thing3: Thing = { num: 1, str: "b" } // Shouldn't be error

type Item =
  | { kind: "a", subkind: 0, value: string }
  | { kind: "a", subkind: 1, value: number }
  | { kind: "b" }

const item1: Item = { subkind: 1, kind: "b" } // Error, type "b" not assignable to type "a"
const item2: Item = { kind: "b", subkind: 1 } // Error, 'subkind' isn't a known property
