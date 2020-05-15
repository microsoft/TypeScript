//// [addOptimizationHints.ts]
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


//// [addOptimizationHints.js]
class HasNoStatics {
    method() { }
}
let HasStatic = /** @class */ (() => {
    class HasStatic {
        static someMethod() { }
        method() { }
    }
    HasStatic.value = 0;
    return HasStatic;
})();
let HasDecorator = /** @class */ (() => {
    let HasDecorator = class HasDecorator {
        method() { }
    };
    HasDecorator = __decorate([
        decorate
    ], HasDecorator);
    return HasDecorator;
})();
