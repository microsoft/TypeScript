//// [tests/cases/compiler/esDecoratorsPropertyAccessSameNameAsClass.ts] ////

//// [esDecoratorsPropertyAccessSameNameAsClass.ts]
export enum MyEnum {
    Foo = "FooValue",
    Bar = "BarValue",
}

function myDecorator(target: any, context: ClassDecoratorContext) {
    return target;
}

// ES decorators with enum member access sharing a class name
@myDecorator
export class Foo {
    type: MyEnum = MyEnum.Foo;

    getType(): MyEnum {
        return this.type || MyEnum.Foo;
    }
}

// Property access on objects
declare const obj: { Bar: string };

@myDecorator
export class Bar {
    prop = obj.Bar;

    method() {
        return obj.Bar;
    }
}

// Static member of another class
class Other {
    static Baz = 42;
}

@myDecorator
export class Baz {
    prop = Other.Baz;
}

// ES decorators with static fields trigger class fields transformer aliases at target < ES2022.
// Property access names must not be substituted through the class fields transformer path.
declare const obj2: { Quux: number };

@myDecorator
export class Quux {
    static count = 1;
    prop = obj2.Quux;
    method() {
        return obj2.Quux;
    }
}


//// [esDecoratorsPropertyAccessSameNameAsClass.js]
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
export var MyEnum;
(function (MyEnum) {
    MyEnum["Foo"] = "FooValue";
    MyEnum["Bar"] = "BarValue";
})(MyEnum || (MyEnum = {}));
function myDecorator(target, context) {
    return target;
}
// ES decorators with enum member access sharing a class name
let Foo = (() => {
    let _classDecorators = [myDecorator];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Foo = _classThis = class {
        constructor() {
            this.type = MyEnum.Foo;
        }
        getType() {
            return this.type || MyEnum.Foo;
        }
    };
    __setFunctionName(_classThis, "Foo");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Foo = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Foo = _classThis;
})();
export { Foo };
let Bar = (() => {
    let _classDecorators = [myDecorator];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Bar = _classThis = class {
        constructor() {
            this.prop = obj.Bar;
        }
        method() {
            return obj.Bar;
        }
    };
    __setFunctionName(_classThis, "Bar");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Bar = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Bar = _classThis;
})();
export { Bar };
// Static member of another class
class Other {
}
Other.Baz = 42;
let Baz = (() => {
    let _classDecorators = [myDecorator];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Baz = _classThis = class {
        constructor() {
            this.prop = Other.Baz;
        }
    };
    __setFunctionName(_classThis, "Baz");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Baz = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Baz = _classThis;
})();
export { Baz };
let Quux = (() => {
    let _classDecorators = [myDecorator];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var Quux = _classThis = class {
        constructor() {
            this.prop = obj2.Quux;
        }
        method() {
            return obj2.Quux;
        }
    };
    __setFunctionName(_classThis, "Quux");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Quux = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.count = 1;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Quux = _classThis;
})();
export { Quux };
