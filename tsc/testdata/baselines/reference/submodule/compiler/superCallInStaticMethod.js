//// [tests/cases/compiler/superCallInStaticMethod.ts] ////

//// [superCallInStaticMethod.ts]
class Doing {
    public static staticMethod() {
    }
}

class Other extends Doing {
    // in static method
    public static staticMethod() {
        super.staticMethod();
    }

    // in a lambda inside a static method
    public static lambdaInsideAStaticMethod() {
        () => {
            super.staticMethod();
        }
    }

    // in an object literal inside a static method
    public static objectLiteralInsideAStaticMethod() {
        return {
            a: () => {
                super.staticMethod();
            },
            b: super.staticMethod()
        };
    }

    // in a getter
    public static get staticGetter() {
        super.staticMethod();

        return 0;
    }

    // in a setter
    public static set staticGetter(value: number) {
        super.staticMethod();
    }

    // in static method
    public static initializerInAStaticMethod(a = super.staticMethod()) {
        super.staticMethod();
    }
}


//// [superCallInStaticMethod.js]
class Doing {
    static staticMethod() {
    }
}
class Other extends Doing {
    // in static method
    static staticMethod() {
        super.staticMethod();
    }
    // in a lambda inside a static method
    static lambdaInsideAStaticMethod() {
        () => {
            super.staticMethod();
        };
    }
    // in an object literal inside a static method
    static objectLiteralInsideAStaticMethod() {
        return {
            a: () => {
                super.staticMethod();
            },
            b: super.staticMethod()
        };
    }
    // in a getter
    static get staticGetter() {
        super.staticMethod();
        return 0;
    }
    // in a setter
    static set staticGetter(value) {
        super.staticMethod();
    }
    // in static method
    static initializerInAStaticMethod(a = super.staticMethod()) {
        super.staticMethod();
    }
}
