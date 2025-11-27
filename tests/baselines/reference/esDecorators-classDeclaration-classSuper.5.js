//// [tests/cases/conformance/esDecorators/classDeclaration/classSuper/esDecorators-classDeclaration-classSuper.5.ts] ////

//// [esDecorators-classDeclaration-classSuper.5.ts]
declare var dec: any;

declare class Base {
    static x: number;
}

const x = "x";

@dec
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
}

@dec
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
}

@dec
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
}


//// [esDecorators-classDeclaration-classSuper.5.js]
const x = "x";
let C1 = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Base;
    var C1 = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C1 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
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
})();
let C2 = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Base;
    var C2 = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C2 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
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
    return C2 = _classThis;
})();
let C3 = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Base;
    var C3 = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C3 = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static a = Reflect.get(_classSuper, x, _classThis);
        static b = (() => {
            var _a;
            return Reflect.set(_classSuper, x, _a = 1, _classThis), _a;
        })();
        static c = (() => {
            var _a, _b;
            return Reflect.set(_classSuper, _a = x, _b = Reflect.get(_classSuper, _a, _classThis) + 1, _classThis), _b;
        })();
        static d = (() => {
            var _a, _b, _c;
            return Reflect.set(_classSuper, _a = x, (_c = Reflect.get(_classSuper, _a, _classThis), _b = _c++, _c), _classThis), _b;
        })();
        static e = (() => {
            var _a, _b, _c;
            return Reflect.set(_classSuper, _a = x, (_c = Reflect.get(_classSuper, _a, _classThis), _b = _c--, _c), _classThis), _b;
        })();
        static f = (() => {
            var _a, _b, _c;
            return Reflect.set(_classSuper, _a = x, (_c = Reflect.get(_classSuper, _a, _classThis), _b = ++_c), _classThis), _b;
        })();
        static g = (() => {
            var _a, _b, _c;
            return Reflect.set(_classSuper, _a = x, (_c = Reflect.get(_classSuper, _a, _classThis), _b = --_c), _classThis), _b;
        })();
        static h = ({ x: ({ set value(_a) { Reflect.set(_classSuper, x, _a, _classThis); } }).value } = { x: 1 });
        static i = [({ set value(_a) { Reflect.set(_classSuper, x, _a, _classThis); } }).value] = [1];
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C3 = _classThis;
})();
