module m {
  export var m = '';
}

import x = m.m;

class C {
  public foo() {
    var x = '';
  }
}