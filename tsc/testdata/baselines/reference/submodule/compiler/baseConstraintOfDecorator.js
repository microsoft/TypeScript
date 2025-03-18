//// [tests/cases/compiler/baseConstraintOfDecorator.ts] ////

//// [baseConstraintOfDecorator.ts]
export function classExtender<TFunction>(superClass: TFunction, _instanceModifier: (instance: any, args: any[]) => void): TFunction {
    return class decoratorFunc extends superClass {
        constructor(...args: any[]) {
            super(...args);
            _instanceModifier(this, args);
        }
    };
}

class MyClass { private x; }
export function classExtender2<TFunction extends new (...args: string[]) => MyClass>(superClass: TFunction, _instanceModifier: (instance: any, args: any[]) => void): TFunction {
    return class decoratorFunc extends superClass {
        constructor(...args: any[]) {
            super(...args);
            _instanceModifier(this, args);
        }
    };
}


//// [baseConstraintOfDecorator.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classExtender = classExtender;
exports.classExtender2 = classExtender2;
function classExtender(superClass, _instanceModifier) {
    return class decoratorFunc extends superClass {
        constructor(...args) {
            super(...args);
            _instanceModifier(this, args);
        }
    };
}
class MyClass {
    x;
}
function classExtender2(superClass, _instanceModifier) {
    return class decoratorFunc extends superClass {
        constructor(...args) {
            super(...args);
            _instanceModifier(this, args);
        }
    };
}
