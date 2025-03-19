//// [tests/cases/compiler/useBeforeDeclaration_propertyAssignment.ts] ////

//// [useBeforeDeclaration_propertyAssignment.ts]
export class C {
    public a =  { b: this.b, ...this.c, [this.b]: `${this.c}`};
    private b = 0;
    public c = { c: this.b };
}

class D {
    static A = class extends D.B {
        [D.D]() {} // should be an error
    }
    static B = class {}
    static C = {
        [D.D]: 1,
        ...{get [D.D]() {return 0;}} // should be an error
    };
    static D = '';
}

//// [useBeforeDeclaration_propertyAssignment.js]
export class C {
    a = { b: this.b, ...this.c, [this.b]: `${this.c}` };
    b = 0;
    c = { c: this.b };
}
class D {
    static A = class extends D.B {
        [D.D]() { } // should be an error
    };
    static B = class {
    };
    static C = {
        [D.D]: 1,
        ...{ get [D.D]() { return 0; } } // should be an error
    };
    static D = '';
}
