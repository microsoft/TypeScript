//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberAccessorDeclarations/accessorWithES5.ts] ////

//// [accessorWithES5.ts]
class C {
    get x() {
        return 1;
    }
}

class D {
    set x(v) {
    }
}

var x = {
    get a() { return 1 }
}

var y = {
    set b(v) { }
}

//// [accessorWithES5.js]
class C {
    get x() {
        return 1;
    }
}
class D {
    set x(v) {
    }
}
var x = {
    get a() { return 1; }
};
var y = {
    set b(v) { }
};
