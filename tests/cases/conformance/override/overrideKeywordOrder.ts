// @noTypesAndSymbols: true
// @noEmit: true

class Base {
  static s1() {}
  static s2() {}
  m1() {}
  m2() {}
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
}
class Test3 extends Base {
  override public m1() {} // error
  public override m2() {}
}
class Test4 extends Base {
  override readonly p1: any;
  readonly override p2: any; // error
}
