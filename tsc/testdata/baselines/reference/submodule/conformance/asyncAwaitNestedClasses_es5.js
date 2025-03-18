//// [tests/cases/conformance/async/es5/asyncAwaitNestedClasses_es5.ts] ////

//// [asyncAwaitNestedClasses_es5.ts]
// https://github.com/Microsoft/TypeScript/issues/20744
class A {
    static B = class B {
        static func2(): Promise<void> {
            return new Promise((resolve) => { resolve(null); });
        }
        static C = class C {
            static async func() {
                await B.func2();
            }
        }
    }
}

A.B.C.func();

//// [asyncAwaitNestedClasses_es5.js]
class A {
    static B = class B {
        static func2() {
            return new Promise((resolve) => { resolve(null); });
        }
        static C = class C {
            static async func() {
                await B.func2();
            }
        };
    };
}
A.B.C.func();
