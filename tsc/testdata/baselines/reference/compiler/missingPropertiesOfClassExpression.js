//// [tests/cases/compiler/missingPropertiesOfClassExpression.ts] ////

//// [missingPropertiesOfClassExpression.ts]
class George extends class { reset() { return this.y; } } {
    constructor() {
        super();
    }
}


//// [missingPropertiesOfClassExpression.js]
"use strict";
class George extends class {
    reset() { return this.y; }
} {
    constructor() {
        super();
    }
}
