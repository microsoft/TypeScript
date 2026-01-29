//// [tests/cases/compiler/accessorInAmbientContextES5.ts] ////

//// [accessorInAmbientContextES5.ts]
// Should allow accessor in ambient contexts even when targeting ES5

declare class AmbientClass {
    accessor prop1: string;
    static accessor prop2: number;
    private accessor prop3: boolean;
    private static accessor prop4: symbol;
}

declare namespace AmbientNamespace {
    class C {
        accessor prop: string;
    }
}

// Should also work in .d.ts files (simulated with declare)
declare module "some-module" {
    export class ExportedClass {
        accessor value: any;
    }
}

// Regular class should still error when targeting ES5
class RegularClass {
    accessor shouldError: string; // Should still error
}

//// [accessorInAmbientContextES5.js]
// Should allow accessor in ambient contexts even when targeting ES5
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _RegularClass_shouldError_accessor_storage;
// Regular class should still error when targeting ES5
var RegularClass = /** @class */ (function () {
    function RegularClass() {
        _RegularClass_shouldError_accessor_storage.set(this, void 0);
    }
    Object.defineProperty(RegularClass.prototype, "shouldError", {
        get: function () { return __classPrivateFieldGet(this, _RegularClass_shouldError_accessor_storage, "f"); } // Should still error
        ,
        set: function (value) { __classPrivateFieldSet(this, _RegularClass_shouldError_accessor_storage, value, "f"); },
        enumerable: false,
        configurable: true
    });
    return RegularClass;
}());
_RegularClass_shouldError_accessor_storage = new WeakMap();


//// [accessorInAmbientContextES5.d.ts]
declare class AmbientClass {
    accessor prop1: string;
    static accessor prop2: number;
    private accessor prop3;
    private static accessor prop4;
}
declare namespace AmbientNamespace {
    class C {
        accessor prop: string;
    }
}
declare module "some-module" {
    class ExportedClass {
        accessor value: any;
    }
}
declare class RegularClass {
    accessor shouldError: string;
}
