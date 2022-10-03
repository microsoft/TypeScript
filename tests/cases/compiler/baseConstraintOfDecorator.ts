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
