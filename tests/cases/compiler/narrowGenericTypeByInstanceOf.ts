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
