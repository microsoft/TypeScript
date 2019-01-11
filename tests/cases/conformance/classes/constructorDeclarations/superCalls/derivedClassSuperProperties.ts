// @target: ES5

class Base {
    constructor(a?) { }

    receivesAnything(param?) { }
}

class Derived1 extends Base {
    prop = true;
    constructor() {
        super.receivesAnything();
        super();
    }
}

class Derived2 extends Base {
    prop = true;
    constructor() {
        super.receivesAnything(this);
        super();
    }
}

class Derived3 extends Base {
    prop = true;
    constructor() {
        super.receivesAnything();
        super(this);
    }
}

class Derived4 extends Base {
    prop = true;
    constructor() {
        super.receivesAnything(this);
        super(this);
    }
}

class Derived5 extends Base {
    prop = true;
    constructor() {
        super();
        super.receivesAnything();
    }
}

class Derived6 extends Base {
    prop = true;
    constructor() {
        super(this);
        super.receivesAnything();
    }
}

class Derived7 extends Base {
    prop = true;
    constructor() {
        super();
        super.receivesAnything(this);
    }
}

class Derived8 extends Base {
    prop = true;
    constructor() {
        super(this);
        super.receivesAnything(this);
    }
}

class DerivedWithArrowFunction extends Base {
    prop = true;
    constructor() {
        (() => this)();
        super();
    }
}

class DerivedWithFunctionDeclaration extends Base {
    prop = true;
    constructor() {
        function declaration() {
            return this;
        }
        super();
    }
}

class DerivedWithFunctionExpression extends Base {
    prop = true;
    constructor() {
        (function () {
            return this;
        })();
        super();
    }
}

class DerivedWithClassExpression extends Base {
    prop = true;
    constructor() {
        console.log(class { });
        super();
    }
}

class DerivedWithDerivedClassExpression extends Base {
    prop = true;
    constructor() {
        console.log(class extends Base {
            constructor() {
                super();
            }
        });
        super();
    }
}

class DerivedWithNewDerivedClassExpression extends Base {
    prop = true;
    constructor() {
        console.log(new class extends Base {
            constructor() {
                super();
            }
        }());
        super();
    }
}

class DerivedWithObjectAccessors extends Base {
    prop = true;
    constructor() {
        const obj = {
            get prop() {
                return true;
            },
            set prop(param: boolean) {
                this._prop = param;
            }
        };
        super();
    }
}

class DerivedWithObjectComputedPropertyName extends Base {
    private propName = "prop";
    constructor() {
        const obj = {
            [this.propName]: true,
        };
        super();
    }
}

class DerivedWithObjectMethod extends Base {
    prop = true;
    constructor() {
        const obj = {
            getProp() {
                return this;
            },
        };
        super();
    }
}
