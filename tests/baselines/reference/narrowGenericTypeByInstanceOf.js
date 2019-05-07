//// [narrowGenericTypeByInstanceOf.ts]
// From #28560

function preserveParentParameters() {
  class Parent<T> {
    value: T;
  }
  class Child<S> extends Parent<S> {
    other: S;
  }

  function withNumber(p: Parent<number>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
  function withString(p: Parent<string>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
  function withGeneric<A>(p: Parent<A>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
}

function copyParameterStructurally() {
  class Parent<T> {
    value: T;
  }
  class Child<S> {
    value: S;
    other: S;
  }

  function withNumber(p: Parent<number>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
  function withString(p: Parent<string>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
  function withGeneric<A>(p: Parent<A>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
}

function useConstraint() {
  // #17473
  interface Foo {
    foo: string;
  }

  class Bar<T extends Foo> {
    constructor(readonly bar: T) {}
  }

  let a: any;
  if (a instanceof Bar) {
    a.bar; // <-- a.bar should be 'Foo' instead of 'any'
  }
}

function enhanceConstraint() {
  class Parent<T extends 1 | 2 | 3 | 4> {
    value: T;
  }
  class Child<T extends 1 | 2> extends Parent<T> {
    other: T;
  }

  function simpleExtends(p: Parent<1 | 2 | 3 | 4>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
  function complexExtends(p: Parent<2 | 3>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
  function impossibleExtends(p: Parent<3 | 4>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
}

function dontWidenPointlessly() {
  class Query<T> {
    uses: T;
  }
  function f<T>(p: T[] | Query<T>) {
    if (Array.isArray(p)) {
      p; // T[], so far so good
    } else if (p instanceof Query) {
      p; // should be Query<T>, not Query<any>
    }
  }
}

function multipleParameters() {
  class Parent<A, B> {
    a: A;
    b: B;
  }
  class Swapped<X, Y> extends Parent<Y, X> {
    x: X;
    y: Y;
  }
  function checkSwapped(p: Parent<number, string>) {
    if (p instanceof Swapped) {
      p;
    } else {
      p;
    }
  }
}

function inconsistentParameters() {
  class Parent<A, B> {
    a: A;
    b: B;
  }
  class Child<C> extends Parent<C, C> {
    c: C;
  }
  function possible(p: Parent<number, number>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
  function impossible(p: Parent<number, string>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
}

function union() {
  class Parent<A> {
    a: A;
  }
  class Child<B> extends Parent<B> {
    b: B;
  }
  function multipleParents(
    p: Parent<number> | Parent<string> | Parent<boolean>
  ) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
  function mixedChildren(p: Parent<number> | Child<string>) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
  function imcompatibleOptions(
    p: Parent<number> | Parent<string> | { foo: boolean }
  ) {
    if (p instanceof Child) {
      p;
    } else {
      p;
    }
  }
}


//// [narrowGenericTypeByInstanceOf.js]
// From #28560
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
function preserveParentParameters() {
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
    function withNumber(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
    function withString(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
    function withGeneric(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
}
function copyParameterStructurally() {
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var Child = /** @class */ (function () {
        function Child() {
        }
        return Child;
    }());
    function withNumber(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
    function withString(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
    function withGeneric(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
}
function useConstraint() {
    var Bar = /** @class */ (function () {
        function Bar(bar) {
            this.bar = bar;
        }
        return Bar;
    }());
    var a;
    if (a instanceof Bar) {
        a.bar; // <-- a.bar should be 'Foo' instead of 'any'
    }
}
function enhanceConstraint() {
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
    function simpleExtends(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
    function complexExtends(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
    function impossibleExtends(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
}
function dontWidenPointlessly() {
    var Query = /** @class */ (function () {
        function Query() {
        }
        return Query;
    }());
    function f(p) {
        if (Array.isArray(p)) {
            p; // T[], so far so good
        }
        else if (p instanceof Query) {
            p; // should be Query<T>, not Query<any>
        }
    }
}
function multipleParameters() {
    var Parent = /** @class */ (function () {
        function Parent() {
        }
        return Parent;
    }());
    var Swapped = /** @class */ (function (_super) {
        __extends(Swapped, _super);
        function Swapped() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Swapped;
    }(Parent));
    function checkSwapped(p) {
        if (p instanceof Swapped) {
            p;
        }
        else {
            p;
        }
    }
}
function inconsistentParameters() {
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
    function possible(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
    function impossible(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
}
function union() {
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
    function multipleParents(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
    function mixedChildren(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
    function imcompatibleOptions(p) {
        if (p instanceof Child) {
            p;
        }
        else {
            p;
        }
    }
}
