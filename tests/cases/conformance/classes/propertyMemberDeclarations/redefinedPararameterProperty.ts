// @noTypesAndSymbols: true
// @strictNullChecks: true
// @target: esnext
// @useDefineForClassFields: true
class Base {
    a = 1;
  }
  
  class Derived extends Base {
    b = this.a /*undefined*/;
  
    constructor(public a: number) {
        super();
    }
  }
  