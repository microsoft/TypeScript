//// [tests/cases/conformance/classes/constructorDeclarations/superCalls/derivedClassSuperProperties.ts] ////

//// [derivedClassSuperProperties.ts]
declare const decorate: any;

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

class DerivedWithDecoratorOnClass extends Base {
    prop = true;
    constructor() {
        @decorate(this)
        class InnerClass { }

        super();
    }
}

class DerivedWithDecoratorOnClassMethod extends Base {
    prop = true;
    constructor() {
        class InnerClass {
            @decorate(this)
            innerMethod() { }
        }

        super();
    }
}

class DerivedWithDecoratorOnClassProperty extends Base {
    prop = true;
    constructor() {
        class InnerClass {
            @decorate(this)
            innerProp = true;
        }

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

class DerivedWithParenthesis extends Base {
    prop = true;
    constructor() {
        (super());
    }
}

class DerivedWithParenthesisAfterStatement extends Base {
    prop = true;
    constructor() {
        this.prop;
        (super());
    }
}

class DerivedWithParenthesisBeforeStatement extends Base {
    prop = true;
    constructor() {
        (super());
        this.prop;
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

let a, b;

const DerivedWithLoops = [
    class extends Base {
        prop = true;
        constructor() {
            for(super();;) {}
        }
    },
    class extends Base {
        prop = true;
        constructor() {
            for(a; super();) {}
        }
    },
    class extends Base {
        prop = true;
        constructor() {
            for(a; b; super()) {}
        }
    },
    class extends Base {
        prop = true;
        constructor() {
            for(; ; super()) { break; }
        }
    },
    class extends Base {
        prop = true;
        constructor() {
            for (const x of super()) {}
        }
    },
    class extends Base {
        prop = true;
        constructor() {
            while (super()) {}
        }
    },
    class extends Base {
        prop = true;
        constructor() {
            do {} while (super());
        }
    },
    class extends Base {
        prop = true;
        constructor() {
            if (super()) {}
        }
    },
    class extends Base {
        prop = true;
        constructor() {
            switch (super()) {}
        }
    },
]


//// [derivedClassSuperProperties.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class Base {
    constructor(a) { }
    receivesAnything(param) { }
}
class Derived1 extends Base {
    constructor() {
        super.receivesAnything();
        super();
        this.prop = true;
    }
}
class Derived2 extends Base {
    constructor() {
        super.receivesAnything(this);
        super();
        this.prop = true;
    }
}
class Derived3 extends Base {
    constructor() {
        super.receivesAnything();
        super(this);
        this.prop = true;
    }
}
class Derived4 extends Base {
    constructor() {
        super.receivesAnything(this);
        super(this);
        this.prop = true;
    }
}
class Derived5 extends Base {
    constructor() {
        super();
        this.prop = true;
        super.receivesAnything();
    }
}
class Derived6 extends Base {
    constructor() {
        super(this);
        this.prop = true;
        super.receivesAnything();
    }
}
class Derived7 extends Base {
    constructor() {
        super();
        this.prop = true;
        super.receivesAnything(this);
    }
}
class Derived8 extends Base {
    constructor() {
        super(this);
        this.prop = true;
        super.receivesAnything(this);
    }
}
class DerivedWithArrowFunction extends Base {
    constructor() {
        (() => this)();
        super();
        this.prop = true;
    }
}
class DerivedWithArrowFunctionParameter extends Base {
    constructor() {
        const lambda = (param = this) => { };
        super();
        this.prop = true;
    }
}
class DerivedWithDecoratorOnClass extends Base {
    constructor() {
        let InnerClass = (() => {
            let InnerClass = class InnerClass {
            };
            InnerClass = __decorate([
                decorate(this)
            ], InnerClass);
            return InnerClass;
        })();
        super();
        this.prop = true;
    }
}
class DerivedWithDecoratorOnClassMethod extends Base {
    constructor() {
        let InnerClass = (() => {
            class InnerClass {
                innerMethod() { }
            }
            __decorate([
                decorate(this)
            ], InnerClass.prototype, "innerMethod", null);
            return InnerClass;
        })();
        super();
        this.prop = true;
    }
}
class DerivedWithDecoratorOnClassProperty extends Base {
    constructor() {
        let InnerClass = (() => {
            class InnerClass {
                constructor() {
                    this.innerProp = true;
                }
            }
            __decorate([
                decorate(this)
            ], InnerClass.prototype, "innerProp", void 0);
            return InnerClass;
        })();
        super();
        this.prop = true;
    }
}
class DerivedWithFunctionDeclaration extends Base {
    constructor() {
        function declaration() {
            return this;
        }
        super();
        this.prop = true;
    }
}
class DerivedWithFunctionDeclarationAndThisParam extends Base {
    constructor() {
        function declaration(param = this) {
            return param;
        }
        super();
        this.prop = true;
    }
}
class DerivedWithFunctionExpression extends Base {
    constructor() {
        (function () {
            return this;
        })();
        super();
        this.prop = true;
    }
}
class DerivedWithParenthesis extends Base {
    constructor() {
        (super());
        this.prop = true;
    }
}
class DerivedWithParenthesisAfterStatement extends Base {
    constructor() {
        this.prop;
        (super());
        this.prop = true;
    }
}
class DerivedWithParenthesisBeforeStatement extends Base {
    constructor() {
        (super());
        this.prop = true;
        this.prop;
    }
}
class DerivedWithClassDeclaration extends Base {
    constructor() {
        class InnerClass {
            method() {
                return this;
            }
            constructor() {
                this.property = 7;
                this.property;
                this.method();
            }
        }
        super();
        this.prop = true;
    }
}
class DerivedWithClassDeclarationExtendingMember extends Base {
    constructor() {
        class InnerClass extends this.memberClass {
            method() {
                return this;
            }
            constructor() {
                super();
                this.property = 7;
                this.property;
                this.method();
            }
        }
        super();
        this.memberClass = class {
        };
    }
}
class DerivedWithClassExpression extends Base {
    constructor() {
        console.log(class {
            method() {
                return this;
            }
            constructor() {
                this.property = 7;
                this.property;
                this.method();
            }
        });
        super();
        this.prop = true;
    }
}
class DerivedWithClassExpressionExtendingMember extends Base {
    constructor() {
        console.log(class extends this.memberClass {
        });
        super();
        this.memberClass = class {
        };
    }
}
class DerivedWithDerivedClassExpression extends Base {
    constructor() {
        console.log(class extends Base {
            constructor() {
                super();
                this.bar = () => this;
            }
            foo() {
                return this;
            }
        });
        super();
        this.prop = true;
    }
}
class DerivedWithNewDerivedClassExpression extends Base {
    constructor() {
        console.log(new class extends Base {
            constructor() {
                super();
            }
        }());
        super();
        this.prop = true;
    }
}
class DerivedWithObjectAccessors extends Base {
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
        this.prop = true;
    }
}
class DerivedWithObjectAccessorsUsingThisInKeys extends Base {
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
        this.propName = "prop";
    }
}
class DerivedWithObjectAccessorsUsingThisInBodies extends Base {
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
        this.propName = "prop";
    }
}
class DerivedWithObjectComputedPropertyBody extends Base {
    constructor() {
        const obj = {
            prop: this.propName,
        };
        super();
        this.propName = "prop";
    }
}
class DerivedWithObjectComputedPropertyName extends Base {
    constructor() {
        const obj = {
            [this.propName]: true,
        };
        super();
        this.propName = "prop";
    }
}
class DerivedWithObjectMethod extends Base {
    constructor() {
        const obj = {
            getProp() {
                return this;
            },
        };
        super();
        this.prop = true;
    }
}
let a, b;
const DerivedWithLoops = [
    class extends Base {
        constructor() {
            this.prop = true;
            for (super();;) { }
        }
    },
    class extends Base {
        constructor() {
            this.prop = true;
            for (a; super();) { }
        }
    },
    class extends Base {
        constructor() {
            this.prop = true;
            for (a; b; super()) { }
        }
    },
    class extends Base {
        constructor() {
            this.prop = true;
            for (;; super()) {
                break;
            }
        }
    },
    class extends Base {
        constructor() {
            this.prop = true;
            for (const x of super()) { }
        }
    },
    class extends Base {
        constructor() {
            this.prop = true;
            while (super()) { }
        }
    },
    class extends Base {
        constructor() {
            this.prop = true;
            do { } while (super());
        }
    },
    class extends Base {
        constructor() {
            this.prop = true;
            if (super()) { }
        }
    },
    class extends Base {
        constructor() {
            this.prop = true;
            switch (super()) {
            }
        }
    },
];
