// @strict: true
// @declaration: true

class A1<T> {
  child!: InstanceType<typeof A1.B<T>>;
  static B = class B<T> {
    parent!: T;
  };
};

const A2 = class<T> {
  child!: InstanceType<typeof A2.B<T>>;
  static B = class B<T> {
    parent!: T;
  };
};

const A3 = class A3<T> {
  child!: InstanceType<typeof A3.B<T>>;
  static B = class B<T> {
    parent!: T;
  };
};

const A4 = class C<T> {
  child!: InstanceType<typeof C.B<T>>;
  static B = class B<T> {
    parent!: T;
  };
};

class A5<T> {
  child!: typeof A5.B<T>;
  static B = class B<T> {
    parent!: T;
  };
};

const A6 = class<T> {
  child!: typeof A6.B<T>;
  static B = class B<T> {
    parent!: T;
  };
};

const A7 = class A7<T> {
  child!: typeof A7.B<T>;
  static B = class B<T> {
    parent!: T;
  };
};

const A8 = class C<T> {
  child!: typeof C.B<T>;
  static B = class B<T> {
    parent!: T;
  };
};
