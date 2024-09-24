//// [tests/cases/compiler/classExpressionInClassInstantiationEmit1.ts] ////

//// [classExpressionInClassInstantiationEmit1.ts]
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


//// [classExpressionInClassInstantiationEmit1.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _c, _d, _e, _f;
var A1 = /** @class */ (function () {
    function A1() {
    }
    A1.B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
    return A1;
}());
;
var A2 = (_a = /** @class */ (function () {
        function class_1() {
        }
        return class_1;
    }()),
    __setFunctionName(_a, "A2"),
    _a.B = /** @class */ (function () {
        function B() {
        }
        return B;
    }()),
    _a);
var A3 = (_b = /** @class */ (function () {
        function A3() {
        }
        return A3;
    }()),
    _b.B = /** @class */ (function () {
        function B() {
        }
        return B;
    }()),
    _b);
var A4 = (_c = /** @class */ (function () {
        function C() {
        }
        return C;
    }()),
    _c.B = /** @class */ (function () {
        function B() {
        }
        return B;
    }()),
    _c);
var A5 = /** @class */ (function () {
    function A5() {
    }
    A5.B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
    return A5;
}());
;
var A6 = (_d = /** @class */ (function () {
        function class_2() {
        }
        return class_2;
    }()),
    __setFunctionName(_d, "A6"),
    _d.B = /** @class */ (function () {
        function B() {
        }
        return B;
    }()),
    _d);
var A7 = (_e = /** @class */ (function () {
        function A7() {
        }
        return A7;
    }()),
    _e.B = /** @class */ (function () {
        function B() {
        }
        return B;
    }()),
    _e);
var A8 = (_f = /** @class */ (function () {
        function C() {
        }
        return C;
    }()),
    _f.B = /** @class */ (function () {
        function B() {
        }
        return B;
    }()),
    _f);


//// [classExpressionInClassInstantiationEmit1.d.ts]
declare class A1<T> {
    child: InstanceType<typeof A1.B<T>>;
    static B: {
        new <T_1>(): {
            parent: T_1;
        };
    };
}
declare const A2: {
    new <T>(): {
        child: InstanceType<typeof A2.B<T>>;
    };
    B: {
        new <T>(): {
            parent: T;
        };
    };
};
declare const A3: {
    new <T>(): {
        child: InstanceType<{
            new (): {
                parent: T;
            };
        }>;
    };
    B: {
        new <T>(): {
            parent: T;
        };
    };
};
declare const A4: {
    new <T>(): {
        child: InstanceType<{
            new (): {
                parent: T;
            };
        }>;
    };
    B: {
        new <T>(): {
            parent: T;
        };
    };
};
declare class A5<T> {
    child: typeof A5.B<T>;
    static B: {
        new <T_1>(): {
            parent: T_1;
        };
    };
}
declare const A6: {
    new <T>(): {
        child: typeof A6.B<T>;
    };
    B: {
        new <T>(): {
            parent: T;
        };
    };
};
declare const A7: {
    new <T>(): {
        child: {
            new (): {
                parent: T;
            };
        };
    };
    B: {
        new <T>(): {
            parent: T;
        };
    };
};
declare const A8: {
    new <T>(): {
        child: {
            new (): {
                parent: T;
            };
        };
    };
    B: {
        new <T>(): {
            parent: T;
        };
    };
};
