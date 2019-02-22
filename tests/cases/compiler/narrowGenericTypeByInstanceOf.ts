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
