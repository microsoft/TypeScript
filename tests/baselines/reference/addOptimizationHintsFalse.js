//// [addOptimizationHintsFalse.ts]
class HasNoStatics {
  value: unknown;
  method() {}
}

class HasStatic {
  static value = 0;
  static someMethod() {}

  method() {}
}

@decorate
class HasDecorator {
  method() {}
}


//// [addOptimizationHintsFalse.js]
class HasNoStatics {
    method() { }
}
class HasStatic {
    static someMethod() { }
    method() { }
}
HasStatic.value = 0;
let HasDecorator = class HasDecorator {
    method() { }
};
HasDecorator = __decorate([
    decorate
], HasDecorator);
