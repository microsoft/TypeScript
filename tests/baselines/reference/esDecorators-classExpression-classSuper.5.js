//// [esDecorators-classExpression-classSuper.5.ts]
declare var dec: any;

declare class Base {
    static x: number;
}

const x = "x";

(@dec
class C1 extends Base {
    static a = super.x;
    static b = super.x = 1;
    static c = super.x += 1;
    static d = super.x++;
    static e = super.x--;
    static f = ++super.x;
    static g = --super.x;
    static h = ({ x: super.x } = { x: 1 });
    static i = [super.x] = [1];
});

(@dec
class C2 extends Base {
    static a = super["x"];
    static b = super["x"] = 1;
    static c = super["x"] += 1;
    static d = super["x"]++;
    static e = super["x"]--;
    static f = ++super["x"];
    static g = --super["x"];
    static h = ({ x: super["x"] } = { x: 1 });
    static i = [super["x"]] = [1];
});

(@dec
class C3 extends Base {
    static a = super[x];
    static b = super[x] = 1;
    static c = super[x] += 1;
    static d = super[x]++;
    static e = super[x]--;
    static f = ++super[x];
    static g = --super[x];
    static h = ({ x: super[x] } = { x: 1 });
    static i = [super[x]] = [1];
});


//// [esDecorators-classExpression-classSuper.5.js]
const x = "x";
((() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Base;
    var C1 = class extends _classSuper {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            C1 = _classThis = _classDescriptor.value;
        }
        static a = Reflect.get(_classSuper, "x", _classThis);
        static b = (() => {
            var _a;
            return Reflect.set(_classSuper, "x", _a = 1, _classThis), _a;
        })();
        static c = (() => {
            var _a;
            return Reflect.set(_classSuper, "x", _a = Reflect.get(_classSuper, "x", _classThis) + 1, _classThis), _a;
        })();
        static d = (() => {
            var _a, _b;
            return Reflect.set(_classSuper, "x", (_b = Reflect.get(_classSuper, "x", _classThis), _a = _b++, _b), _classThis), _a;
        })();
        static e = (() => {
            var _a, _b;
            return Reflect.set(_classSuper, "x", (_b = Reflect.get(_classSuper, "x", _classThis), _a = _b--, _b), _classThis), _a;
        })();
        static f = (() => {
            var _a, _b;
            return Reflect.set(_classSuper, "x", (_b = Reflect.get(_classSuper, "x", _classThis), _a = ++_b), _classThis), _a;
        })();
        static g = (() => {
            var _a, _b;
            return Reflect.set(_classSuper, "x", (_b = Reflect.get(_classSuper, "x", _classThis), _a = --_b), _classThis), _a;
        })();
        static h = ({ x: ({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value } = { x: 1 });
        static i = [({ set value(_a) { Reflect.set(_classSuper, "x", _a, _classThis); } }).value] = [1];
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C1 = _classThis;
})());
((() => {
    let _classDecorators_1 = [dec];
    let _classDescriptor_1;
    let _classExtraInitializers_1 = [];
    let _classThis_1;
    let _classSuper_1 = Base;
    var C2 = class extends _classSuper_1 {
        static {
            __esDecorate(null, _classDescriptor_1 = { value: this }, _classDecorators_1, { kind: "class", name: this.name }, null, _classExtraInitializers_1);
            C2 = _classThis_1 = _classDescriptor_1.value;
        }
        static a = Reflect.get(_classSuper_1, "x", _classThis_1);
        static b = (() => {
            var _a;
            return Reflect.set(_classSuper_1, "x", _a = 1, _classThis_1), _a;
        })();
        static c = (() => {
            var _a;
            return Reflect.set(_classSuper_1, "x", _a = Reflect.get(_classSuper_1, "x", _classThis_1) + 1, _classThis_1), _a;
        })();
        static d = (() => {
            var _a, _b;
            return Reflect.set(_classSuper_1, "x", (_b = Reflect.get(_classSuper_1, "x", _classThis_1), _a = _b++, _b), _classThis_1), _a;
        })();
        static e = (() => {
            var _a, _b;
            return Reflect.set(_classSuper_1, "x", (_b = Reflect.get(_classSuper_1, "x", _classThis_1), _a = _b--, _b), _classThis_1), _a;
        })();
        static f = (() => {
            var _a, _b;
            return Reflect.set(_classSuper_1, "x", (_b = Reflect.get(_classSuper_1, "x", _classThis_1), _a = ++_b), _classThis_1), _a;
        })();
        static g = (() => {
            var _a, _b;
            return Reflect.set(_classSuper_1, "x", (_b = Reflect.get(_classSuper_1, "x", _classThis_1), _a = --_b), _classThis_1), _a;
        })();
        static h = ({ x: ({ set value(_a) { Reflect.set(_classSuper_1, "x", _a, _classThis_1); } }).value } = { x: 1 });
        static i = [({ set value(_a) { Reflect.set(_classSuper_1, "x", _a, _classThis_1); } }).value] = [1];
        static {
            __runInitializers(_classThis_1, _classExtraInitializers_1);
        }
    };
    return C2 = _classThis_1;
})());
((() => {
    let _classDecorators_2 = [dec];
    let _classDescriptor_2;
    let _classExtraInitializers_2 = [];
    let _classThis_2;
    let _classSuper_2 = Base;
    var C3 = class extends _classSuper_2 {
        static {
            __esDecorate(null, _classDescriptor_2 = { value: this }, _classDecorators_2, { kind: "class", name: this.name }, null, _classExtraInitializers_2);
            C3 = _classThis_2 = _classDescriptor_2.value;
        }
        static a = Reflect.get(_classSuper_2, x, _classThis_2);
        static b = (() => {
            var _a;
            return Reflect.set(_classSuper_2, x, _a = 1, _classThis_2), _a;
        })();
        static c = (() => {
            var _a, _b;
            return Reflect.set(_classSuper_2, _a = x, _b = Reflect.get(_classSuper_2, _a, _classThis_2) + 1, _classThis_2), _b;
        })();
        static d = (() => {
            var _a, _b, _c;
            return Reflect.set(_classSuper_2, _a = x, (_c = Reflect.get(_classSuper_2, _a, _classThis_2), _b = _c++, _c), _classThis_2), _b;
        })();
        static e = (() => {
            var _a, _b, _c;
            return Reflect.set(_classSuper_2, _a = x, (_c = Reflect.get(_classSuper_2, _a, _classThis_2), _b = _c--, _c), _classThis_2), _b;
        })();
        static f = (() => {
            var _a, _b, _c;
            return Reflect.set(_classSuper_2, _a = x, (_c = Reflect.get(_classSuper_2, _a, _classThis_2), _b = ++_c), _classThis_2), _b;
        })();
        static g = (() => {
            var _a, _b, _c;
            return Reflect.set(_classSuper_2, _a = x, (_c = Reflect.get(_classSuper_2, _a, _classThis_2), _b = --_c), _classThis_2), _b;
        })();
        static h = ({ x: ({ set value(_a) { Reflect.set(_classSuper_2, x, _a, _classThis_2); } }).value } = { x: 1 });
        static i = [({ set value(_a) { Reflect.set(_classSuper_2, x, _a, _classThis_2); } }).value] = [1];
        static {
            __runInitializers(_classThis_2, _classExtraInitializers_2);
        }
    };
    return C3 = _classThis_2;
})());
