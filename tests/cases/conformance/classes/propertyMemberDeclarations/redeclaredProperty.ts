// @noTypesAndSymbols: true
// @strictNullChecks: true
// @target: esnext
// @useDefineForClassFields: true
class Base {
  b = 1;
}

class Derived extends Base {
  b;
  d = this.b;

  constructor() {
    super();
    this.b = 2;
  }
}
