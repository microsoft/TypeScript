//// [tests/cases/compiler/superCallInNonStaticMethod.ts] ////

//// [superCallInNonStaticMethod.ts]
class Doing {
    public instanceMethod() {
    }
}

class Other extends Doing {
    // in instance method
    public instanceMethod() {
        super.instanceMethod();
    }

    // in a lambda inside a instance method
    public lambdaInsideAnInstanceMethod() {
        () => {
            super.instanceMethod();
        }
    }

    // in an object literal inside a instance method
    public objectLiteralInsideAnInstanceMethod() {
        return {
            a: () => {
                super.instanceMethod();
            },
            b: super.instanceMethod()
        };
    }

    // in a getter
    public get accessor() {
        super.instanceMethod();

        return 0;
    }

    // in a setter
    public set accessor(value: number) {
        super.instanceMethod();
    }
    
    constructor() {
        super();
        super.instanceMethod();
    }
    
    public propertyInitializer = super.instanceMethod();
    
    public functionProperty = () => {super.instanceMethod(); };
}


//// [superCallInNonStaticMethod.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Doing {
    instanceMethod() {
    }
}
class Other extends Doing {
    // in instance method
    instanceMethod() {
        super.instanceMethod();
    }
    // in a lambda inside a instance method
    lambdaInsideAnInstanceMethod() {
        () => {
            super.instanceMethod();
        };
    }
    // in an object literal inside a instance method
    objectLiteralInsideAnInstanceMethod() {
        return {
            a: () => {
                super.instanceMethod();
            },
            b: super.instanceMethod()
        };
    }
    // in a getter
    get accessor() {
        super.instanceMethod();
        return 0;
    }
    // in a setter
    set accessor(value) {
        super.instanceMethod();
    }
    constructor() {
        super();
        this.propertyInitializer = super.instanceMethod();
        this.functionProperty = __setFunctionName(() => { super.instanceMethod(); }, "functionProperty");
        super.instanceMethod();
    }
}
