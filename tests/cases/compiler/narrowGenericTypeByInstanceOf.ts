import { stringify } from "querystring";

function example1() {
  class Parent<T> {
    value: T;
  }

  class Child<T> extends Parent<T> {
    other: T;
  }

  const obj = new Parent<number>();

  function onlyChildNumber(child: Child<number>) {
    // no-op
  }
  function onlyChildString(child: Child<string>) {
    // no-op
  }

  if (obj instanceof Child) {
    onlyChildNumber(obj); // should PASS

    onlyChildString(obj); // should ERROR: Child<number> is not assignable to Child<string>.
  }
}
function example2() {
  class Parent<A, B> {
    value1: A;
    value2: B;
  }

  class Child<T> extends Parent<T, T> {
    other: T;
  }

  const obj = new Parent<number, number>();

  function onlyChildNumber(child: Child<number>) {
    // no-op
  }
  function onlyChildString(child: Child<string>) {
    // no-op
  }

  if (obj instanceof Child) {
    onlyChildNumber(obj); // should PASS

    onlyChildString(obj); // should ERROR: Child<number> is not assignable to Child<string>.
  }
}

function example3() {
  class Parent<A, B> {
    value1: A;
    value2: B;
  }

  class Child<C, D> extends Parent<D, C> {
    value3: C;
    value4: D;
  }

  const obj = new Parent<number, string>();

  function onlyChildNumberString(child: Child<number, string>) {
    // no-op
  }
  function onlyChildStringNumber(child: Child<string, number>) {
    // no-op
  }
  function onlyChildNumberNumber(child: Child<string, number>) {
    // no-op
  }

  if (obj instanceof Child) {
    onlyChildNumberString(obj); // should ERROR: Child<string, number> is not assignable to Child<number, string>.
    onlyChildNumberNumber(obj); // should ERROR: Child<number, number> is not assignable to Child<number, string>.

    onlyChildStringNumber(obj); // should PASS
  }
}

function example4() {
  class Parent<A, B> {
    value1: A;
    value2: B;
  }

  class Child<C> extends Parent<C, C> {
    value3: C;
  }

  const obj1 = new Parent<number, string>();
  const obj2 = new Parent<number, number>();

  function onlyChildNumber(child: Child<number>) {
    // no-op
  }
  function onlyChildString(child: Child<string>) {
    // no-op
  }
  function onlyChildStringAndNumber(child: Child<string & number>) {
    // no-op
  }

  if (obj1 instanceof Child) {
    onlyChildNumber(obj1);
    onlyChildString(obj1);
    onlyChildStringAndNumber(obj1);
  }
  if (obj2 instanceof Child) {
    onlyChildNumber(obj2);
    onlyChildString(obj2);
    onlyChildStringAndNumber(obj2);
  }
}

function example5<S, T>() {
  class Parent<A, B> {
    value1: A;
    value2: B;
  }

  class Child<C> extends Parent<C, C> {
    value3: C;
  }

  const obj = new Parent<S, T>();

  function onlyChildS(child: Child<S>) {
    // no-op
  }
  function onlyChildT(child: Child<T>) {
    // no-op
  }
  function onlyChildSAndT(child: Child<S & T>) {
    // no-op
  }

  if (obj instanceof Child) {
    onlyChildS(obj);
    onlyChildT(obj);
    onlyChildSAndT(obj);
  }
}

function example6() {
  class Parent<A, B> {
    value1: A;
    value2: B;
  }

  class Child<C> extends Parent<C, C> {
    value3: C;
  }

  const obj:
    | Parent<{ foo: string }, { foo: string }>
    | Parent<string, string>
    | Parent<number, number> = undefined as any;

  const obj1 = undefined as Parent<{ foo: string }, { foo: string }>;
  const obj2 = undefined as Parent<string, string>;
  const obj3 = undefined as Parent<number, number>;
  const obj4 = undefined as string | { foo: string };
  const obj5 = undefined as { foo: string };

  function onlyChildString(child: Child<string>) {
    // no-op
  }
  function onlyChildNumber(child: Child<number>) {
    // no-op
  }

  if (obj instanceof Child) {
    onlyChildString(obj);
    onlyChildNumber(obj);
  }

  if (obj1 instanceof Child) {
    console.log(obj1);
  }
  if (obj2 instanceof Child) {
    console.log(obj2);
  }
  if (obj3 instanceof Child) {
    console.log(obj3);
  }
  if (obj4 instanceof Child) {
    console.log(obj4);
  }
  if (obj5 instanceof Child) {
    console.log(obj5);
  }
}

function negative1() {
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
    return;
  }

  console.log(obj);
}
