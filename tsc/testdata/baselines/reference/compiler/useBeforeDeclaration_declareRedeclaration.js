//// [tests/cases/compiler/useBeforeDeclaration_declareRedeclaration.ts] ////

//// [useBeforeDeclaration_declareRedeclaration.ts]
class Base {
    b: 1 = 1;
}

class Plain extends Base {
    d = this.b;
}

class Narrowed extends Base {
    declare b: 1;
    d = this.b;
}

class Redeclared extends Base {
    b: 1;
    d = this.b;
}


//// [useBeforeDeclaration_declareRedeclaration.js]
"use strict";
class Base {
    b = 1;
}
class Plain extends Base {
    d = this.b;
}
class Narrowed extends Base {
    d = this.b;
}
class Redeclared extends Base {
    b;
    d = this.b;
}
