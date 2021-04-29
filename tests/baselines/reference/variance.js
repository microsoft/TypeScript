//// [variance.ts]
// Test cases for parameter variances affected by conditional types.

// Repro from #30047

interface Foo<T> {
  prop: T extends unknown ? true : false;
}

const foo = { prop: true } as const;
const x: Foo<1> = foo;
const y: Foo<number> = foo;
const z: Foo<number> = x;


// Repro from #30118

class Bar<T extends string> {
  private static instance: Bar<string>[];

  cast(_name: ([T] extends [string] ? string : string)) { }
  
  pushThis() {
    Bar.instance.push(this);
  }
}

// from #31277
interface Set<T> {
  add(value: T): this;
}

declare const Set: new <T>() => Set<T>;

// Repro from #31251 (removed getter)

export abstract class Supervisor<N extends string, P = unknown, R = unknown> {
  private static instances_: Set<Supervisor<string, unknown, unknown>>;
  private static instances(): typeof Supervisor.instances_ {
      return this.hasOwnProperty('instances_')
          ? this.instances_
          : this.instances_ = new Set();
  }
  constructor() {
      void (this.constructor as typeof Supervisor).instances().add(this);
  }
  public abstract call(name: N | ('' extends N ? undefined : never), param: P, timeout?: number): Promise<R>;
}


// Minimal repro for catching variance probing in then extends type.

interface A<T> {
  x: number extends T ? 1 : 1;
}

declare let a: A<number>;
declare let b: A<3>;

a = b; // error
b = a; // error

//// [variance.js]
"use strict";
// Test cases for parameter variances affected by conditional types.
exports.__esModule = true;
exports.Supervisor = void 0;
var foo = { prop: true };
var x = foo;
var y = foo;
var z = x;
// Repro from #30118
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.cast = function (_name) { };
    Bar.prototype.pushThis = function () {
        Bar.instance.push(this);
    };
    return Bar;
}());
// Repro from #31251 (removed getter)
var Supervisor = /** @class */ (function () {
    function Supervisor() {
        void this.constructor.instances().add(this);
    }
    Supervisor.instances = function () {
        return this.hasOwnProperty('instances_')
            ? this.instances_
            : this.instances_ = new Set();
    };
    return Supervisor;
}());
exports.Supervisor = Supervisor;
a = b; // error
b = a; // error
