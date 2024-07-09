// @target: ES5

class DerivedBasic extends Object {
    prop = 1;
    constructor() {
        super();
    }
}

class DerivedAfterParameterDefault extends Object {
    x1: boolean;
    x2: boolean;
    constructor(x = false) {
        this.x1 = x;
        super(x);
        this.x2 = x;
    }
}

class DerivedAfterRestParameter extends Object {
    x1: boolean[];
    x2: boolean[];
    constructor(...x: boolean[]) {
        this.x1 = x;
        super(x);
        this.x2 = x;
    }
}

class DerivedComments extends Object {
    x: any;
    constructor() {
        // c1
        console.log(); // c2
        // c3
        super(); // c4
        // c5
        this.x = null; // c6
        // c7
    }
}

class DerivedCommentsInvalidThis extends Object {
    x: any;
    constructor() {
        // c0
        this;
        // c1
        console.log(); // c2
        // c3
        super(); // c4
        // c5
        this.x = null; // c6
        // c7
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
