// @target: es2022
// @strict: true
// @useDefineForClassFields: true

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
