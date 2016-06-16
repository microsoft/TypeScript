interface Comparable {}
class A extends Comparable {}
class B implements Comparable {}

interface Comparable2<T> {}
class A2<T> extends Comparable2<T> {}
class B2<T> implements Comparable2<T> {}

function Factory(a: any): {new()} {
  return null
}

class C extends Factory(Comparable) {}

module M {
  export interface I1 {}
  export interface I2<T> {}
}
class C1 extends M.I1 {}
class C2<T> extends M.I2<T> {}

namespace N {
  export interface I1 {}
  export interface I2<T> {}
}

class D1 extends N.I1 {}
class D2<T> extends N.I2<T> {}
