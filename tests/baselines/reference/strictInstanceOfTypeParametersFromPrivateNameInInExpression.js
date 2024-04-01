//// [tests/cases/compiler/strictInstanceOfTypeParametersFromPrivateNameInInExpression.ts] ////

//// [strictInstanceOfTypeParametersFromPrivateNameInInExpression.ts]
class UnconstrainedWithPrivate<T> {
    #brand;
    value: T;
    constructor(value: T) {
        this.value = value;
    }
    copyValue(other: object) {
        if (#brand in other) {
            this.value = other.value;
        }
    }
}

class ConstrainedWithPrivate<T extends string> {
    #brand;
    value: T;
    copyValue(other: object) {
        if (#brand in other) {
            this.value = other.value;
        }
    }
}


//// [strictInstanceOfTypeParametersFromPrivateNameInInExpression.js]
var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
};
var _UnconstrainedWithPrivate_brand, _ConstrainedWithPrivate_brand;
class UnconstrainedWithPrivate {
    constructor(value) {
        _UnconstrainedWithPrivate_brand.set(this, void 0);
        this.value = value;
    }
    copyValue(other) {
        if (__classPrivateFieldIn(_UnconstrainedWithPrivate_brand, other)) {
            this.value = other.value;
        }
    }
}
_UnconstrainedWithPrivate_brand = new WeakMap();
class ConstrainedWithPrivate {
    constructor() {
        _ConstrainedWithPrivate_brand.set(this, void 0);
    }
    copyValue(other) {
        if (__classPrivateFieldIn(_ConstrainedWithPrivate_brand, other)) {
            this.value = other.value;
        }
    }
}
_ConstrainedWithPrivate_brand = new WeakMap();
