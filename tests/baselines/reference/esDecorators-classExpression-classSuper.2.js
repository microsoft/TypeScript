//// [tests/cases/conformance/esDecorators/classExpression/classSuper/esDecorators-classExpression-classSuper.2.ts] ////

//// [esDecorators-classExpression-classSuper.2.ts]
declare var dec: any;

// class expression in extends should not get an assigned name
(@dec
class C1 extends class { } {
    static {
        super.name;
    }
});

// function expression in extends should not get an assigned name
(@dec
class C2 extends (function() {} as any) {
    static {
        super.name;
    }
});

// arrow function in extends should not get an assigned name
(@dec
class C3 extends ((() => {}) as any) {
    static {
        super.name;
    }
});


//// [esDecorators-classExpression-classSuper.2.js]
// class expression in extends should not get an assigned name
((() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = (0, class {
    });
    var C1 = class extends _classSuper {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            C1 = _classThis = _classDescriptor.value;
        }
        static {
            Reflect.get(_classSuper, "name", _classThis);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C1 = _classThis;
})());
// function expression in extends should not get an assigned name
((() => {
    let _classDecorators_1 = [dec];
    let _classDescriptor_1;
    let _classExtraInitializers_1 = [];
    let _classThis_1;
    let _classSuper_1 = (0, function () { });
    var C2 = class extends _classSuper_1 {
        static {
            __esDecorate(null, _classDescriptor_1 = { value: this }, _classDecorators_1, { kind: "class", name: this.name }, null, _classExtraInitializers_1);
            C2 = _classThis_1 = _classDescriptor_1.value;
        }
        static {
            Reflect.get(_classSuper_1, "name", _classThis_1);
        }
        static {
            __runInitializers(_classThis_1, _classExtraInitializers_1);
        }
    };
    return C2 = _classThis_1;
})());
// arrow function in extends should not get an assigned name
((() => {
    let _classDecorators_2 = [dec];
    let _classDescriptor_2;
    let _classExtraInitializers_2 = [];
    let _classThis_2;
    let _classSuper_2 = (0, (() => { }));
    var C3 = class extends _classSuper_2 {
        static {
            __esDecorate(null, _classDescriptor_2 = { value: this }, _classDecorators_2, { kind: "class", name: this.name }, null, _classExtraInitializers_2);
            C3 = _classThis_2 = _classDescriptor_2.value;
        }
        static {
            Reflect.get(_classSuper_2, "name", _classThis_2);
        }
        static {
            __runInitializers(_classThis_2, _classExtraInitializers_2);
        }
    };
    return C3 = _classThis_2;
})());
