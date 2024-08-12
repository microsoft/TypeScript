// @strict: true
// @target: esnext
// @noEmit: true

class A<T = number> {
  static {
    type _<T extends A = A> = T;
  }

  value!: T;
  child!: InstanceType<typeof A.B<A<T>>>;

  static B = class B<T extends A = A> {
    parent!: T;
  };
}

const A2 = class A2<T = number> {
  static {
    type _<T extends A2 = A2> = T;
  }

  value!: T;
  child!: InstanceType<typeof A2.B<A2<T>>>;

  static B = class B<T extends A2 = A2> {
    parent!: T;
  };
};
