//// [tests/cases/conformance/classes/propertyMemberDeclarations/twoAccessorsWithSameName.ts] ////

//// [twoAccessorsWithSameName.ts]
class C {
    get x() { return 1; }
    get x() { return 1; } // error
}

class D {
    set x(v) {  }
    set x(v) {  } // error
}

class E {
    get x() {
        return 1;
    }
    set x(v) { }
}

var x = {
    get x() {
        return 1;
    },

    // error
    get x() {
        return 1;
    }
}

var y = {
    get x() {
        return 1;
    },
    set x(v) { }
}

//// [twoAccessorsWithSameName.js]
"use strict";
class C {
    get x() { return 1; }
    get x() { return 1; } // error
}
class D {
    set x(v) { }
    set x(v) { } // error
}
class E {
    get x() {
        return 1;
    }
    set x(v) { }
}
var x = {
    get x() {
        return 1;
    },
    // error
    get x() {
        return 1;
    }
};
var y = {
    get x() {
        return 1;
    },
    set x(v) { }
};
