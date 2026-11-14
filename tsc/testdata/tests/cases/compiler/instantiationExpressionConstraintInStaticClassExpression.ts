// @strict: true
// @noEmit: true
// @target: esnext

// A<T> does not satisfy the constraint A of B, as T is not assignable to
// number, which must be reported.

class A<T = number> {
  value!: T;
  child!: InstanceType<typeof A.B<A<T>>>; // this should error

  static B = class B<T extends A = A> {
    parent!: T;
  };
}
