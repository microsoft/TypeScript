//// [tests/cases/compiler/readonlyAssignmentInSubclassOfClassExpression.ts] ////

//// [readonlyAssignmentInSubclassOfClassExpression.ts]
class C extends (class {} as new () => Readonly<{ attrib: number }>) {
    constructor() {
        super()
        this.attrib = 2
    }
}


//// [readonlyAssignmentInSubclassOfClassExpression.js]
"use strict";
class C extends class {
} {
    constructor() {
        super();
        this.attrib = 2;
    }
}
