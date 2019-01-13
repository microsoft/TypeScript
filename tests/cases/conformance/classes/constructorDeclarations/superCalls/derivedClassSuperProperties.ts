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

class DerivedWithArrowFunctionParameter extends Base {
    prop = true;
    constructor() {
        const lambda = (param = this) => {};
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

class DerivedWithFunctionDeclarationAndThisParam extends Base {
    prop = true;
    constructor() {
        function declaration(param = this) {
            return param;
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

class DerivedWithClassDeclaration extends Base {
    prop = true;
    constructor() {
        class InnerClass {
            private method() {
                return this;
            }
            private property = 7;
            constructor() {
                this.property;
                this.method();
            }
        }
        super();
    }
}

class DerivedWithClassDeclarationExtendingMember extends Base {
    memberClass = class { };
    constructor() {
        class InnerClass extends this.memberClass {
            private method() {
                return this;
            }
            private property = 7;
            constructor() {
                super();
                this.property;
                this.method();
            }
        }
        super();
    }
}

class DerivedWithClassExpression extends Base {
    prop = true;
    constructor() {
        console.log(class {
            private method() {
                return this;
            }
            private property = 7;
            constructor() {
                this.property;
                this.method();
            }
        });
        super();
    }
}

class DerivedWithClassExpressionExtendingMember extends Base {
    memberClass = class { };
    constructor() {
        console.log(class extends this.memberClass { });
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
            public foo() {
                return this;
            }
            public bar = () => this;
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
            set prop(param) {
                this._prop = param;
            }
        };
        super();
    }
}

class DerivedWithObjectAccessorsUsingThisInKeys extends Base {
    propName = "prop";
    constructor() {
        const obj = {
            _prop: "prop",
            get [this.propName]() {
                return true;
            },
            set [this.propName](param) {
                this._prop = param;
            }
        };
        super();
    }
}

class DerivedWithObjectAccessorsUsingThisInBodies extends Base {
    propName = "prop";
    constructor() {
        const obj = {
            _prop: "prop",
            get prop() {
                return this._prop;
            },
            set prop(param) {
                this._prop = param;
            }
        };
        super();
    }
}

class DerivedWithObjectComputedPropertyBody extends Base {
    propName = "prop";
    constructor() {
        const obj = {
            prop: this.propName,
        };
        super();
    }
}

class DerivedWithObjectComputedPropertyName extends Base {
    propName = "prop";
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
