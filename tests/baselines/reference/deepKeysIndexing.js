//// [deepKeysIndexing.ts]
// regression test from https://github.com/Microsoft/TypeScript/issues/29692
interface DeepObject {
  [k1: string]: {
    [k2: string]: any;
  };
}

type keys2broken<
  O extends DeepObject,
  K1 extends keyof O
> = O[K1] extends object ? Extract<keyof O[K1], string> : never;

type keys2working<
  O extends DeepObject,
  K1 extends keyof O
> = O[K1] extends object ? keyof O[K1] : never;

type keys2workaround<O extends DeepObject, K1 extends keyof O> = Extract<
  O[K1] extends object ? keyof O[K1] : never,
  string
>;

interface Foo extends DeepObject {
  a: {
    "1": 123;
    "2": string;
    "3": boolean;
  };
}

class Bar<O extends DeepObject> {
  broken<
    K1 extends keyof O,
    K2 extends keys2broken<O, K1>,
    V extends O[K1][K2]
  >(k1: K1, k2: K2, value: V) {}

  working<
    K1 extends keyof O,
    K2 extends keys2working<O, K1>,
    V extends O[K1][K2]
  >(k1: K1, k2: K2, value: V) {}

  workaround<
    K1 extends keyof O,
    K2 extends keys2workaround<O, K1>,
    V extends O[K1][K2]
  >(k1: K1, k2: K2, value: V) {}
}

const bar = new Bar<Foo>();
// all 3 of the below should error on passing `true` for `"1"`
bar.broken("a", "1", true); // was broken in the past - with 2nd argument incorrectly of type "1" | "2" | "3".
bar.working("a", "1", true); // ok - true is not allowed
bar.workaround("a", "1", true); // ok - true is not allowed


//// [deepKeysIndexing.js]
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.broken = function (k1, k2, value) { };
    Bar.prototype.working = function (k1, k2, value) { };
    Bar.prototype.workaround = function (k1, k2, value) { };
    return Bar;
}());
var bar = new Bar();
// all 3 of the below should error on passing `true` for `"1"`
bar.broken("a", "1", true); // was broken in the past - with 2nd argument incorrectly of type "1" | "2" | "3".
bar.working("a", "1", true); // ok - true is not allowed
bar.workaround("a", "1", true); // ok - true is not allowed
