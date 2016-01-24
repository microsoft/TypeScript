// @target: ES5
// @experimentaldecorators: true
// @noLib: true

// @Filename: a.ts
interface Object { }
interface Array<T> { }
interface String { }
interface Boolean { }
interface Number { }
interface Function { }
interface RegExp { }
interface IArguments { }

// @Filename: b.ts
declare function dec(t, k, d);

class C {
    @dec
    method() {}
}

