//// [narrowGenericTypeByInstanceOf.ts]
function exampleSingleArgument() {
  class Parent<T> {
    value: T;
  }

  class Child<T> extends Parent<T> {
    other: T;
  }

  const obj: Parent<number> = undefined as any;

  if (obj instanceof Child) {
    obj;
  }
}
function exampleSingleExtendsMultiple() {
  class Parent<A, B> {
    value1: A;
    value2: B;
  }

  class Child<T> extends Parent<T, T> {
    other: T;
  }

  const obj: Parent<number, number> = undefined as any;

  if (obj instanceof Child) {
    obj;
  }
}

function exampleSwapParameterOrder() {
  class Parent<A, B> {
    value1: A;
    value2: B;
  }

  class Child<C, D> extends Parent<D, C> {
    value3: C;
    value4: D;
  }

  const obj: Parent<number, string> = undefined as any;

  if (obj instanceof Child) {
    obj;
  }
}

function exampleSingleExtendsMultipleReject() {
  class Parent<A, B> {
    value1: A;
    value2: B;
  }

  class Child<C> extends Parent<C, C> {
    value3: C;
  }

  const obj: Parent<number, string> = undefined as any;

  if (obj instanceof Child) {
    obj;
  }
}

function exampleUnion() {
  class Parent<A, B> {
    value1: A;
    value2: B;
  }

  class Child<C> extends Parent<C, C> {
    value3: C;
  }

  const obj0:
    | Parent<{ foo: string }, { foo: string }>
    | Parent<string, string>
    | Parent<number, number> = undefined as any;
  if (obj0 instanceof Child) {
    obj0;
  }

  const obj1 = undefined as Parent<{ foo: string }, { foo: string }>;
  if (obj1 instanceof Child) {
    obj1;
  }

  const obj2 = undefined as Parent<string, string>;
  if (obj2 instanceof Child) {
    obj2;
  }

  const obj3 = undefined as Parent<number, number>;
  if (obj3 instanceof Child) {
    obj3;
  }

  const obj4 = undefined as string | { foo: string };
  if (obj4 instanceof Child) {
    obj4;
  }
  const obj5 = undefined as { foo: string };
  if (obj5 instanceof Child) {
    obj5;
  }
}

function exampleNegative() {
  class Parent<A, B> {
    value1: A;
    value2: B;
  }

  class Child<C> extends Parent<C, C> {
    value3: C;
  }

  const obj:
    | Parent<string, string>
    | Parent<string, number>
    | Child<string> = undefined as any;

  if (obj instanceof Child) {
    // Here we filter out matching ones, instead of just narrowing to them.
    obj;
    return;
  }

  console.log(obj);
}

function exampleIgnoreDefaults() {
  // default parameters shouldn't have any impact on this narrowing.
  class Parent<A> {
    a: A;
  }
  class Child<A2, C = number> extends Parent<A2> {
    a2: A2;
    c: C;
  }

  const obj: Parent<number> = undefined as any;
  if (obj instanceof Child) {
    obj;
  }
}

function exampleConstraints() {
  class Parent<A> {
    a: A;
  }
  class Child<B extends number> extends Parent<B> {
    b: B;
  }

  const objPass: Parent<number> = undefined as any;
  if (objPass instanceof Child) {
    objPass;
  }

  const objFour: Parent<4> = undefined as any;
  if (objFour instanceof Child) {
    objFour;
  }

  const objFail: Parent<string> = undefined as any;
  if (objFail instanceof Child) {
    objFail;
  }
}

function exampleUnrelated() {
  class Child<A, B> {
    a: A;
    b: B;
    foo: number;
  }

  const objA = { a: 5 };
  if (objA instanceof Child) {
    objA; // Child<number, any>
  }

  const objB = { b: "hello" };
  if (objB instanceof Child) {
    objB; // Child<any, string>
  }

  const objAB = { a: 5, b: "hello" };
  if (objAB instanceof Child) {
    objAB; // Child<number, string>
  }

  const objAX = { a: 5, x: 7 };
  if (objAX instanceof Child) {
    objAX; // Child<number, any>
  }

  const objBX = { b: "hello", x: 7 };
  if (objBX instanceof Child) {
    objBX; // Child<any, string>
  }

  const objABX = { a: 5, b: "hello", x: 7 };
  if (objABX instanceof Child) {
    objABX; // Child<number, string>
  }
}


//// [narrowGenericTypeByInstanceOf.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function exampleSingleArgument() {
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var Child = /** @class */ (function (_super) {
        __extends(Child, _super);
        function Child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Child;
    }(Parent));
    var obj = undefined;
    if (obj instanceof Child) {
        obj;
    }
}
function exampleSingleExtendsMultiple() {
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var Child = /** @class */ (function (_super) {
        __extends(Child, _super);
        function Child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Child;
    }(Parent));
    var obj = undefined;
    if (obj instanceof Child) {
        obj;
    }
}
function exampleSwapParameterOrder() {
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var Child = /** @class */ (function (_super) {
        __extends(Child, _super);
        function Child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Child;
    }(Parent));
    var obj = undefined;
    if (obj instanceof Child) {
        obj;
    }
}
function exampleSingleExtendsMultipleReject() {
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var Child = /** @class */ (function (_super) {
        __extends(Child, _super);
        function Child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Child;
    }(Parent));
    var obj = undefined;
    if (obj instanceof Child) {
        obj;
    }
}
function exampleUnion() {
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var Child = /** @class */ (function (_super) {
        __extends(Child, _super);
        function Child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Child;
    }(Parent));
    var obj0 = undefined;
    if (obj0 instanceof Child) {
        obj0;
    }
    var obj1 = undefined;
    if (obj1 instanceof Child) {
        obj1;
    }
    var obj2 = undefined;
    if (obj2 instanceof Child) {
        obj2;
    }
    var obj3 = undefined;
    if (obj3 instanceof Child) {
        obj3;
    }
    var obj4 = undefined;
    if (obj4 instanceof Child) {
        obj4;
    }
    var obj5 = undefined;
    if (obj5 instanceof Child) {
        obj5;
    }
}
function exampleNegative() {
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var Child = /** @class */ (function (_super) {
        __extends(Child, _super);
        function Child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Child;
    }(Parent));
    var obj = undefined;
    if (obj instanceof Child) {
        // Here we filter out matching ones, instead of just narrowing to them.
        obj;
        return;
    }
    console.log(obj);
}
function exampleIgnoreDefaults() {
    // default parameters shouldn't have any impact on this narrowing.
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var Child = /** @class */ (function (_super) {
        __extends(Child, _super);
        function Child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Child;
    }(Parent));
    var obj = undefined;
    if (obj instanceof Child) {
        obj;
    }
}
function exampleConstraints() {
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var Child = /** @class */ (function (_super) {
        __extends(Child, _super);
        function Child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Child;
    }(Parent));
    var objPass = undefined;
    if (objPass instanceof Child) {
        objPass;
    }
    var objFour = undefined;
    if (objFour instanceof Child) {
        objFour;
    }
    var objFail = undefined;
    if (objFail instanceof Child) {
        objFail;
    }
}
function exampleUnrelated() {
    var Child = /** @class */ (function () {
        function Child() {
        }
        return Child;
    }());
    var objA = { a: 5 };
    if (objA instanceof Child) {
        objA; // Child<number, any>
    }
    var objB = { b: "hello" };
    if (objB instanceof Child) {
        objB; // Child<any, string>
    }
    var objAB = { a: 5, b: "hello" };
    if (objAB instanceof Child) {
        objAB; // Child<number, string>
    }
    var objAX = { a: 5, x: 7 };
    if (objAX instanceof Child) {
        objAX; // Child<number, any>
    }
    var objBX = { b: "hello", x: 7 };
    if (objBX instanceof Child) {
        objBX; // Child<any, string>
    }
    var objABX = { a: 5, b: "hello", x: 7 };
    if (objABX instanceof Child) {
        objABX; // Child<number, string>
    }
}
