===ORIGINAL===

class A {
    constructor() {
        var x = 1;
    }
}

===MODIFIED===

class A {
    constructor() {
        var x = 1;
        super();
    }
}
