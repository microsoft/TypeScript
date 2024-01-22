// @strict: true
// @noEmit: true

type T00<K extends "a" | "b"> = K & "a";
type T01<K extends "a" | "b"> = K & "c";
type T02<K extends "a" | "b"> = K & string;

type T10<K extends string> = K & "a";
type T11<K extends string> = K & "c";
type T12<K extends string> = K & string;

type T20<K extends "a" | "b" | "c"> = K & ("a" | "b" | "c");
type T21<K extends "a" | "b" | "c"> = ("a" | "b" | "c") & K;
type T22<K extends "a" | "b" | "c"> = K & ("a" | "b");
type T23<K extends "a" | "b" | "c"> = ("a" | "b") & K;

type T30<K extends "a" | "b"> = K & ("a" | "b" | "c");
type T31<K extends "a" | "b"> = ("a" | "b" | "c") & K;
type T32<K extends "a" | "b"> = K & ("a" | "b");
type T33<K extends "a" | "b"> = ("a" | "b") & K;

type T40<K extends {}> = K & undefined;
type T41<K extends {}> = K & null;
type T42<K extends {}> = K & object;
type T43<K extends {}> = K & {};

type T50<K extends "a" | 0> = K & "a";
type T51<K extends "a" | 0> = K & "b";
type T52<K extends "a" | 0> = K & string;
type T53<K extends "a" | 0> = K & 0;
type T54<K extends "a" | 0> = K & 1;
type T55<K extends "a" | 0> = K & number;

type T60<T extends "a" | "b", U extends T> = U & "a";
type T61<T extends "a" | "b", U extends T> = U & ("a" | "b");
type T62<T extends "a" | "b", U extends T> = U & ("a" | "b" | "c");
type T63<T extends "a" | "b", U extends T> = U & string;

type T70<T extends "a" | "b", U extends T | "c"> = U & "a";
type T71<T extends "a" | "b", U extends T | "c"> = U & ("a" | "b");
type T72<T extends "a" | "b", U extends T | "c"> = U & ("a" | "b" | "c");
type T73<T extends "a" | "b", U extends T | "c"> = U & string;

declare function isA(x: any): x is "a";
declare function isB(x: any): x is "b";
declare function isC(x: any): x is "c";

function foo<K extends "a" | "b">(x: K) {
  if (isA(x)) {
    x;  // K & "a"
  }
  if (isB(x)) {
    x;  // K & "b"
  }
  if (isC(x)) {
    x;  // never
  }
  if (isA(x) || isB(x)) {
    x;  // K
  }
  if (!(isA(x) || isB(x))) {
    return;
  }
  x;  // K
}

// Example from #30581

type OptionOne = {
  kind: "one";
  s: string;
};

type OptionTwo = {
  kind: "two";
  x: number;
  y: number;
};

type Options = OptionOne | OptionTwo;

type OptionHandlers = {
  [K in Options['kind']]: (option: Options & { kind: K }) => string;
}

const optionHandlers: OptionHandlers = {
  "one": option => option.s,
  "two": option => option.x + "," + option.y,
};

function handleOption<K extends Options['kind']>(option: Options & { kind: K }): string {
  const kind = option.kind;
  const handler = optionHandlers[kind];
  return handler(option);
};
