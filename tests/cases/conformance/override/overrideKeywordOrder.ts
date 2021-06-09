// @noTypesAndSymbols: true
// @noEmit: true

abstract class Base {
  static s1() {}
  static s2() {}
  abstract m1(): void;
  abstract m2(): void;
  p1: any;
  p2: any;
}

class Test1 extends Base {
  override async m1() {}
  async override m2() {} // error
}
class Test2 extends Base {
  override static s1() {} // error
  static override s2() {}
  m1() {}
  m2() {}
}
class Test3 extends Base {
  override public m1() {} // error
  public override m2() {}
}
class Test4 extends Base {
  override readonly p1: any;
  readonly override p2: any; // error
  m1() {}
  m2() {}
}

abstract class Test5 extends Base {
  override abstract m1(): void; // error
  abstract override m2(): void;
}
