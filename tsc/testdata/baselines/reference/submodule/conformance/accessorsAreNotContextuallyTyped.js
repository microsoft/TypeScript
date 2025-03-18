//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberAccessorDeclarations/accessorsAreNotContextuallyTyped.ts] ////

//// [accessorsAreNotContextuallyTyped.ts]
// accessors are not contextually typed

class C {
    set x(v: (a: string) => string) {
    }

    get x() {
        return (x: string) => "";
    }
}

var c: C;
var r = c.x(''); // string

//// [accessorsAreNotContextuallyTyped.js]
class C {
    set x(v) {
    }
    get x() {
        return (x) => "";
    }
}
var c;
var r = c.x('');
