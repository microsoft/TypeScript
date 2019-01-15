// @target: ES5

class DerivedBasic extends Object {
    prop = 1;
    constructor() {
        super();
    }
}

class DerivedInConditional extends Object {
    prop = 1;
    constructor() {
        Math.random()
            ? super(1)
            : super(0);
    }
}

class DerivedInIf extends Object {
    prop = 1;
    constructor() {
        if (Math.random()) {
            super(1);
        }
        else {
            super(0);
        }
    }
}

class DerivedInBlockWithProperties extends Object {
    prop = 1;
    constructor(private paramProp = 2) {
        {
            super();
        }
    }
}

class DerivedInConditionalWithProperties extends Object {
    prop = 1;
    constructor(private paramProp = 2) {
        if (Math.random()) {
            super(1);
        } else {
            super(0);
        }
    }
}
