class Base {
    constructor(a?) { }

    receivesAnything(param?) { }
}

class Derived1 extends Base {
    constructor() {
        super.receivesAnything();
        super();
    }
}

class Derived2 extends Base {
    constructor() {
        super.receivesAnything(this);
        super();
    }
}

class Derived3 extends Base {
    constructor() {
        super.receivesAnything();
        super(this);
    }
}

class Derived4 extends Base {
    constructor() {
        super.receivesAnything(this);
        super(this);
    }
}

class Derived5 extends Base {
    constructor() {
        super();
        super.receivesAnything();
    }
}

class Derived6 extends Base {
    constructor() {
        super(this);
        super.receivesAnything();
    }
}

class Derived7 extends Base {
    constructor() {
        super();
        super.receivesAnything(this);
    }
}

class Derived8 extends Base {
    constructor() {
        super(this);
        super.receivesAnything(this);
    }
}

class DerivedWithFunction extends Base {
    constructor() {
        (function () {
            return this;
        })();
        super();
    }
}

class DerivedWithClassExpression extends Base {
    constructor() {
        console.log(class { });
        super();
    }
}

class DerivedWithDerivedClassExpression extends Base {
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
    constructor() {
        console.log(new class extends Base {
            constructor() {
                super();
            }
        }());
        super();
    }
}