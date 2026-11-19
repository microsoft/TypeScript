// @noTypesAndSymbols: true
// @strictNullChecks: true
// @target: esnext
// @useDefineForClassFields: true

class Base {
    b: number = 1;
}

class Plain extends Base {
    d = this.b;
}

class Narrowed extends Base {
    declare b: 1 | 2;
    d = this.b;
}

class Redeclared extends Base {
    b: number;
    d = this.b;

    constructor() {
        super();
        this.b = 2;
    }
}

class Own {
    d = this.b;
    b = 1;
}
