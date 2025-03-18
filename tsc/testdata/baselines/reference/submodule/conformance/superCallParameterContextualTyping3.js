//// [tests/cases/conformance/expressions/contextualTyping/superCallParameterContextualTyping3.ts] ////

//// [superCallParameterContextualTyping3.ts]
interface ContextualType<T> {
    method(parameter: T): void;
}

class CBase<T>  {
    constructor(param: ContextualType<T>) {
    }

    foo(param: ContextualType<T>) {
    }
}

class C extends CBase<string> {
    constructor() {
        // Should be okay.
        // 'p' should have type 'string'.
        super({
            method(p) {
                p.length;
            }
        });

        // Should be okay.
        // 'p' should have type 'string'.
        super.foo({
            method(p) {
                p.length;
            }
        });
    }
}

//// [superCallParameterContextualTyping3.js]
class CBase {
    constructor(param) {
    }
    foo(param) {
    }
}
class C extends CBase {
    constructor() {
        super({
            method(p) {
                p.length;
            }
        });
        super.foo({
            method(p) {
                p.length;
            }
        });
    }
}
