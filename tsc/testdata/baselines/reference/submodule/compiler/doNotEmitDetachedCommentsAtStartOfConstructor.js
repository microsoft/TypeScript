//// [tests/cases/compiler/doNotEmitDetachedCommentsAtStartOfConstructor.ts] ////

//// [doNotEmitDetachedCommentsAtStartOfConstructor.ts]
class A {
    constructor() {
        // Single Line Comment

        var x = 10;
    }
}

class B {
    constructor() {
        /* 
            Multi-line comment
        */

        var y = 10;
    }
}

class C {
    constructor() {
        // Single Line Comment with more than one blank line


        var x = 10;
    }
}

class D {
    constructor() {
        /* 
            Multi-line comment with more than one blank line
        */


        var y = 10;
    }
}

//// [doNotEmitDetachedCommentsAtStartOfConstructor.js]
class A {
    constructor() {
        var x = 10;
    }
}
class B {
    constructor() {
        var y = 10;
    }
}
class C {
    constructor() {
        var x = 10;
    }
}
class D {
    constructor() {
        var y = 10;
    }
}
