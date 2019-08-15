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
    constructor() {
        this.a = Object.assign(Object.assign({ b: this.b }, this.c), { [this.b]: `${this.c}` });
        this.b = 0;
        this.c = { c: this.b };
    }
}
class D {
}
D.A = class extends D.B {
    [D.D]() { } // should be an error
};
D.B = class {
};
D.C = Object.assign({ [D.D]: 1 }, { get [D.D]() { return 0; } } // should be an error
);
D.D = '';
